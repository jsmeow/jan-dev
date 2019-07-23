import GamePlayEntity from '../GamePlayEntity';
import DestroyExplosion from '../../display/explosions/destroy/DestroyExplosion';

class MineEntity extends GamePlayEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number} x
   * @param {number} y
   * @param {number} factionStatus
   * @param {number} attack
   * @param {{dxLeft: number=, dxRight: number=, dyUp: number=, dyDown: number=}=} step
   * @constructor
   */
  constructor(game, { x, y }, factionStatus, attack) {
    super(game, { x, y }, factionStatus);
    /**
     * MineEntity image source.
     * To be implemented by the extending class.
     * @type {HTMLElement}
     */
    this.mineImageSrc = null;
    /**
     * MineEntity explosion size.
     * @type {{width: number, height: number}}
     */
    this.explosionSize = {
      width: 27,
      height: 27
    };
    this.init(attack);
  }

  /**
   * @override
   */
  init = attack => {
    this.setGameEntityImageSource();
    this.setGameEntitySize({
      width: 4,
      height: 4
    });
    this.setEntityType('mine');
    this.setAttackPoints(attack * 2);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * @override
   */
  setGameEntityImageSource = () => {
    this.image.src = this.mineImageSrc;
  };

  // ==========================================================================
  // Explosion methods
  // ==========================================================================

  /**
   * Create a explosion on ShipEntity dispose.
   */
  createDestroyExplosion = () => {
    this.game.addToGameEntities(
      new DestroyExplosion(
        this.game,
        {
          x: this.position.x,
          y: this.position.y
        },
        this.explosionSize
      )
    );
  };

  // ==========================================================================
  // GameEntity collision detection methods
  // ==========================================================================

  /**
   * @override
   */
  onEntityCollision = entity => {
    entity.health -= this.attack;
    if (entity.health <= 0) {
      entity.aliveStatus = false;
    }
  };

  /**
   * @override
   */
  hasCollidedEntity = thisEntIdx => {
    let hasCollided = false;
    // Cycle through entity collection.
    this.game.gameEntities.forEach((entity, entIdx) => {
      // Skip if it references itself.
      if (
        thisEntIdx !== entIdx &&
        !entity.respawnStatus &&
        !entity.invincibleStatus &&
        entity.entityType &&
        this.factionStatus !== entity.factionStatus
      ) {
        if (
          this.position.x < entity.position.x + entity.size.width &&
          this.position.x + this.size.width > entity.position.x &&
          this.position.y < entity.position.y + entity.size.height &&
          this.position.y + this.size.height > entity.position.y
        ) {
          // Set size to explosion size.
          this.setGameEntitySize(this.explosionSize);
          // Take action on collision.
          this.onEntityCollision(entity);
          // Set collided flag.
          hasCollided = true;
        }
      }
    });
    return hasCollided;
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * @override
   */
  onDrawImageTick = () => {
    this.drawImage();
  };

  /**
   * Collision actions taken on a game tick.
   * @param {number} entIdx
   */
  onCollisionTick = entIdx => {
    if (
      this.hasCollidedEntity(entIdx) ||
      this.hasGameEntityCollidedTopBoundary(this.moveStepSize) ||
      this.hasGameEntityCollidedBottomBoundary(this.moveStepSize)
    ) {
      // Ready to dispose.
      this.setAliveStatus(false);
    }
  };

  /**
   * Score actions taken on a game tick.
   */
  onScoreTick = () => {
    this.game.addToGameScore(this.scorePoints);
  };

  /**
   * @override
   */
  onTick = entIdx => {
    if (this.aliveStatus) {
      this.onDrawImageTick();
      this.onCollisionTick(entIdx);
    } else {
      this.onScoreTick();
      // Create the destroy explosion.
      this.createDestroyExplosion();
      this.disposeEntity(entIdx);
    }
  };
}

export default MineEntity;
