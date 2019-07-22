import Game from '../../../game/Game';
import GameCanvas from '../../../game/canvas/GameCanvas';
import GamePlayEntity from '../GamePlayEntity';
import ShipEntity from '../ships/ShipEntity';
import gamePlayEntityDefaultImageSource from './assets/images/player.png';
import gamePlayEntityDamagedImageSource from './assets/images/damaged-player.png';
import playerShieldedImageSource from './assets/images/shielded-player.png';

class GamePlayerEntity extends ShipEntity {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * GamePlayerEntity respawning status flag on initial spawn.
   * @type {{respawning: boolean}}
   */
  static playerStatusDefault = {
    respawning: false
  };

  /**
   * GamePlayerEntity shield points amount value on initial spawn.
   * GamePlayerEntity bomb points amount value on initial spawn.
   * GamePlayerEntity power points amount value on initial spawn.
   * GamePlayerEntity life points amount value on initial spawn.
   * @type {{shieldPoints: number, bombPoints: number, powerPoints: number,
   * lifePoints: number}}
   */
  static playerPointsDefault = {
    shieldPoints: 3,
    bombPoints: 3,
    powerPoints: 3,
    lifePoints: 3
  };

  /**
   * GamePlayerEntity use power timeout value on initial spawn.
   * GamePlayerEntity use power timeout delay modifier value on initial spawn.
   * @type {{timeout: number, timeoutDelayModifier: number}}
   */
  static playerUsePowerDefault = {
    timeout: 0,
    timeoutDelayModifier: 2000
  };

  /**
   * GamePlayerEntity respawning status flag value on initial spawn.
   * @type {boolean}
   */
  static playerRespawningStatusDefault = false;

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
  constructor(game, { x, y }) {
    super(game, { x, y }, 1);
    /**
     * GamePlayerEntity shielded image source.
     * @type {HTMLElement}
     */
    this.playerShieldedImage = new Image();
    /**
     * GamePlayerEntity respawning status flag.
     * @type {{respawning: boolean}}
     */
    this.playerStatus = { ...GamePlayerEntity.playerStatusDefault };
    /**
     * GamePlayerEntity shield points amount value on initial spawn.
     * GamePlayerEntity bomb points amount value on initial spawn.
     * GamePlayerEntity power points amount value on initial spawn.
     * GamePlayerEntity life points amount value on initial spawn.
     * @type {{shieldPoints: number, bombPoints: number, powerPoints: number,
     * lifePoints: number}}
     */
    this.playerPoints = { ...GamePlayerEntity.playerPointsDefault };
    /**
     * GamePlayerEntity use power timeout timeout delay reference.
     * GamePlayerEntity use power timeout timeout delay modifier value.
     * @type {{timeout: number, timeoutDelay: number}}
     */
    this.playerUsePower = {
      timeout: GamePlayerEntity.playerUsePowerDefault.timeout,
      timeoutDelay:
        Game.gameSpeed *
        GamePlayerEntity.playerUsePowerDefault.timeoutDelayModifier
    };
    /**
     * GamePlayerEntity move intervals references.
     * @type {{left: number, right: number, up: number, down: number}}
     */
    this.playerMoveIntervals = {
      left: 0,
      right: 0,
      up: 0,
      down: 0
    };
    this.loadAssets();
    this.init();
  }

  /**
   * @override
   */
  loadAssets = () => {
    this.setGamePlayEntityDefaultImageSource(gamePlayEntityDefaultImageSource);
    this.setGamePlayEntityDamagedImageSource(gamePlayEntityDamagedImageSource);
    this.setPlayerShieldedImageSource(playerShieldedImageSource);
  };

