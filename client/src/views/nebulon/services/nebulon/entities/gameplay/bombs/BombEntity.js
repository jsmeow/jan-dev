import Game from '../../../game/Game';
import GamePlayEntity from '../GamePlayEntity';
import ExplosionDestroy from '../../display/explosions/destroy/ExplosionDestroy';

/**
 * A bullet entity.
 */
class BombEntity extends GamePlayEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number} x
   * @param {number} y
   * @param {number} factionStatus
   * @param {number} attackPoints
   * @param {{dxLeft: number=, dxRight: number=, dyUp: number=, dyDown: number=}=} step
   * @constructor
   */
  constructor(game, { x, y }, factionStatus, attackPoints, step) {
    super(game, { x, y }, factionStatus);
    /**
     * BombEntity image source.
     * To be implemented by the extending class.
     * @type {HTMLElement}
     */
    this.bombImageSrc = null;
    /**
     * BombEntity explosion size.
     * @type {{width: number, height: number}}
     */
    this.explosionSize = {
      width: 27,
      height: 27
    };
    this.init(attackPoints, step);
  }

  /**
   * @override
   */
  init = (attackPoints, step) => {
    this.setImageSource();
    this.setSize({
      width: 4,
      height: 4
    });
    this.setEntityType('bomb');
    this.setSpeed(Game.speed / 30);
    this.setInvincibleStatus(true);
    this.setAttackPoints(attackPoints * 2);
    this.moveDirection(step);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * @override
   */
  setImageSource = () => {
    this.image.src = this.bombImageSrc;
  };

  // ==========================================================================
  // Explosion methods
  // ==========================================================================

  /**
   * Create a explosion on ShipEntity dispose.
   */
  createDestroyExplosion = () => {
    this.game.addToGameEntities(
      new ExplosionDestroy(
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
  // Entity collision detection methods
  // ==========================================================================

  /**
   * @override
   */
  onEntityCollision = entity => {
    entity.hitPoints -= this.attackPoints;
    if (entity.hitPoints <= 0) {
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
        !entity.invincibleStatus &&
        entity.entityType &&
        entity.entityType !== 'bullet' &&
        this.factionStatus !== entity.factionStatus
      ) {
        if (
          this.position.x < entity.position.x + entity.size.width &&
          this.position.x + this.size.width > entity.position.x &&
          this.position.y < entity.position.y + entity.size.height &&
          this.position.y + this.size.height > entity.position.y
        ) {
          // Set size to explosion size.
          this.setSize(this.explosionSize);
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
      this.hasCollidedTopBoundary(this.moveStepSize) ||
      this.hasCollidedBottomBoundary(this.moveStepSize)
    ) {
      // Ready to dispose.
      this.setAliveStatus(false);
    }
  };

  /**
   * @override
   */
  onTick = entIdx => {
    if (this.aliveStatus) {
      this.onDrawImageTick();
      this.onCollisionTick(entIdx);
    } else {
      // Create the destroy explosion.
      this.createDestroyExplosion();
      this.disposeEntity(entIdx);
    }
  };
}

export default BombEntity;
