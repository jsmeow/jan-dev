import Game from '../../../game/Game';
import GameCanvas from '../../../game/canvas/GameCanvas';
import GamePlayEntity from '../GamePlayEntity';
import defaultImageSource from './assets/images/player.png';
import damagedImageSource from './assets/images/damaged-player.png';
import poweredImageSource from './assets/images/shielded-player.png';

class GamePlayerEntity extends GamePlayEntity {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * @see Player.powered
   */
  static defaultPowered = {
    timeout: 0,
    timeoutDelayModifier: 2000
  };

  /**
   * @see Player.status
   */
  static defaultStatus = {
    respawning: false
  };

  /**
   * @see Player.points
   */
  static defaultPoints = {
    shield: 3,
    bomb: 3,
    power: 3,
    life: 3
  };

  /**
   * @see GameEntity.position
   */
  static defaultPosition = {
    x: GameCanvas.size.width * 0.5 - GamePlayerEntity.defaultSize.width / 2,
    y: GameCanvas.size.height - GamePlayerEntity.defaultSize.height * 2
  };

  /**
   * @see GameEntity.size
   */
  static defaultSize = {
    width: 9,
    height: 9
  };

  /**
   * The bullet spawn position relative to the entity.
   * @type {Object}
   */
  static defaultBulletSpawnPosition = {
    x: this.position.x + this.size.width / 2 - this.size.width / 16,
    y: this.position.y - 1
  };

  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @constructor
   */
  constructor(game) {
    super(game);
    /**
     * Powered image source.
     * @type {HTMLElement}
     */
    this.poweredImage = new Image();
    /**
     * Powered duration timeout.
     * @type {Object}
     */
    this.powered = { ...GamePlayerEntity.defaultPowered };
    /**
     * Move in vector intervals.
     * @type {Object}
     */
    this.moveInVectorIntervals = {
      left: 0,
      right: 0,
      up: 0,
      down: 0
    };
    /**
     * @override
     */
    this.status = {
      ...GamePlayEntity.defaultStatus,
      ...GamePlayerEntity.defaultStatus
    };
    /**
     * @override
     */
    this.points = {
      ...GamePlayEntity.defaultPoints,
      ...GamePlayerEntity.defaultPoints
    };
    this.loadAssets();
    this.init();
  }

  /**
   * @override
   */
  loadAssets = () => {
    this.setDefaultImageSource(defaultImageSource);
    this.setDamagedImageSource(damagedImageSource);
    this.setPoweredImageSource(poweredImageSource);
  };