  /**
   * @override
   */
  init = () => {
    // Set GameEntity size.
    this.setGameEntitySize({
      width: 9,
      height: 9
    });
    // Set GameEntity position.
    this.setGameEntityPosition({
      x: GameCanvas.gameCanvasSize.width * 0.5 - this.gameEntitySize.width / 2,
      y: GameCanvas.gameCanvasSize.height - this.gameEntitySize.height * 2
    });
    // Set GameEntity move vector magnitude.
    this.setGameEntityMoveVectorMagnitude(0.1);
    // Set GamePlayEntity hit points.
    this.setGamePlayEntityHitPoints(3);
    // Set GamePlayEntity attack points.
    this.setGamePlayEntityAttackPoints(1);
    // Set GamePlayEntity type.
    this.setGamePlayEntityType(GamePlayEntity.gamePlayEntityTypes.SHIP);
    // Set ShipEntity firing status.
    this.setShipEntityFiringStatus(false);
    // Set ShipEntity fire standard bullet delay.
    this.setShipEntityFireStandardBulletIntervalDelay(750);
    // Set ShipEntity fire standard bullet vector magnitude.
    this.setShipEntityFireStandardBulletVectorMagnitude(0.15);
    // Set ShipEntity fire homing bullet delay.
    this.setShipEntityFireHomingBulletIntervalDelay(2000);
    // Set ShipEntity fire homing bullet vector magnitude.
    this.setShipEntityFireHomingBulletVectorMagnitude(0.05);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * GamePlayerEntity shielded player image source setter.
   * @param {HTMLElement} newPlayerShieldedImageSource
   */
  setPlayerShieldedImageSource = newPlayerShieldedImageSource => {
    this.playerShieldedImage.src = newPlayerShieldedImageSource;
  };

  /**
   * GamePlayerEntity respawning status flag setter.
   * @param {boolean} newPlayerRespawningStatus
   */
  setPlayerRespawningStatus = newPlayerRespawningStatus => {
    this.playerStatus.respawning = newPlayerRespawningStatus;
  };

  /**
   * GamePlayerEntity shield points setter.
   * @param {number} newPlayerShieldPoints
   */
  setPlayerShieldPoints = newPlayerShieldPoints => {
    this.playerPoints.shieldPoints = newPlayerShieldPoints;
  };

  /**
   * GamePlayerEntity bomb points setter.
   * @param {number} newPlayerBombPoints
   */
  setPlayerBombPoints = newPlayerBombPoints => {
    this.playerPoints.bombPoints = newPlayerBombPoints;
  };

  /**
   * GamePlayerEntity power points setter.
   * @param {number} newPlayerPowerPoints
   */
  setPlayerPowerPoints = newPlayerPowerPoints => {
    this.playerPoints.powerPoints = newPlayerPowerPoints;
  };

  /**
   * GamePlayerEntity life points setter.
   * @param {number} newPlayerLifePoints
   */
  setPlayerLifePoints = newPlayerLifePoints => {
    this.playerPoints.lifePoints = newPlayerLifePoints;
  };

  /**
   * GamePlayerEntity user power timeout delay setter.
   * @param {number} newPlayerUsePowerTimeoutDelay
   */
  setPlayerUsePowerTimeoutDelay = newPlayerUsePowerTimeoutDelay => {
    this.playerUsePower.timeoutDelay = newPlayerUsePowerTimeoutDelay;
  };

  // ==========================================================================
  // Add resource methods
  // ==========================================================================

  /**
   * GamePlayerEntity add a shield point.
   */
  addPlayerShieldPoint = () => {
    this.playerPoints.shieldPoints = this.playerPoints.shieldPoints + 1;
  };

  /**
   * GamePlayerEntity add a bomb point.
   */
  addPlayerBombPoint = () => {
    this.playerPoints.bombPoints = this.playerPoints.bombPoints + 1;
  };

  /**
   * GamePlayerEntity add a power point.
   */
  addPlayerPowerPoint = () => {
    this.playerPoints.powerPoints = this.playerPoints.powerPoints + 1;
  };

  /**
   * GamePlayerEntity add a life point.
   */
  addPlayerLifePoint = () => {
    this.playerPoints.lifePoints = this.playerPoints.lifePoints + 1;
  };

  // ==========================================================================
  // Consume resource methods
  // ==========================================================================

  /**
   * GamePlayerEntity consume a shield point.
   */
  consumePlayerShieldPoint = () => {
    this.playerPoints.shieldPoints = this.playerPoints.shieldPoints - 1;
  };

  /**
   * GamePlayerEntity consume a bomb point.
   */
  consumePlayerBombPoint = () => {
    this.playerPoints.bombPoints = this.playerPoints.bombPoints - 1;
  };

  /**
   * GamePlayerEntity consume a power point.
   */
  consumePlayerPowerPoint = () => {
    this.playerPoints.powerPoints = this.playerPoints.powerPoints - 1;
  };

  /**
   * GamePlayerEntity consume a life point.
   */
  consumePlayerLifePoint = () => {
    this.playerPoints.lifePoints = this.playerPoints.lifePoints - 1;
  };

  // ==========================================================================
  // Power methods
  // ==========================================================================

  /**
   * GamePlayerEntity become invincible for a short time.
   * @param {number} playerUsePowerTimeoutDelay
   */
  usePlayerPower = (
    playerUsePowerTimeoutDelay = this.playerUsePower.timeoutDelay
  ) => {
    // Check if power points are available.
    if (this.playerPoints.powerPoints > 0) {
      // Set player invincible status to true.
      this.setGamePlayEntityInvincibleStatus(true);
      // Flash invincible image.
      this.setGamePlayEntityDefaultImageSource(playerShieldedImageSource);
      // Set player invincible status to false after a delay.
      setTimeout(() => {
        this.setGamePlayEntityInvincibleStatus(false);
        this.setGamePlayEntityDefaultImageSource(
          this.gamePlayEntityDefaultImageSource
        );
      }, playerUsePowerTimeoutDelay);
      // Consume a player entity power point.
      this.consumePlayerPowerPoint();
    }
  };

  // ==========================================================================
  // Bullet methods
  // ==========================================================================

  /**
   * @override
   */
  addShipEntityStandardBulletToGameEntitiesAction = () => {
    this.addShipEntityStandardBulletToGameEntities(
      {
        x:
          this.gameEntityPosition.x +
          this.gameEntitySize.width / 2 -
          this.gameEntitySize.width / 16,
        y: this.gameEntityPosition.y - 1
      },
      {
        dyUp: this.shipEntityFireStandardBullet.vectorMagnitude
      }
    );
  };

  /**
   * @override
   */
  addShipEntityHomingBulletToGameEntitiesAction = () => {
    this.addShipEntityHomingBulletToGameEntities(
      {
        x:
          this.gameEntityPosition.x +
          this.gameEntitySize.width / 2 -
          this.gameEntitySize.width / 16,
        y: this.gameEntityPosition.y - 1
      },
      this.shipEntityFireStandardBullet.vectorMagnitude
    );
  };

  // ==========================================================================
  // Move in a direction methods
  // ==========================================================================

  /**
   * @override
   */
  moveGameEntityDirection = (
    direction,
    gameEntityMoveVectorIntervalDelay = this.gameEntityMoveVector.intervalDelay
  ) => {
    if (this.game.gameKeyHandler.gameKeyHandlerKeypressedStatus) {
      switch (direction) {
        case 'left':
          if (
            !this.playerMoveIntervals.left &&
            !this.hasGameEntityCollidedLeftBoundary(
              -this.this.gameEntityMoveVector.magnitude
            )
          ) {
            // Set the move left interval.
            this.playerMoveIntervals.left = setInterval(() => {
              // Check left boundary collision.
              if (
                !this.hasGameEntityCollidedLeftBoundary(
                  -this.this.gameEntityMoveVector.magnitude
                )
              ) {
                this.moveGameEntityLeftVector();
              }
            }, gameEntityMoveVectorIntervalDelay);
          }
          break;
        case 'right':
          if (
            !this.playerMoveIntervals.right &&
            !this.hasGameEntityCollidedRightBoundary(
              this.this.gameEntityMoveVector.magnitude
            )
          ) {
            // Set the move right interval.
            this.playerMoveIntervals.right = setInterval(() => {
              // Check right boundary collision.
              if (
                !this.hasGameEntityCollidedRightBoundary(
                  this.this.gameEntityMoveVector.magnitude
                )
              ) {
                this.moveGameEntityRightVector();
              }
            }, gameEntityMoveVectorIntervalDelay);
          }
          break;
        case 'up':
          if (
            !this.playerMoveIntervals.up &&
            !this.hasGameEntityCollidedTopBoundary(
              -this.this.gameEntityMoveVector.magnitude
            )
          ) {
            // Set the move up interval.
            this.playerMoveIntervals.up = setInterval(() => {
              // Check top boundary collision.
              if (
                !this.hasGameEntityCollidedTopBoundary(
                  -this.this.gameEntityMoveVector.magnitude
                )
              ) {
                this.moveGameEntityUpVector();
              }
            }, gameEntityMoveVectorIntervalDelay);
          }
          break;
        case 'down':
          if (
            !this.playerMoveIntervals.down &&
            !this.hasGameEntityCollidedBottomBoundary(
              this.this.gameEntityMoveVector.magnitude
            )
          ) {
            // Set the move down interval.
            this.playerMoveIntervals.down = setInterval(() => {
              // Check bottom boundary collision.
              if (
                !this.hasGameEntityCollidedBottomBoundary(
                  this.this.gameEntityMoveVector.magnitude
                )
              ) {
                this.moveGameEntityDownVector();
              }
            }, gameEntityMoveVectorIntervalDelay);
          }
          break;
        default:
      }
    }
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * @override
   */
  onTick = entIdx => {
    if (this.gamePlayEntityStatus.alive) {
      this.onGamePlayEntityDrawImageTick();
      this.onShipEntityBulletTick();
      this.onGamePlayEntityCollisionTick(entIdx);
    } else if (!this.playerRespawningStatus) {
      // Dispose GameEntity resources.
      this.disposeGameEntityMoveVectorInterval();
      // Dispose GamePlayEntity resources.
      this.disposeGamePlayEntityDamagedImageTimeout();
      // Dispose ShipEntity intervals and timeouts.
      this.disposeShipEntityFireStandardBulletInterval();
      this.disposeShipEntityFireHomingBulletInterval();
      this.disposeShipEntityRoamingTimeout();
      // Dispose GamePlayerEntity resources.
      this.disposePlayerUsePowerTimeout();
      this.disposePlayerMoveLeftInterval();
      this.disposePlayerMoveRightInterval();
      this.disposePlayerMoveUpInterval();
      this.disposePlayerMoveDownInterval();
      // Set to alive status to false (if not already).
      this.setGamePlayEntityAliveStatus(false);
      // Set firing status to false.
      this.setShipEntityFiringStatus(false);
      // Create the destroy explosion.
      this.addGamePlayEntityDestroyExplosionToGameEntities();
      // Set respawning status to true.
      this.setPlayerRespawningStatus(true);
    }
  };

  // ==========================================================================
  // Respawn methods
  // ==========================================================================

  /**
   * GamePlayerEntity actions taken on player entity respawn.
   */
  respawnPlayer = () => {
    // Reload assets.
    this.loadAssets();
    // Replenish player entity resources.
    this.setGamePlayEntityHitPoints(3);
    this.setPlayerShieldPoints(3);
    this.setPlayerBombPoints(3);
    this.setPlayerPowerPoints(3);
    // Set to alive status to true and start firing.
    this.setGamePlayEntityAliveStatus(true);
    this.setShipEntityFiringStatus(true);
    // Set respawning status to false.
    this.setPlayerRespawningStatus(false);
  };

  // ==========================================================================
  // Dispose methods
  // ==========================================================================

  /**
   * GamePlayEntity dispose the damaged image timeout.
   */
  disposePlayerUsePowerTimeout = () => {
    clearTimeout(this.playerUsePower.timeout);
    this.playerUsePower.timeout = 0;
  };

  /**
   * GamePlayerEntity dispose move left interval.
   */
  disposePlayerMoveLeftInterval = () => {
    clearInterval(this.playerMoveIntervals.left);
    this.playerMoveIntervals.left = 0;
  };

  /**
   * GamePlayerEntity dispose move right interval.
   */
  disposePlayerMoveRightInterval = () => {
    clearInterval(this.playerMoveIntervals.right);
    this.playerMoveIntervals.right = 0;
  };

  /**
   * GamePlayerEntity dispose move up interval.
   */
  disposePlayerMoveUpInterval = () => {
    clearInterval(this.playerMoveIntervals.up);
    this.playerMoveIntervals.up = 0;
  };

  /**
   * GamePlayerEntity dispose move down interval.
   */
  disposePlayerMoveDownInterval = () => {
    clearInterval(this.playerMoveIntervals.down);
    this.playerMoveIntervals.down = 0;
  };
}

export default GamePlayerEntity;
