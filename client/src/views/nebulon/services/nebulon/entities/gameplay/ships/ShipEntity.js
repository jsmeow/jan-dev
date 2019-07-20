import Game from '../../../game/Game';
import GamePlayEntity from '../GamePlayEntity';
import BulletEntity from '../bullets/BulletEntity';
import ExplosionDestroy from '../../display/explosions/destroy/ExplosionDestroy';
import ExplosionDamage from '../../display/explosions/damage/ExplosionDamage';
import GameCanvas from '../../../game/canvas/GameCanvas';

/**
 * A ship entity.
 */
class ShipEntity extends GamePlayEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * Util values for enemy and wave path creation.
   * @type {*}
   */
  util = {
    /**
     * @see GamePlayEntity.size.width
     */
    defaultEntityWidth: GamePlayEntity.defaultSize.width,
    /**
     * @see GamePlayEntity.size.height
     */
    defaultEntityHeight: GamePlayEntity.defaultSize.height,
    /**
     * @see GameCanvas.size.width
     */
    canvasWidth: GameCanvas.size.width,
    /**
     * @see GameCanvas.size.height
     */
    canvasHeight: GameCanvas.size.height,
    /**
     * X coordinate to spawn an enemy in the center of the canvas for a
     * default GameEntity.
     */
    defaultEntityCanvasCenterX:
      GameCanvas.size.width * 0.5 - GamePlayEntity.defaultSize.width / 2,
    /**
     * Y coordinate to spawn an enemy in the center of the canvas for a
     * default GameEntity.
     */
    defaultEntityCanvasCenterY:
      GameCanvas.size.height * 0.5 - GamePlayEntity.defaultSize.height / 2
  };

  /**
   * @param game
   * @param {number} x
   * @param {number} y
   * @param {number} factionStatus
   * @constructor
   */
  constructor(game, { x, y }, factionStatus) {
    super(game, { x, y }, factionStatus);
    /**
     * ShipEntity damaged image.
     * @type {HTMLElement}
     */
    this.damagedImage = new Image();
    /**
     * ShipEntity damaged image source.
     * To be implemented by the extending class.
     * @type {HTMLElement}
     */
    this.damagedImageSrc = null;
    /**
     * ShipEntity damaged image timeout reference.
     * Reverts the ShipEntity image back to the original image after a delay.
     * @type {number}
     */
    this.damagedImageTimeout = 0;
    /**
     * ShipEntity damaged image timeout delay relative to the game speed.
     * Defaults to game speed * 50ms.
     * @type {number}
     */
    this.damagedImageTimeoutDelay = Game.speed * 200;
    /**
     * ShipEntity status flag if firing.
     * @type {boolean}
     */
    this.firingStatus = false;
    /**
     * ShipEntity fire bullet timeout reference.
     * @type {number}
     */
    this.fireBulletInterval = 0;
    /**
     * ShipEntity fire bullet setTimeout delay relative to the game speed.
     * Defaults to game speed * 1000ms.
     * @type {number}
     */
    this.fireBulletIntervalDelay = Game.speed * 1000;
    /**
     * Bullet dx dy vector magnitude.
     * @type {number}
     */
    this.fireBulletMagnitude = Game.speed * 0.15;
    /**
     * ShipEntity status flag if roaming.
     * This flag is reserved for cpu entities.
     * When set to true, the cpu entity takes control of it's own movement
     * rather than moving a predetermined path.
     * @type {boolean}
     */
    this.roamingStatus = false;
    /**
     * ShipEntity roaming timeout reference.
     * @type {number}
     */
    this.roamingTimeout = 0;
    /**
     * ShipEntity roam speed relative to the game speed.
     * @type {number}
     */
    this.roamSpeed = Game.speed / 50;
    /**
     * ShipEntity roaming setTimeout delay relative to the game speed.
     * Defaults to game speed * 500ms.
     * @type {number}
     */
    this.roamingTimeoutDelay = Game.speed * 500;
    this.init();
  }

  /**
   * @override
   */
  init = () => {
    this.setSize({ ...GamePlayEntity.defaultSize });
    this.setEntityType('ship');
    this.setImageSource();
    this.setDamagedImageSource();
    this.setFiringStatus(true);
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

  /**
   * Firing status setter.
   * @param {boolean} newFiringStatus
   */
  setFiringStatus = newFiringStatus => {
    this.firingStatus = newFiringStatus;
  };

  /**
   * Fire bullet interval delay setter.
   * @param {number} newFireBulletIntervalDelay
   */
  setFireBulletIntervalDelay = newFireBulletIntervalDelay => {
    this.fireBulletIntervalDelay = newFireBulletIntervalDelay;
  };

  /**
   * Roaming status setter.
   * @param {boolean} newRoamingStatus
   */
  setRoamingStatus = newRoamingStatus => {
    this.roamingStatus = newRoamingStatus;
  };

  // ==========================================================================
  // Bullet methods
  // ==========================================================================

  /**
   * Create a bullet.
   */
  createBullet = () => {
    if (this.factionStatus === 0) {
      this.game.addToGameEntities(
        new BulletEntity(
          this.game,
          {
            x: this.position.x + this.size.width / 2 - this.size.width / 16,
            y: this.position.y + this.size.height + 1
          },
          this.factionStatus,
          this.attackPoints,
          { dyDown: this.fireBulletMagnitude }
        )
      );
    }
    if (this.factionStatus === 1) {
      this.game.addToGameEntities(
        new BulletEntity(
          this.game,
          {
            x: this.position.x + this.size.width / 2 - this.size.width / 16,
            y: this.position.y - 1
          },
          this.factionStatus,
          this.attackPoints,
          { dyUp: this.fireBulletMagnitude }
        )
      );
    }
  };

  /**
   * Fire a bullet at a set interval.
   */
  fireBullet = () => {
    if (!this.fireBulletInterval) {
      // Start fire bullet setInterval.
      this.fireBulletInterval = setInterval(() => {
        this.createBullet();
      }, this.fireBulletIntervalDelay);
    }
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
  // Roaming methods
  // ==========================================================================

  /**
   * Queue a roam promise.
   * @param {function=} roam
   * @returns {Promise}
   */
  roamPromise = roam => {
    return new Promise(resolve => {
      // Start roam setTimeout.
      this.roamingTimeout = setTimeout(() => {
        if (roam) {
          roam().then(() => {
            this.disposeMoveInterval();
            resolve();
          });
        } else {
          resolve();
        }
      }, this.roamingTimeoutDelay);
    });
  };

  /**
   * Roam slightly to the left.
   * @returns {Promise<any>|*}
   */
  roamLeft = () => {
    // Adjust to roaming speed.
    const originalSpeed = this.speed;
    this.setSpeed(this.roamSpeed);
    return this.moveTo({ x: this.position.x - 15, y: this.position.y }).then(
      () => {
        // Restore speed.
        this.setSpeed(originalSpeed);
        return Promise.resolve();
      }
    );
  };

  /**
   * Roam slightly to the right.
   * @returns {Promise<any>|*}
   */
  roamRight = () => {
    // Adjust to roaming speed.
    const originalSpeed = this.speed;
    this.setSpeed(this.roamSpeed);
    return this.moveTo({ x: this.position.x + 15, y: this.position.y }).then(
      () => {
        // Restore speed.
        this.setSpeed(originalSpeed);
        return Promise.resolve();
      }
    );
  };

  /**
   * Roam in place action.
   * @returns {Promise<any>|*}
   */
  roamInPlace = () => {
    return new Promise(resolve => {
      // Start roaming.
      this.roamLeft()
        .then(() => this.roamPromise(this.roamRight))
        .then(() => this.roamPromise(this.roamLeft))
        .then(() => this.roamPromise(this.roamRight))
        .then(() => this.roamPromise())
        .then(() => {
          resolve();
        });
    });
  };

  /**
   * Roam wildly action.
   * To be implemented by the extending class.
   * @return {Promise<void>}
   */
  roamWild = () => {
    return Promise.resolve();
  };

  /**
   * Roam loop action.
   * Default roam loop action is:
   * Roam in place
   * Roam wildly
   * @return {Promise<void>}
   */
  roamLoop = () => {
    if (!this.roamingTimeout) {
      this.roamInPlace()
        .then(() => this.roamWild())
        .then(() => {
          this.disposeRoamingTimeout();
          return this.roamLoop();
        });
      return Promise.resolve();
    }
    return null;
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
   * Roaming actions taken on a game tick.
   */
  onRoamingTick = () => {
    if (this.roamingStatus) {
      this.roamLoop();
    }
  };

  /**
   * BulletEntity actions taken on a game tick.
   */
  onBulletTick = () => {
    if (this.firingStatus) {
      this.fireBullet();
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
      this.onRoamingTick();
      this.onBulletTick();
      this.onCollisionTick(entIdx);
    } else {
      this.onScoreTick();
      this.setFiringStatus(false);
      this.disposeMoveInterval();
      this.disposeDamagedImageTimeout();
      this.disposeFireBulletInterval();
      this.disposeRoamingTimeout();
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

  /**
   * Dispose the fire bullet interval.
   */
  disposeFireBulletInterval = () => {
    clearInterval(this.fireBulletInterval);
    this.fireBulletInterval = 0;
  };

  /**
   * Dispose the roaming timeout.
   */
  disposeRoamingTimeout = () => {
    clearTimeout(this.roamingTimeout);
    this.roamingTimeout = 0;
  };
}

export default ShipEntity;