  /**
   * @override
   */
  init = () => {
    // Set position.
    this.setPosition({ ...GamePlayerEntity.defaultPosition });
    // Set size.
    this.setSize({ ...GamePlayerEntity.defaultSize });
    // Set move vector magnitude.
    this.setMoveVectorMagnitude(0.1);
    // Set hit points.
    this.setHealthPoints(3);
    // Set attack points.
    this.setAttackPoints(1);
    // Set type.
    this.setType(GamePlayEntity.types.SHIP);
    // Set add standard bullet to entities interval delay.
    this.setAddStandardBulletToEntitiesIntervalDelay(750);
    // Set add homing bullet to entities interval delay.
    this.setAddHomingBulletToEntitiesIntervalDelay(750);
    // Set fire homing bullet delay.
    this.setAddStandardBulletToEntitiesVectorMagnitude(0.15);
    // Set fire homing bullet vector magnitude.
    this.setAddHomingBulletToEntitiesVectorMagnitude(0.15);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Powered image source setter.
   * @param {string} newPoweredImageSource
   */
  setPoweredImageSource = newPoweredImageSource => {
    this.poweredImage.src = newPoweredImageSource;
  };

  /**
   * Respawning status flag setter.
   * @param {boolean} newRespawningStatus
   */
  setRespawningStatus = newRespawningStatus => {
    this.status.respawning = newRespawningStatus;
  };

  /**
   * Shield points setter.
   * @param {number} newShieldPoints
   */
  setShieldPoints = newShieldPoints => {
    this.points.shield = newShieldPoints;
  };

  /**
   * Bomb points setter.
   * @param {number} newBombPoints
   */
  setBombPoints = newBombPoints => {
    this.points.bomb = newBombPoints;
  };

  /**
   * Power points setter.
   * @param {number} newPowerPoints
   */
  setPowerPoints = newPowerPoints => {
    this.points.power = newPowerPoints;
  };

  /**
   * Life points setter.
   * @param {number} newLifePoints
   */
  setLifePoints = newLifePoints => {
    this.points.life = newLifePoints;
  };

  /**
   * Powered timeout delay setter.
   * @param {number} poweredTimeoutDelay
   */
  setPoweredTimeoutDelay = poweredTimeoutDelay => {
    this.powered.timeoutDelay = poweredTimeoutDelay;
  };

  // ==========================================================================
  // Add resource methods
  // ==========================================================================

  /**
   * Add a shield point.
   */
  addShieldPoint = () => {
    this.points.shield = this.points.shield + 1;
  };

  /**
   * Add a bomb point.
   */
  addBombPoint = () => {
    this.points.bomb = this.points.bomb + 1;
  };

  /**
   * Add a power point.
   */
  addPowerPoint = () => {
    this.points.power = this.points.power + 1;
  };

  /**
   * Add a life point.
   */
  addLifePoint = () => {
    this.points.life = this.points.life + 1;
  };

  // ==========================================================================
  // Consume resource methods
  // ==========================================================================

  /**
   * Consume a shield point.
   */
  consumeShieldPoint = () => {
    this.points.shield = this.points.shield - 1;
  };

  /**
   * Consume a bomb point.
   */
  consumeBombPoint = () => {
    this.points.bomb = this.points.bomb - 1;
  };

  /**
   * Consume a power point.
   */
  consumePowerPoint = () => {
    this.points.power = this.points.power - 1;
  };

  /**
   * Consume a life point.
   */
  consumeLifePoint = () => {
    this.points.life = this.points.life - 1;
  };

  // ==========================================================================
  // Power methods
  // ==========================================================================

  /**
   * Use power.
   * Types of power:
   * 1: Become invincible for a short time.
   * 2: ???
   * 3: ???
   * @param {number} poweredTimeoutDelay
   */
  usePower = (poweredTimeoutDelay = this.powered.timeoutDelay) => {
    // Check if power points are available.
    if (this.points.power > 0) {
      // Set invincible status to true.
      this.setInvincibleStatus(true);
      // Flash invincible image.
      this.setDefaultImageSource(poweredImageSource);
      // Set invincible status to false after a delay.
      setTimeout(() => {
        // Set invincible status to false.
        this.setInvincibleStatus(false);
        // Restore default image.
        this.setDefaultImageSource(this.defaultImageSource);
      }, Game.speed * poweredTimeoutDelay);
      // Consume a power point.
      this.consumePowerPoint();
    }
  };

  // ==========================================================================
  // Bullet methods
  // ==========================================================================

  /**
   * @override
   */
  addStandardBulletToGameEntitiesAction = () => {
    this.createStandardBullet({
      position: {
        x: this.position.x + this.size.width / 2 - this.size.width / 16,
        y: this.position.y - 1
      },
      d: {
        upDy: this.addStandardBulletToEntities.vectorMagnitude
      }
    });
  };

  /**
   * @override
   */
  addHomingBulletToGameEntitiesAction = () => {
    this.createHomingBullet({
      position: {
        x: this.position.x + this.size.width / 2 - this.size.width / 16,
        y: this.position.y - 1
      },
      vectorMagnitude: this.addHomingBulletToEntities.vectorMagnitude
    });
  };

  // ==========================================================================
  // Move in a direction methods
  // ==========================================================================

  /**
   * @override
   */
  moveInVector = (
    direction,
    moveInVectorIntervalDelay = this.moveVector.intervalDelay
  ) => {
    if (this.game.keyHandler.keyHandlerKeypressStatus) {
      switch (direction) {
        case 'left':
          if (
            !this.moveInVectorIntervals.left &&
            !this.hasCollidedLeftBoundary(-this.moveVector.magnitude)
          ) {
            // Set the move left interval.
            this.moveInVectorIntervals.left = setInterval(() => {
              // Check left boundary collision.
              if (!this.hasCollidedLeftBoundary(-this.moveVector.magnitude)) {
                this.moveVectorLeft();
              }
            }, moveInVectorIntervalDelay);
          }
          break;
        case 'right':
          if (
            !this.moveInVectorIntervals.right &&
            !this.hasCollidedRightBoundary(this.moveVector.magnitude)
          ) {
            // Set the move right interval.
            this.moveInVectorIntervals.right = setInterval(() => {
              // Check right boundary collision.
              if (!this.hasCollidedRightBoundary(this.moveVector.magnitude)) {
                this.moveVectorRight();
              }
            }, moveInVectorIntervalDelay);
          }
          break;
        case 'up':
          if (
            !this.moveInVectorIntervals.up &&
            !this.hasCollidedTopBoundary(-this.moveVector.magnitude)
          ) {
            // Set the move up interval.
            this.moveInVectorIntervals.up = setInterval(() => {
              // Check top boundary collision.
              if (!this.hasCollidedTopBoundary(-this.moveVector.magnitude)) {
                this.moveVectorUp();
              }
            }, moveInVectorIntervalDelay);
          }
          break;
        case 'down':
          if (
            !this.moveInVectorIntervals.down &&
            !this.hasCollidedBottomBoundary(this.moveVector.magnitude)
          ) {
            // Set the move down interval.
            this.moveInVectorIntervals.down = setInterval(() => {
              // Check bottom boundary collision.
              if (!this.hasCollidedBottomBoundary(this.moveVector.magnitude)) {
                this.moveVectorDown();
              }
            }, moveInVectorIntervalDelay);
          }
          break;
        default:
      }
    }
  };

  // ==========================================================================
  // Respawn methods
  // ==========================================================================

  /**
   * Respawn actions.
   */
  respawn = () => {
    // Reload assets.
    this.loadAssets();
    // Replenish entity resources.
    this.setHealthPoints(3);
    this.setShieldPoints(3);
    this.setBombPoints(3);
    this.setPowerPoints(3);
    // Set to alive status to true and start firing.
    this.setAliveStatus(true);
    this.setFiringStatus(true);
    // Set respawning status to false.
    this.setRespawningStatus(false);
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * @override
   */
  onDisposeTick = () => {
    // Dispose GameEntity resources.
    this.disposeMoveVectorInterval();
    // Dispose GamePlayEntity resources.
    this.disposeDamagedImageDurationTimeout();
    this.disposeAddStandardBulletToEntitiesInterval();
    this.disposeAddHomingBulletToEntitiesInterval();
    this.disposeRoamingTimeout();
    // Dispose GamePlayerEntity resources.
    this.disposePoweredTimeout();
    this.disposeMoveInVectorLeftInterval();
    this.disposeMoveInVectorRightInterval();
    this.disposeMoveInVectorUpInterval();
    this.disposeMoveInVectorDownInterval();
    // Set firing status to false.
    this.setFiringStatus(false);
    // Set to alive status to false (if not already).
    this.setAliveStatus(false);
    // Create the destroy explosion.
    this.createDestroyExplosion();
    // Set respawning status to true.
    this.setRespawningStatus(true);
  };

  /**
   * @override
   */
  onTick = entIdx => {
    if (this.status.alive) {
      this.onDrawImageTick();
      this.onBulletTick();
      this.onCollisionTick(entIdx);
    } else if (!this.status.respawning) {
      this.onDisposeTick();
    }
  };

  // ==========================================================================
  // Dispose methods
  // ==========================================================================

  /**
   * GamePlayEntity dispose the damaged image timeout.
   */
  disposePoweredTimeout = () => {
    clearTimeout(this.powered.timeout);
    this.powered.timeout = 0;
  };

  /**
   * Dispose move left interval.
   */
  disposeMoveInVectorLeftInterval = () => {
    clearInterval(this.moveInVectorIntervals.left);
    this.moveInVectorIntervals.left = 0;
  };

  /**
   * Dispose move right interval.
   */
  disposeMoveInVectorRightInterval = () => {
    clearInterval(this.moveInVectorIntervals.right);
    this.moveInVectorIntervals.right = 0;
  };

  /**
   * Dispose move up interval.
   */
  disposeMoveInVectorUpInterval = () => {
    clearInterval(this.moveInVectorIntervals.up);
    this.moveInVectorIntervals.up = 0;
  };

  /**
   * Dispose move down interval.
   */
  disposeMoveInVectorDownInterval = () => {
    clearInterval(this.moveInVectorIntervals.down);
    this.moveInVectorIntervals.down = 0;
  };
}

export default GamePlayerEntity;
