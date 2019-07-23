import GameEntity from '../GameEntity';
import DamageExplosion from '../display/explosions/damage/DamageExplosion';
import DestroyExplosion from '../display/explosions/destroy/DestroyExplosion';
import Game from '../../game/Game';
import StandardBullet from './bullets/standard/StandardBullet';
import HomingBullet from './bullets/homing/HomingBullet';
import BombSmall from './bombs/small/BombSmall';

/**
 * @abstract
 */
class GamePlayEntity extends GameEntity {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * @see GamePlayEntity.factions
   */
  static factions = {
    ENEMY: 0,
    ALLIED: 1
  };

  /**
   * @see GamePlayEntity.damagedDuration
   */
  static defaultDamagedImageDuration = {
    timeout: 0,
    timeoutDelay: 200
  };

  /**
   * @see GamePlayEntity.standardBullet
   */
  static defaultStandardBullet = {
    interval: 0,
    intervalDelay: 500
  };

  /**
   * @see GamePlayEntity.homingBullet
   */
  static defaultHomingBullet = {
    interval: 0,
    intervalDelay: 500
  };

  /**
   * @see GamePlayEntity.roaming
   */
  static defaultRoaming = {
    timeout: 0,
    timeoutDelay: 1500,
    vectorMagnitude: 0.01
  };

  /**
   * @see GamePlayEntity.status
   */
  static defaultStatus = {
    alive: true,
    invincible: false,
    firing: false,
    idle: false,
    roaming: false
  };

  /**
   * @see GamePlayEntity.points
   */
  static defaultPoints = {
    health: 1,
    attackPoints: 1,
    score: 1
  };

  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {Object=}
   * @constructor
   */
  constructor(game, { x, y, width, height, vector, faction }) {
    super(game, { x, y, width, height, vector });
    /**
     * Factions types.
     * @type {Object}
     */
    this.faction = faction;
    /**
     * Default image. The image source to be provided by the
     * extending class.
     * Damaged image. The image source to be provided by the
     * extending class.
     * @type {Object}
     */
    this.images = {
      default: new Image(),
      damaged: new Image()
    };
    /**
     * Damaged image duration timeout and timeout delay.
     * @type {Object}
     */
    this.damagedImageDuration = {
      ...GamePlayEntity.defaultDamagedImageDuration
    };
    /**
     * Standard bullet interval, interval delay, and vector.
     * @type {Object}
     */
    this.standardBullet = { ...GamePlayEntity.defaultStandardBullet };
    /**
     * Homing bullet interval, interval delay, and vector.
     * @type {Object}
     */
    this.homingBullet = { ...GamePlayEntity.defaultHomingBullet };
    /**
     * Roaming bullet timeout, interval delay, and vector.
     * @type {Object}
     */
    this.roaming = { ...GamePlayEntity.defaultRoaming };
    /**
     * Entity status.
     * @type {Object}
     */
    this.status = { ...GamePlayEntity.defaultStatus };
    /**
     * Entity points.
     * @type {Object}
     */
    this.points = { ...GamePlayEntity.defaultPoints };
  }

