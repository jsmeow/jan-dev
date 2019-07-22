import Game from '../../../game/Game';
import GamePlayEntity from '../GamePlayEntity';
import StandardBullet from '../bullets/standard/StandardBullet';
import HomingBullet from '../bullets/homing/HomingBullet';
import BombSmall from '../bombs/small/BombSmall';

/**
 * @abstract
 */
class ShipEntity extends GamePlayEntity {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * ShipEntity firing status flag value on initial spawn.
   * ShipEntity idle status flag value on initial spawn.
   * ShipEntity status flag if roaming value on initial spawn.
   * This flag is reserved for cpu entities.
   * When set to true, the cpu entity takes control of it's own movement
   * rather than moving a predetermined path.
   * @type {{firing: boolean, idle: boolean, roaming: boolean}}
   */
  static shipEntityStatusDefault = {
    firing: false,
    idle: false,
    roaming: false
  };

  /**
   * ShipEntity fire standard bullet interval value on initial spawn.
   * ShipEntity fire standard bullet interval delay modifier value on initial
   * spawn.
   * ShipEntity standard bullet d vector magnitude modifier value on initial
   * spawn.
   * @type {{interval: number, intervalDelayModifier: number,
   * vectorMagnitudeModifier: number}}
   */
  static shipEntityFireStandardBulletDefault = {
    interval: 0,
    intervalDelayModifier: 500,
    vectorMagnitudeModifier: 0.15
  };

  /**
   * ShipEntity fire homing bullet interval value on initial spawn.
   * ShipEntity fire homing bullet interval delay modifier value on initial
   * spawn.
   * ShipEntity homing bullet d vector magnitude modifier value on initial
   * spawn.
   * @type {{interval: number, intervalDelayModifier: number,
   * vectorMagnitudeModifier: number}}
   */
  static shipEntityFireHomingBulletDefault = {
    interval: 0,
    intervalDelayModifier: 500,
    vectorMagnitudeModifier: 0.15
  };

