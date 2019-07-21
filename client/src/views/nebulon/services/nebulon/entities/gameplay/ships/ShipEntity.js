import Game from '../../../game/Game';
import GamePlayEntity from '../GamePlayEntity';
import BulletStandard from '../bullets/standard/BulletStandard';
import BulletHoming from '../bullets/homing/BulletHoming';
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
     * ShipEntity fire standard bullet timeout reference.
     * @type {number}
     */
    this.fireStandardBulletInterval = 0;
    /**
     * ShipEntity fire standard bullet setTimeout delay relative to the game speed.
     * Defaults to game speed * 1000ms.
     * @type {number}
     */
    this.fireStandardBulletIntervalDelay = Game.speed * 500;
    /**
     * ShipEntity standard bullet dx dy vector magnitude.
     * @type {number}
     */
    this.fireStandardBulletMagnitude = Game.speed * 0.15;
    /**
     * ShipEntity fire homing bullet timeout reference.
     * @type {number}
     */
    this.fireHomingBulletInterval = 0;
    /**
     * ShipEntity fire homing bullet setTimeout delay relative to the game speed.
     * Defaults to game speed * 1000ms.
     * @type {number}
     */
    this.fireHomingBulletIntervalDelay = Game.speed * 500;
    /**
     * ShipEntity homing bullet dx dy vector magnitude.
     * @type {number}
     */
    this.fireHomingBulletMagnitude = Game.speed * 0.15;
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
    this.roamingTimeoutDelay = Game.speed * 1500;
    /**
     * ShipEntity status flag if idle.
     */
    this.idleStatus = false;
    this.init();
  }

  /**
   * @override
   */
  init = () => {
    this.setImageSource();
    this.setSize({ ...GamePlayEntity.defaultSize });
    this.setEntityType('ship');
    this.setFiringStatus(true);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Firing status setter.
   * @param {boolean} newFiringStatus
   */
  setFiringStatus = newFiringStatus => {
    this.firingStatus = newFiringStatus;
  };

  /**
   * Fire standard bullet interval delay setter.
   * @param {number} newFireStandardBulletIntervalDelay
   */
  setFireStandardBulletIntervalDelay = newFireStandardBulletIntervalDelay => {
    this.fireStandardBulletIntervalDelay = newFireStandardBulletIntervalDelay;
  };

  /**
   * Fire standard bullet magnitude setter.
   * @param {number} newFireStandardBulletMagnitude
   */
  setFireStandardBulletMagnitude = newFireStandardBulletMagnitude => {
    this.fireStandardBulletMagnitude = newFireStandardBulletMagnitude;
  };

  /**
   * Fire homing bullet interval delay setter.
   * @param {number} newFireHomingBulletIntervalDelay
   */
  setFireHomingBulletIntervalDelay = newFireHomingBulletIntervalDelay => {
    this.fireHomingBulletIntervalDelay = newFireHomingBulletIntervalDelay;
  };

  /**
   * Fire homing bullet magnitude setter.
   * @param {number} newFireHomingBulletMagnitude
   */
  setFireHomingBulletMagnitude = newFireHomingBulletMagnitude => {
    this.fireHomingBulletMagnitude = newFireHomingBulletMagnitude;
  };

  /**
   * Roaming status flag setter.
   * @param {boolean} newRoamingStatus
   */
  setRoamingStatus = newRoamingStatus => {
    this.roamingStatus = newRoamingStatus;
  };

  /**
   * Roaming speed setter.
   * @param {number} newRoamSpeed
   */
  setRoamSpeed = newRoamSpeed => {
    this.roamSpeed = newRoamSpeed;
  };

  /**
   * Idle status flag setter.
   * @param {boolean} newIdleStatus
   */
  setIdleStatus = newIdleStatus => {
    this.idleStatus = newIdleStatus;
  };

  // ==========================================================================
  // Create bullet methods
  // ==========================================================================

  /**
   * Create standard bullet(s).
   * To be implemented by the extending class.
   */
  createStandardBullets = () => {};

  /**
   * Create homing bullet(s).
   * To be implemented by the extending class.
   */
  createHomingBullets = () => {};

  /**
   * Create a standard bullet and add to the game entities collection.
   * @param {{x: number, y: number}} standardBulletSpawnPosition
   * @param {{dxLeft: number=, dxRight: number=, dyUp: number=, dyDown: number=}=} step
   */
  addStandardBulletToGameEntities = (standardBulletSpawnPosition, step) => {
    this.game.addToGameEntities(
      new BulletStandard(
        this.game,
        standardBulletSpawnPosition,
        this.factionStatus,
        this.attackPoints,
        step
      )
    );
  };

  /**
   * Create a homing bullet and add to the game entities collection.
   * @param {{x: number, y: number}} homingBulletSpawnPosition
   */
  addHomingBulletToGameEntities = homingBulletSpawnPosition => {
    this.game.addToGameEntities(
      new BulletHoming(
        this.game,
        homingBulletSpawnPosition,
        this.factionStatus,
        this.attackPoints,
        this.fireHomingBulletMagnitude
      )
    );
  };

  // ==========================================================================
  // Fire bullet methods
  // ==========================================================================

  /**
   * Fire a standard bullet(s) at a set interval.
   */
  fireStandardBullets = () => {
    if (!this.fireStandardBulletInterval) {
      // Start fire standard bullet setInterval.
      this.fireStandardBulletInterval = setInterval(() => {
        // Only fire standard bullets if not idle.
        if (!this.idleStatus) {
          this.createStandardBullets();
        }
      }, this.fireStandardBulletIntervalDelay);
    }
  };

  /**
   * Fire a homing bullet(s) at a set interval.
   */
  fireHomingBullets = () => {
    if (!this.fireHomingBulletInterval) {
      // Start fire standard bullet setInterval.
      this.fireHomingBulletInterval = setInterval(() => {
        // Only fire standard bullets if not idle.
        if (!this.idleStatus) {
          this.createHomingBullets();
        }
      }, this.fireHomingBulletIntervalDelay);
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
   * Roam slightly up.
   * @returns {Promise<any>|*}
   */
  roamUp = () => {
    // Adjust to roaming speed.
    const originalSpeed = this.speed;
    this.setSpeed(this.roamSpeed);
    return this.moveTo({ x: this.position.x, y: this.position.y - 15 }).then(
      () => {
        // Restore speed.
        this.setSpeed(originalSpeed);
        return Promise.resolve();
      }
    );
  };

  /**
   * Roam slightly down.
   * @returns {Promise<any>|*}
   */
  roamDown = () => {
    // Adjust to roaming speed.
    const originalSpeed = this.speed;
    this.setSpeed(this.roamSpeed);
    return this.moveTo({ x: this.position.x, y: this.position.y + 15 }).then(
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
  roamWildly = () => {
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
      // Roam in place.
      this.roamInPlace()
        // Roam wildly.
        .then(() => {
          // Only roam wildly if not in idle status.
          console.log(this.idleStatus);
          if (!this.idleStatus) {
            return this.roamWildly();
          }
          return Promise.resolve();
        })
        // Repeat.
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
   * Bullet actions taken on a game tick.
   */
  onBulletTick = () => {
    if (this.firingStatus) {
      this.fireStandardBullets();
      this.fireHomingBullets();
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
      this.disposeFireStandardBulletInterval();
      this.disposeFireHomingBulletInterval();
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
   * Dispose the fire standard bullet interval.
   */
  disposeFireStandardBulletInterval = () => {
    clearInterval(this.fireStandardBulletInterval);
    this.fireStandardBulletInterval = 0;
  };

  /**
   * Dispose the fire homing bullet interval.
   */
  disposeFireHomingBulletInterval = () => {
    clearInterval(this.fireHomingBulletInterval);
    this.fireHomingBulletInterval = 0;
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