  /**
   * Load assets.
   * @param {Object}
   */
  loadAssets = ({
    enemyImageSource,
    alliedImageSource,
    damagedImageSource
  }) => {
    if (enemyImageSource && this.faction === 0) {
      this.setDefaultImageSource(enemyImageSource);
    }
    if (alliedImageSource && this.faction === 1) {
      this.setDefaultImageSource(alliedImageSource);
    }
    if (damagedImageSource) {
      this.setDamagedImageSource(damagedImageSource);
    }
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Faction status setter.
   * @param {number} newFaction
   */
  setFaction = newFaction => {
    this.faction = newFaction;
  };

  /**
   * Default image source setter.
   * @param {string} newDefaultImage
   */
  setDefaultImageSource = newDefaultImage => {
    this.images.default.src = newDefaultImage;
  };

  /**
   * Damaged image source setter.
   * @param {string} newDamagedImage
   */
  setDamagedImageSource = newDamagedImage => {
    this.images.damaged.src = newDamagedImage;
  };

  /**
   * Standard bullet interval delay setter.
   * @param {number} newStandardBulletIntervalDelay
   */
  setStandardBulletIntervalDelay = newStandardBulletIntervalDelay => {
    this.standardBullet.intervalDelay = newStandardBulletIntervalDelay;
  };

  /**
   * Homing bullet interval delay setter.
   * @param {number} newHomingBulletIntervalDelay
   */
  setHomingBulletIntervalDelay = newHomingBulletIntervalDelay => {
    this.homingBullet.intervalDelay = newHomingBulletIntervalDelay;
  };

  /**
   * Roaming timeout delay setter.
   * @param {number} newRoamingTimeoutDelay
   */
  setRoamingTimeoutDelay = newRoamingTimeoutDelay => {
    this.roaming.timeoutDelay = newRoamingTimeoutDelay;
  };

  /**
   * Roaming vector magnitude setter.
   * @param {Object} newRoamingVectorMagnitude
   */
  setRoamingVectorMagnitude = newRoamingVectorMagnitude => {
    this.roaming.vectorMagnitude = newRoamingVectorMagnitude;
  };

  /**
   * Alive status flag setter.
   * @param {boolean} newAliveStatus
   */
  setAliveStatus = newAliveStatus => {
    this.status.alive = newAliveStatus;
  };

  /**
   * Invincibility status flag setter.
   * @param {boolean} newInvincibleStatus
   */
  setInvincibleStatus = newInvincibleStatus => {
    this.status.invincible = newInvincibleStatus;
  };

  /**
   * Firing status flag setter.
   * @param {boolean} newFiringStatus
   */
  setFiringStatus = newFiringStatus => {
    this.status.firing = newFiringStatus;
  };

  /**
   * Idle status flag setter.
   * @param {boolean} newIdleStatus
   */
  setIdleStatus = newIdleStatus => {
    this.status.idle = newIdleStatus;
  };

  /**
   * ShipEntity roaming status flag setter.
   * @param {boolean} newRoamingStatus
   */
  setRoamingStatus = newRoamingStatus => {
    this.status.roaming = newRoamingStatus;
  };

  /**
   * Hit points setter.
   * @param {number} newHealth
   */
  setHealthPoints = newHealth => {
    this.points.health = newHealth;
  };

  /**
   * Attack points setter.
   * @param {number} newAttack
   */
  setAttackPoints = newAttack => {
    this.points.attack = newAttack;
  };

  /**
   * Score points setter.
   * @param {number} newScorePoints
   */
  setScorePoints = newScorePoints => {
    this.points.scorePoints = newScorePoints;
  };

  /**
   * Type setter.
   * @param {string} newType
   */
  setType = newType => {
    this.type = newType;
  };

  // ==========================================================================
  // Entity collision detection methods
  // ==========================================================================

  /**
   * Actions to take on a entity collision event.
   * @param {Object} entity
   */
  onCollisionEvent = entity => {
    // Skip if this entity instance dead or invincible.
    if (this.status.alive && !this.status.invincible) {
      // Take damage on this entity instance.
      this.points.health -= entity.points.attack;
      // Die if hit points <= 0 on this entity instance.
      if (this.points.health <= 0) {
        this.status.alive = false;
      }
    }
    // Skip if entity instance dead or invincible.
    if (entity.status.alive && !entity.status.invincible) {
      // Do damage on entity instance.
      entity.points.health -= this.points.attack;
      // Die if hit points <= 0 on entity instance.
      if (entity.points.health <= 0) {
        entity.status.alive = false;
      }
    }
  };

  /**
   * Collision detection algorithm.
   * @param {number} thisEntIdx
   */
  hasEntityCollidedEntity = thisEntIdx => {
    let hasEntityCollided = false;
    // Cycle through entity collection.
    this.game.gameEntities.forEach((entity, entIdx) => {
      if (
        // Skip if this entity instance faction is the same as entity faction.
        this.faction !== entity.faction &&
        // Skip if this this entity and entity are both bullet types.
        (this.type === GameEntity.types.BULLET &&
          entity.type === GameEntity.types.BULLET) &&
        // Skip if this entity instance is invincible.
        !this.status.invincible &&
        // Skip if entity references itself.
        thisEntIdx !== entIdx &&
        // Skip if entity is does not have an entity type.
        !entity.type &&
        // Skip if entity is dead.
        !entity.status.alive
      ) {
        // Perform collision check.
        if (
          this.position.x < entity.position.x + entity.size.width &&
          this.position.x + this.size.width > entity.position.x &&
          this.position.y < entity.position.y + entity.size.height &&
          this.position.y + this.size.height > entity.position.y
        ) {
          // Take action on collision event.
          this.onCollisionEvent(entity);
          // Set collided flag.
          hasEntityCollided = true;
        }
      }
    });
    return hasEntityCollided;
  };

  // ==========================================================================
  // Roaming methods
  // ==========================================================================

  /**
   * Roam.
   * @param {Object}
   * @param {Object} vector
   * @returns {Promise}
   */
  roam = ({ dx, dy }, vector) => {
    // Move at adjusted speed.
    return this.moveInVectorToPoint(
      {
        x: this.position.x + dx,
        y: this.position.y + dy
      },
      { ...vector }
    );
  };

  /**
   * Roam entity in place.
   * @param {number=} roamingTimeoutDelay
   * @returns {Promise}
   */
  roamInPlace = (roamingTimeoutDelay = this.roaming.timeoutDelay) => {
    // Queue a roam promise.
    const roamPromise = roam => {
      return new Promise(resolve => {
        // Start roam timeout.
        this.roaming.timeout = setTimeout(() => {
          if (roam) {
            roam().then(() => {
              resolve();
            });
          } else {
            resolve();
          }
        }, Game.speed * roamingTimeoutDelay);
      });
    };
    // Execute roam promises.
    return new Promise(resolve => {
      // Start roaming.
      this.roam({ dx: -15, dy: 0 }, { left: this.roaming.vectorMagnitude })
        .then(() =>
          roamPromise(
            this.roam(
              { dx: 30, dy: 0 },
              { right: this.roaming.vectorMagnitude }
            )
          )
        )
        .then(() =>
          roamPromise(
            this.roam(
              { dx: -15, dy: 0 },
              { left: this.roaming.vectorMagnitude }
            )
          )
        )
        .then(() => roamPromise())
        .then(() => {
          resolve();
        });
    });
  };

  /**
   * Roam entity wildly action.
   * To be implemented by the extending class.
   * @return {Promise}
   */
  roamWildly = () => {};

  /**
   * Roam entity loop action.
   * Default roam loop action is:
   * Roam in place
   * Roam wildly
   * @return {Promise|void}
   */
  roamLoop = () => {
    if (!this.roaming.timeout) {
      // Roam in place.
      this.roamInPlace()
        // Roam wildly.
        .then(() => {
          // Only roam wildly if not in idle status.
          if (!this.status.idle) {
            return this.roamWildly();
          }
          return Promise.resolve();
        })
        // Repeat.
        .then(() => {
          this.disposeRoamingTimeout();
          return this.roamLoop();
        });
    }
    return Promise.resolve();
  };

  // ==========================================================================
  // Bullet methods
  // ==========================================================================

  /**
   * Action taken when adding a standard bullet to the game entities
   * collection.
   * Leave as is if no action to be taken.
   * To be implemented by the extending class.
   */
  createStandardBullets = () => {
    // Implementation.
  };

  /**
   * Action taken when adding a homing bullet to the game entities collection.
   * Leave as is if no action to be taken.
   * To be implemented by the extending class.
   */

  createHomingBullets = () => {
    // Implementation.
  };

  /**
   * Add a standard bullet to the game entities collection.
   * @param {Object}
   */
  createStandardBullet = ({ position, size, vector }) => {
    this.game.addToEntities(
      new StandardBullet(this.game, {
        ...position,
        ...size,
        vector,
        faction: this.faction,
        attackPoints: this.points.attack
      })
    );
  };

  /**
   * Add a homing bullet to the game entities collection.
   * @param {Object}
   */
  createHomingBullet = ({ position, size, vectorMagnitude }) => {
    this.game.addToEntities(
      new HomingBullet(this.game, {
        ...position,
        ...size,
        vectorMagnitude,
        faction: this.faction,
        attackPoints: this.points.attack
      })
    );
  };

  /**
   * Add a standard bullet to the game entities collection at a set interval.
   * @param {number=} addStandardBulletToGameEntitiesIntervalDelay
   */
  addStandardBulletToGameEntities = (
    addStandardBulletToGameEntitiesIntervalDelay = this.standardBullet
      .intervalDelay
  ) => {
    if (!this.standardBullet.interval) {
      // Start add standard bullet to entities collection interval.
      this.standardBullet.interval = setInterval(() => {
        // Only fire standard bullets if not idle.
        if (!this.status.idle) {
          this.createStandardBullets();
        }
      }, Game.speed * addStandardBulletToGameEntitiesIntervalDelay);
    }
  };

  /**
   * Add a homing bullet to the game entities collection at a set interval.
   * @param {number=} addHomingBulletToGameEntitiesIntervalDelay
   */
  addHomingBulletToGameEntities = (
    addHomingBulletToGameEntitiesIntervalDelay = this.homingBullet.intervalDelay
  ) => {
    if (!this.homingBullet.interval) {
      // Start add homing bullet to entities collection interval.
      this.homingBullet.interval = setInterval(() => {
        // Only fire homing bullets if not idle.
        if (!this.status.idle) {
          this.createHomingBullets();
        }
      }, Game.speed * addHomingBulletToGameEntitiesIntervalDelay);
    }
  };

  // ==========================================================================
  // Bomb methods
  // ==========================================================================

  /**
   * Add a small bomb to the game entities collection.
   * @param {Object} position
   * @param {Object} size
   * @param {Object} d
   */
  createSmallBomb = (position, size, vector) => {
    this.game.addToGameEntities(
      new BombSmall(this.game, {
        ...position,
        ...size,
        ...vector,
        faction: this.faction,
        attackPoints: this.points.attack
      })
    );
  };

  // ==========================================================================
  // Explosion methods
  // ==========================================================================

  /**
   * Add a damage explosion to the game entities collection.
   * @param {Object} position
   * @param {Object} size
   */
  createDamageExplosion = (position = this.position, size = this.size) => {
    this.game.addToEntities(
      new DamageExplosion(this.game, { ...position, ...size })
    );
  };

  /**
   * Add a destroy explosion to the game entities collection.
   * @param {Object} position
   * @param {Object} size
   */
  createDestroyExplosion = (position = this.position, size = this.size) => {
    this.game.addToEntities(
      new DestroyExplosion(this.game, { ...position, ...size })
    );
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * Draw actions taken on a game tick.
   * @param {string=} image
   * @param {Object=} position
   * @param {Object=} size
   * @param {number=} degrees
   */
  onDrawImageTick = (
    image = this.images.default,
    position = this.position,
    size = this.size,
    degrees = Math.PI
  ) => {
    if (this.faction === 0) {
      this.game.canvas.drawRotatedImage(image, position, size, degrees);
    }
    if (this.faction === 1) {
      this.game.canvas.drawImage(image, position, size);
    }
  };

  /**
   * Roaming actions taken on a game tick.
   */
  onRoamingTick = () => {
    if (this.status.roaming && !this.type !== GamePlayEntity.types.BULLET) {
      this.roamLoop();
    }
  };

  /**
   * Bullet actions taken on a game tick.
   */
  onBulletTick = () => {
    if (this.status.firing && !this.type !== GamePlayEntity.types.BULLET) {
      this.addStandardBulletToGameEntities();
      this.addHomingBulletToGameEntities();
    }
  };

  /**
   * Collision actions taken on a game tick.
   * @param {number} entIdx
   * @param {number=} damagedDurationTimeoutDelay
   */
  onCollisionTick = (
    entIdx,
    damagedDurationTimeoutDelay = this.damagedImageDuration.timeoutDelay
  ) => {
    // On collision check true.
    if (
      !this.damagedImageDuration.timeout &&
      this.hasEntityCollidedEntity(entIdx)
    ) {
      // Create a damage explosion.
      if (this.status.alive) {
        this.createDamageExplosion();
      }
      // Flash damage image.
      this.setGameEntityImageSource(this.images.damaged);
      // Restore default image after timeout.
      this.damagedImageDuration.timeout = setTimeout(() => {
        this.setGameEntityImageSource(this.images.default);
      }, Game.speed * damagedDurationTimeoutDelay);
    }
  };

  /**
   * Score actions taken on a game tick.
   */
  onScoreTick = () => {
    this.game.addToScore(this.points.score);
  };

  /**
   * @override
   */
  onDisposeTick = entIdx => {
    // Dispose GameEntity resources.
    this.disposeVectorInterval();
    // Dispose GamePlayEntity resources.
    this.disposeDamagedImageDurationTimeout();
    this.disposeStandardBulletInterval();
    this.disposeHomingBulletInterval();
    this.disposeRoamingTimeout();
    // Set firing status to false.
    this.setFiringStatus(false);
    // Set to alive status to false (if not already).
    this.setAliveStatus(false);
    // Add entity point worth to the game score.
    this.onScoreTick();
    // Create the destroy explosion.
    this.createDestroyExplosion();
    // Dispose entity.
    this.game.disposeEntity(entIdx);
  };

  // ==========================================================================
  // Dispose methods
  // ==========================================================================

  /**
   * Dispose the damaged image duration timeout.
   */
  disposeDamagedImageDurationTimeout = () => {
    clearTimeout(this.damagedImageDuration.timeout);
    this.damagedImageDuration.timeout = 0;
  };

  /**
   * Dispose the add standard bullet to game entities interval.
   */
  disposeStandardBulletInterval = () => {
    clearInterval(this.standardBullet.interval);
    this.this.standardBullet.interval = 0;
  };

  /**
   * Dispose the add homing bullet to game entities interval.
   */
  disposeHomingBulletInterval = () => {
    clearInterval(this.homingBullet.interval);
    this.this.homingBullet.interval = 0;
  };

  /**
   * Dispose the roaming timeout.
   */
  disposeRoamingTimeout = () => {
    clearTimeout(this.roaming.timeout);
    this.roaming.timeout = 0;
  };
}

export default GamePlayEntity;
