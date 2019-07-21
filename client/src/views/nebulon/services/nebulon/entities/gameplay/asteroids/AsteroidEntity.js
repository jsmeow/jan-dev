import Game from '../../../game/Game';
import GamePlayEntity from '../GamePlayEntity';
import ExplosionDamage from '../../display/explosions/damage/ExplosionDamage';
import ExplosionDestroy from '../../display/explosions/destroy/ExplosionDestroy';

class AsteroidEntity extends GamePlayEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number} x
   * @param {number} y
   * @param {number} factionStatus
   * @param {{dxLeft: number=, dxRight: number=, dyUp: number=, dyDown: number=}=} step
   * @constructor
   */
  constructor(game, { x, y }, step) {
    super(game, { x, y }, 0);
    /**
     * AsteroidEntity image source.
     * To be implemented by the extending class.
     * @type {HTMLElement}
     */
    this.enemyImageSrc = null;
    /**
     * AsteroidEntity damaged image source.
     * To be implemented by the extending class.
     * @type {HTMLElement}
     */
    this.damagedImageSrc = null;
    /**
     * AsteroidEntity damaged image timeout reference.
     * Reverts the AsteroidEntity image back to the original image after a delay.
     * @type {number}
     */
    this.damagedImageTimeout = 0;
    /**
     * AsteroidEntity damaged image timeout delay relative to the game speed.
     * Defaults to game speed * 50ms.
     * @type {number}
     */
    this.damagedImageTimeoutDelay = Game.speed * 200;
    this.init(step);
  }

  /**
   * @override
   */
  init = step => {
    this.setImageSource();
    // this.setDamagedImageSource();
    this.setSize({
      width: GamePlayEntity.defaultSize.width,
      height: GamePlayEntity.defaultSize.height
    });
    this.setEntityType('asteroid');
    this.setSpeed(Game.speed / 3.125);
    this.setHitPoints(5);
    this.setAttackPoints(5);
    this.setScorePoints(5);
    this.moveDirection(step);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Damaged image source setter.
   */
  setDamagedImageSource = () => {
    this.damagedImage.src = this.damagedImageSrc;
  };

  // ==========================================================================
  // Explosion methods
  // ==========================================================================

  /**
   * Create a explosion on ShipEntity taking damage.
   */
  createDamageExplosion = () => {
    this.game.addToGameEntities(
      new ExplosionDamage(this.game, {
        x: this.position.x,
        y: this.position.y
      })
    );
  };

  /**
   * Create a explosion on ShipEntity dispose.
   */
  createDestroyExplosion = () => {
    this.game.addToGameEntities(
      new ExplosionDestroy(this.game, {
        x: this.position.x,
        y: this.position.y
      })
    );
  };

  // ==========================================================================
  // Entity collision detection methods
  // ==========================================================================

  /**
   * @override
   */
  onEntityCollision = entity => {
    if (entity.aliveStatus) {
      this.hitPoints -= entity.attackPoints;
      entity.hitPoints -= this.attackPoints;
      if (this.hitPoints <= 0) {
        this.aliveStatus = false;
      }
      if (entity.hitPoints <= 0) {
        entity.aliveStatus = false;
      }
    }
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * Collision actions taken on a game tick.
   * @param {number} entIdx
   */
  onCollisionTick = entIdx => {
    if (!this.damagedImageTimeout && this.hasCollidedEntity(entIdx)) {
      // Create a damage explosion.
      if (this.aliveStatus) {
        this.createDamageExplosion();
      }
      // Flash image on damage.
      this.image.src = this.damagedImageSrc;
      this.damagedImageTimeout = setTimeout(() => {
        this.setImageSource();
        this.disposeDamagedImageTimeout();
      }, this.damagedImageTimeoutDelay);
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
      this.disposeMoveInterval();
      this.disposeDamagedImageTimeout();
      // Create the destroy explosion.
      this.createDestroyExplosion();
      this.disposeEntity(entIdx);
    }
  };

  // ==========================================================================
  // Dispose methods
  // ==========================================================================

  /**
   * Dispose the damaged image timeout.
   */
  disposeDamagedImageTimeout = () => {
    clearTimeout(this.damagedImageTimeout);
    this.damagedImageTimeout = 0;
  };
}

export default AsteroidEntity;