  /**
   * ShipEntity roaming timeout value on initial spawn.
   * ShipEntity roam speed modifier value on initial spawn.
   * ShipEntity roaming setTimeout delay modifier value on initial spawn.
   * @type {{timeout: number, timeoutDelayModifier: number,
   * vectorMagnitudeModifier: number}}
   */
  static shipEntityRoamingDefault = {
    timeout: 0,
    timeoutDelayModifier: 1500,
    vectorMagnitudeModifier: 0.15
  };

  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

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
     * ShipEntity status flag if firing.
     * ShipEntity status flag if idle.
     * ShipEntity status flag if roaming.
     * @type {{firing: boolean, idle: boolean, roaming: boolean}}
     */
    this.shipEntityStatus = { ...ShipEntity.shipEntityStatusDefault };
    /**
     * ShipEntity fire standard bullet timeout reference.
     * ShipEntity fire standard bullet timeout delay modifier value.
     * ShipEntity standard bullet d vector magnitude modifier value.
     * @type {{interval: number, intervalDelay: number, vectorMagnitude: number}}
     */
    this.shipEntityFireStandardBullet = {
      interval: GamePlayEntity.shipEntityFireStandardBulletDefault.interval,
      intervalDelay:
        Game.gameSpeed *
        GamePlayEntity.shipEntityFireStandardBulletDefault
          .intervalDelayModifier,
      vectorMagnitude:
        Game.gameSpeed *
        GamePlayEntity.shipEntityFireStandardBulletDefault
          .vectorMagnitudeModifier
    };
    /**
     * ShipEntity fire homing bullet interval reference.
     * ShipEntity fire homing bullet interval delay modifier value.
     * ShipEntity homing bullet d vector magnitude modifier value.
     * @type {{interval: number, intervalDelay: number, vectorMagnitude: number}}
     */
    this.shipEntityFireHomingBullet = {
      interval: GamePlayEntity.shipEntityFireHomingBulletDefault.interval,
      intervalDelay:
        Game.gameSpeed *
        GamePlayEntity.shipEntityFireHomingBulletDefault.intervalDelayModifier,
      vectorMagnitude:
        Game.gameSpeed *
        GamePlayEntity.shipEntityFireHomingBulletDefault.vectorMagnitudeModifier
    };
    /**
     * ShipEntity roaming timeout delay reference.
     * ShipEntity roaming timeout delay modifier value.
     * ShipEntity roam speed modifier value.
     * @type {{timeout: number, timeoutDelay: number, vectorMagnitude: number}}
     */
    this.shipEntityRoaming = {
      timeout: GamePlayEntity.shipEntityRoamingDefault.timeout,
      timeoutDelay:
        Game.gameSpeed *
        GamePlayEntity.shipEntityRoamingDefault.timeoutDelayModifier,
      vectorMagnitude:
        Game.gameSpeed *
        GamePlayEntity.shipEntityRoamingDefault.vectorMagnitudeModifier
    };
  }

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * ShipEntity idle status flag setter.
   * @param {boolean} newShipEntityFiringStatus
   */
  setShipEntityFiringStatus = newShipEntityFiringStatus => {
    this.shipEntityStatus.firing = newShipEntityFiringStatus;
  };

  /**
   * ShipEntity idle status flag setter.
   * @param {boolean} newShipEntityIdleStatus
   */
  setShipEntityIdleStatus = newShipEntityIdleStatus => {
    this.shipEntityStatus.idle = newShipEntityIdleStatus;
  };

  /**
   * ShipEntity roaming status flag setter.
   * @param {boolean} newShipEntityRoamingStatus
   */
  setShipEntityRoamingStatus = newShipEntityRoamingStatus => {
    this.shipEntityStatus.roaming = newShipEntityRoamingStatus;
  };

  /**
   * ShipEntity fire standard bullet interval delay setter.
   * @param {number} newShipEntityFireStandardBulletIntervalDelayModifier
   */
  setShipEntityFireStandardBulletIntervalDelay = newShipEntityFireStandardBulletIntervalDelayModifier => {
    this.shipEntityFireStandardBullet.intervalDelay =
      Game.gameSpeed * newShipEntityFireStandardBulletIntervalDelayModifier;
  };

  /**
   * ShipEntity fire standard bullet vector magnitude setter.
   * @param {number} newShipEntityFireStandardBulletVectorMagnitudeModifier
   */
  setShipEntityFireStandardBulletVectorMagnitude = newShipEntityFireStandardBulletVectorMagnitudeModifier => {
    this.shipEntityFireStandardBullet.vectorMagnitude =
      Game.gameSpeed * newShipEntityFireStandardBulletVectorMagnitudeModifier;
  };

  /**
   * ShipEntity fire homing bullet interval delay setter.
   * @param {number} newShipEntityFireHomingBulletIntervalDelayModifier
   */
  setShipEntityFireHomingBulletIntervalDelay = newShipEntityFireHomingBulletIntervalDelayModifier => {
    this.shipEntityFireHomingBullet.intervalDelay =
      Game.gameSpeed * newShipEntityFireHomingBulletIntervalDelayModifier;
  };

  /**
   * ShipEntity fire homing bullet vector magnitude setter.
   * @param {number} newShipEntityFireHomingBulletVectorMagnitudeModifier
   */
  setShipEntityFireHomingBulletVectorMagnitude = newShipEntityFireHomingBulletVectorMagnitudeModifier => {
    this.shipEntityFireHomingBullet.vectorMagnitudeVectorMagnitude =
      Game.gameSpeed * newShipEntityFireHomingBulletVectorMagnitudeModifier;
  };

  /**
   * ShipEntity roaming timeout delay setter.
   * @param {number} newShipEntityRoamingTimeoutDelay
   */
  setShipEntityRoamingTimeoutDelay = newShipEntityRoamingTimeoutDelay => {
    this.shipEntityRoaming.vectorMagnitude =
      Game.gameSpeed * newShipEntityRoamingTimeoutDelay;
  };

  /**
   * ShipEntity roaming vector magnitude setter.
   * @param {number} newShipEntityRoamingVectorMagnitude
   */
  setShipEntityRoamingVectorMagnitude = newShipEntityRoamingVectorMagnitude => {
    this.shipEntityRoaming.vectorMagnitude =
      Game.gameSpeed * newShipEntityRoamingVectorMagnitude;
  };

  // ==========================================================================
  // Create bullet methods
  // ==========================================================================

  /**
   * ShipEntity action taken when adding a standard bullet to the game entities
   * collection.
   * Leave as is if no action to be taken.
   * To be implemented by the extending class.
   */
  addShipEntityStandardBulletToGameEntitiesAction = () => {};

  /**
   * ShipEntity action taken when adding a homing bullet to the game entities
   * collection.
   * Leave as is if no action to be taken.
   * To be implemented by the extending class.
   */

  addShipEntityHomingBulletToGameEntitiesAction = () => {};

  /**
   * ShipEntity add a standard bullet to the game entities collection.
   * @param {{x: number, y: number}} standardBulletSpawnPosition
   * @param {{dxLeft: number=, dxRight: number=, dyUp: number=, dyDown: number=}=} d
   */
  addShipEntityStandardBulletToGameEntities = (
    standardBulletSpawnPosition,
    d
  ) => {
    this.game.addToGameEntities(
      new StandardBullet(
        this.game,
        { ...standardBulletSpawnPosition },
        this.gamePlayEntityFaction,
        this.gamePlayEntityPoints.attackPoints,
        d
      )
    );
  };

  /**
   * ShipEntity add a homing bullet to the game entities collection.
   * @param {{x: number, y: number}} homingBulletSpawnPosition
   * @param {number=} d
   */
  addShipEntityHomingBulletToGameEntities = (
    homingBulletSpawnPosition,
    d = this.shipEntityFireHomingBulletVectorMagnitude
  ) => {
    this.game.addToGameEntities(
      new HomingBullet(
        this.game,
        { ...homingBulletSpawnPosition },
        this.gamePlayEntityFaction,
        this.gamePlayEntityPoints.attackPoints,
        d
      )
    );
  };

  /**
   * ShipEntity add a standard bullet to the game entities collection. at a set
   * interval.
   * @param {number=} shipEntityFireStandardBulletIntervalDelay
   */
  addShipEntityStandardBulletsToGameEntities = (
    shipEntityFireStandardBulletIntervalDelay = this
      .shipEntityFireStandardBullet.intervalDelay
  ) => {
    if (!this.shipEntityFireStandardBullet.interval) {
      // Start fire standard bullet interval.
      this.shipEntityFireStandardBullet.interval = setInterval(() => {
        // Only fire standard bullets if not idle.
        if (!this.shipEntityStatus.idle) {
          this.addShipEntityStandardBulletToGameEntitiesAction();
        }
      }, shipEntityFireStandardBulletIntervalDelay);
    }
  };

  /**
   * ShipEntity add a homing bullet to the game entities collection. at a set
   * interval.
   * @param {number=} shipEntityFireHomingBulletIntervalDelay
   */
  addShipEntityHomingBulletsToGameEntities = (
    shipEntityFireHomingBulletIntervalDelay = this.shipEntityFireHomingBullet
      .intervalDelay
  ) => {
    if (!this.shipEntityFireHomingBullet.interval) {
      // Start fire homing bullet interval.
      this.shipEntityFireHomingBullet.interval = setInterval(() => {
        // Only fire homing bullets if not idle.
        if (!this.shipEntityStatus.idle) {
          this.addShipEntityHomingBulletToGameEntitiesAction();
        }
      }, shipEntityFireHomingBulletIntervalDelay);
    }
  };

  // ==========================================================================
  // Create bomb methods
  // ==========================================================================

  /**
   * ShipEntity add a small bomb to the game entities collection.
   * @param {{x: number, y: number}} position
   * @param {{dxLeft: number=, dxRight: number=, dyUp: number=, dyDown: number=}=} d
   */
  addShipEntitySmallBombToGameEntities = (position, d) => {
    this.game.addToGameEntities(
      new BombSmall(
        this.game,
        { ...position },
        this.gamePlayEntityFaction,
        this.gamePlayEntityPoints.attackPoints,
        d
      )
    );
  };

  // ==========================================================================
  // Roaming methods
  // ==========================================================================

  /**
   * ShipEntity roaming slightly.
   * @param {number} dx
   * @param {number} dy
   * @returns {Promise<any>|*}
   */
  roamShipEntity = ({ dx, dy }) => {
    // Adjust to roaming speed.
    const originalVectorMagnitude = this.gameEntityMoveVector.magnitude;
    this.setGameEntitySpeed(this.shipEntityRoaming.vectorMagnitude);
    // Move at adjusted speed.
    return this.moveTo({
      x: this.gameEntityPosition.x + dx,
      y: this.gameEntityPosition.y + dy
    }).then(() => {
      // Restore to original speed.
      this.setGameEntitySpeed(originalVectorMagnitude);
      return Promise.resolve();
    });
  };

  /**
   * ShipEntity roam in place action.
   * @param {number=} shipEntityRoamingTimeoutDelay
   * @returns {Promise<any>|*}
   */
  roamShipEntityInPlace = (
    shipEntityRoamingTimeoutDelay = this.shipEntityRoaming.timeoutDelay
  ) => {
    // Queue a roam promise.
    const roamPromise = roam => {
      return new Promise(resolve => {
        // Start roam setTimeout.
        this.shipEntityRoaming.timeout = setTimeout(() => {
          if (roam) {
            roam().then(() => {
              this.disposeGameEntityMoveVectorInterval();
              this.disposeShipEntityRoamingTimeout();
              resolve();
            });
          } else {
            resolve();
          }
        }, shipEntityRoamingTimeoutDelay);
      });
    };
    // Execute roam promises.
    return new Promise(resolve => {
      // Start roaming.
      this.roamShipEntity({ dx: -15, dy: 0 })
        .then(() => roamPromise(this.roamShipEntity({ dx: 30, dy: 0 })))
        .then(() => roamPromise(this.roamShipEntity({ dx: -15, dy: 0 })))
        .then(() => roamPromise())
        .then(() => {
          resolve();
        });
    });
  };

  /**
   * ShipEntity roam wildly action.
   * To be implemented by the extending class or left as is if entity does not
   * roam wildly.
   * @return {Promise<void>}
   */
  roamShipEntityWildly = () => {
    return Promise.resolve();
  };

  /**
   * ShipEntity roam loop action.
   * Default roam loop action is:
   * Roam in place
   * Roam wildly
   * @return {Promise<void>}
   */
  roamShipEntityLoop = () => {
    if (!this.shipEntityRoaming.timeout) {
      // Roam in place.
      this.roamShipEntityInPlace()
        // Roam wildly.
        .then(() => {
          // Only roam wildly if not in idle status.
          if (!this.shipEntityStatus.idle) {
            return this.roamShipEntityWildly();
          }
          return Promise.resolve();
        })
        // Repeat.
        .then(() => {
          this.disposeShipEntityRoamingTimeout();
          return this.roamShipEntityLoop();
        });
      return Promise.resolve();
    }
    return null;
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * ShipEntity roaming actions taken on a game tick.
   */
  onShipEntityRoamingTick = () => {
    if (this.shipEntityStatus.roaming) {
      this.roamLoop();
    }
  };

  /**
   * ShipEntity bullet actions taken on a game tick.
   */
  onShipEntityBulletTick = () => {
    if (this.shipEntityStatus.firing) {
      this.addShipEntityStandardBulletsToGameEntities();
      this.addShipEntityHomingBulletsToGameEntities();
    }
  };

  /**
   * @override
   */
  onGameEntityTick = entIdx => {
    if (this.gamePlayEntityStatus.alive) {
      this.onGamePlayEntityDrawImageTick();
      this.onShipEntityRoamingTick();
      this.onShipEntityBulletTick();
      this.onGamePlayEntityCollisionTick(entIdx);
    } else {
      // Dispose GameEntity resources.
      this.disposeGameEntityMoveVectorInterval();
      // Dispose GamePlayEntity resources.
      this.disposeGamePlayEntityDamagedImageTimeout();
      // Dispose ShipEntity intervals and timeouts.
      this.disposeShipEntityFireStandardBulletInterval();
      this.disposeShipEntityFireHomingBulletInterval();
      this.disposeShipEntityRoamingTimeout();
      // Set to alive status to false (if not already).
      this.setGamePlayEntityAliveStatus(false);
      // Set firing status to false.
      this.setShipEntityFiringStatus(false);
      // Add to the game score.
      this.onGamePlayEntityScoreTick();
      // Create the destroy explosion.
      this.addGamePlayEntityDestroyExplosionToGameEntities();
      // Dispose GameEntity.
      this.game.disposeGameEntity(entIdx);
    }
  };

  // ==========================================================================
  // Dispose methods
  // ==========================================================================

  /**
   * ShipEntity dispose the fire standard bullet interval.
   */
  disposeShipEntityFireStandardBulletInterval = () => {
    clearInterval(this.shipEntityFireStandardBullet.interval);
    this.this.shipEntityFireStandardBullet.interval = 0;
  };

  /**
   * ShipEntity dispose the fire homing bullet interval.
   */
  disposeShipEntityFireHomingBulletInterval = () => {
    clearInterval(this.shipEntityFireHomingBullet.interval);
    this.shipEntityFireHomingBullet.interval = 0;
  };

  /**
   * ShipEntity dispose the roaming timeout.
   */
  disposeShipEntityRoamingTimeout = () => {
    clearTimeout(this.shipEntityRoaming.timeout);
    this.shipEntityRoaming.timeout = 0;
  };
}

export default ShipEntity;
