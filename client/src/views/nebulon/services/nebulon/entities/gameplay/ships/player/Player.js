import GamePlayEntity from '../../GamePlayEntity';
import ShipEntity from '../ShipEntity';
import BombSmall from '../../bombs/small/BombSmall';
import alliedImageSrc from './assets/images/player.png';
import damagedImageSrc from './assets/images/damaged-player.png';
import shieldedImageSrc from './assets/images/shielded-player.png';
import Game from '../../../../game/Game';
import GameCanvas from '../../../../game/canvas/GameCanvas';

/**
 * The player ship.
 */
class Player extends ShipEntity {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  static defaultSpawnPosition = {
    x: GameCanvas.size.width * 0.5 - GamePlayEntity.defaultSize.width / 2,
    y: GameCanvas.size.height - GamePlayEntity.defaultSize.height * 2
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
  constructor(game, { x, y }) {
    super(game, { x, y }, 1);
    /**
     * @override
     */
    this.alliedImageSrc = alliedImageSrc;
    /**
     * @override
     */
    this.damagedImageSrc = damagedImageSrc;
    /**
     * Shielded player image source.
     * @type {HTMLElement}
     */
    this.shieldedImageSrc = shieldedImageSrc;
    /**
     * Player shield points amount.
     */
    this.shieldPoints = 3;
    /**
     * Player bomb points amount.
     */
    this.bombPoints = 3;
    /**
     * Player power points amount.
     */
    this.powerPoints = 3;
    /**
     * Player life points amount.
     */
    this.lifePoints = 3;
    /**
     * Duration a player can use power relative to the game speed.
     */
    this.powerTimeoutDelay = Game.speed * 2000;
    /**
     * Bomb dx dy vector magnitude.
     * @type {number}
     */
    this.fireBombMagnitude = Game.speed * 0.15;
    /**
     * Player move intervals references.
     * @type {{left: number, right: number, up: number, down: number}}
     */
    this.moveIntervals = {
      left: 0,
      right: 0,
      up: 0,
      down: 0
    };
    /**
     * Player respawn status flag.
     * @type {boolean}
     */
    this.respawnStatus = false;
    this.init();
  }

  /**
   * @override
   */
  init = () => {
    this.setSize({ ...GamePlayEntity.defaultSize });
    this.setFireStandardBulletIntervalDelay(Game.speed * 2000);
    this.setImageSource();
    this.setHitPoints(3);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Shield points setter.
   * @param {number} newShieldPoints
   */
  setShieldPoints = newShieldPoints => {
    this.shieldPoints = newShieldPoints;
  };

  /**
   * Bomb points setter.
   * @param {number} newBombPoints
   */
  setBombPoints = newBombPoints => {
    this.bombPoints = newBombPoints;
  };

  /**
   * Power points setter.
   * @param {number} newPowerPoints
   */
  setPowerPoints = newPowerPoints => {
    this.powerPoints = newPowerPoints;
  };

  /**
   * Life points setter.
   * @param {number} newLifePoints
   */
  setLifePoints = newLifePoints => {
    this.powerPoints = newLifePoints;
  };

  /**
   * Respawn status flag setter.
   * @param {boolean} newRespawnStatus
   */
  setRespawnStatus = newRespawnStatus => {
    this.respawnStatus = newRespawnStatus;
  };

  // ==========================================================================
  // Add/consume resource methods
  // ==========================================================================

  /**
   * Add a shield point.
   */
  addShieldPoint = () => {
    this.shieldPoints = this.shieldPoints + 1;
  };

  /**
   * Consume a shield point.
   */
  consumeShieldPoint = () => {
    this.shieldPoints = this.shieldPoints - 1;
  };

  /**
   * Add a bomb point.
   */
  addBombPoint = () => {
    this.bombPoints = this.bombPoints + 1;
  };

  /**
   * Consume a bomb point.
   */
  consumeBombPoint = () => {
    this.bombPoints = this.bombPoints - 1;
  };

  /**
   * Add a power point.
   */
  addPowerPoint = () => {
    this.powerPoints = this.powerPoints + 1;
  };

  /**
   * Consume a power point.
   */
  consumePowerPoint = () => {
    this.powerPoints = this.powerPoints - 1;
  };

  /**
   * Consume a life point.
   */
  consumeLifePoint = () => {
    this.lifePoints = this.lifePoints - 1;
  };

  // ==========================================================================
  // Spawn methods
  // ==========================================================================

  /**
   * Actions taken on player entity respawn.
   */
  respawn = () => {
    this.setImageSource();
    this.setHitPoints(3);
    this.setBombPoints(3);
    this.setPowerPoints(3);
    this.setAliveStatus(true);
    this.setFiringStatus(true);
    this.setRespawnStatus(false);
  };

  /**
   * Actions taken on player entity unspawn/player entity death.
   */
  unSpawn = () => {
    this.createDestroyExplosion();
    this.consumeLifePoint();
    this.setHitPoints(0);
    this.disposeDamagedImageTimeout();
    this.disposeFireStandardBulletInterval();
    this.disposeFireHomingBulletInterval();
    this.disposeRoamingTimeout();
    this.disposeMoveInterval();
    this.disposeMoveLeftInterval();
    this.disposeMoveRightInterval();
    this.disposeMoveUpInterval();
    this.disposeMoveDownInterval();
    this.setAliveStatus(false);
    this.setFiringStatus(false);
    this.setRespawnStatus(true);
  };

  // ==========================================================================
  // Bomb methods
  // ==========================================================================

  /**
   * Create and fire a bomb.
   */
  fireBomb = () => {
    if (this.bombPoints > 0) {
      this.game.addToGameEntities(
        new BombSmall(
          this.game,
          {
            x:
              this.position.x +
              this.size.width / 2 -
              BombSmall.defaultSize.width / 2,
            y:
              this.position.y +
              this.size.height -
              BombSmall.defaultSize.height * 3
          },
          this.factionStatus,
          this.attackPoints,
          { dyUp: this.fireBombMagnitude }
        )
      );
      // Consume a point.
      this.consumeBombPoint();
    }
  };

  // ==========================================================================
  // Power methods
  // ==========================================================================

  /**
   * Become invincible for a short time.
   */
  usePower = () => {
    if (this.powerPoints > 0) {
      this.setInvincibleStatus(true);
      this.image.src = this.shieldedImageSrc;
      setTimeout(() => {
        this.setInvincibleStatus(false);
        this.image.src = this.alliedImageSrc;
      }, this.powerTimeoutDelay);
      // Consume a point.
      this.consumePowerPoint();
    }
  };

  // ==========================================================================
  // Bullet methods
  // ==========================================================================

  /**
   * @override
   */
  createStandardBullets = () => {
    this.addStandardBulletToGameEntities(
      {
        x: this.position.x + this.size.width / 2 - this.size.width / 16,
        y: this.position.y - 1
      },
      {
        dyUp: this.fireStandardBulletMagnitude
      }
    );
  };

  // ==========================================================================
  // Move in a direction methods
  // ==========================================================================

  /**
   * @override
   */
  moveDirection = direction => {
    if (this.game.gameKeyHandler.isKeyFired) {
      switch (direction) {
        case 'left':
          if (
            !this.moveIntervals.left &&
            !this.hasCollidedLeftBoundary(-this.speed)
          ) {
            // Set the move left interval.
            this.moveIntervals.left = setInterval(() => {
              // Check boundary collision.
              if (!this.hasCollidedLeftBoundary(-this.speed)) {
                this.moveSpeedUnitLeft(0);
              }
            }, this.moveIntervalsDelay);
          }
          break;
        case 'right':
          if (
            !this.moveIntervals.right &&
            !this.hasCollidedRightBoundary(this.speed)
          ) {
            // Set the move right interval.
            this.moveIntervals.right = setInterval(() => {
              // Check boundary collision.
              if (!this.hasCollidedRightBoundary(this.speed)) {
                this.moveSpeedUnitRight(0);
              }
            }, this.moveIntervalsDelay);
          }
          break;
        case 'up':
          if (
            !this.moveIntervals.up &&
            !this.hasCollidedTopBoundary(-this.speed)
          ) {
            // Set the move up interval.
            this.moveIntervals.up = setInterval(() => {
              // Check boundary collision.
              if (!this.hasCollidedTopBoundary(-this.speed)) {
                this.moveSpeedUnitUp(0);
              }
            }, this.moveIntervalsDelay);
          }
          break;
        case 'down':
          if (
            !this.moveIntervals.down &&
            !this.hasCollidedBottomBoundary(this.speed)
          ) {
            // Set the move down interval.
            this.moveIntervals.down = setInterval(() => {
              // Check boundary collision.
              if (!this.hasCollidedBottomBoundary(this.speed)) {
                this.moveSpeedUnitDown(0);
              }
            }, this.moveIntervalsDelay);
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
    if (this.aliveStatus) {
      this.onDrawImageTick();
      this.onRoamingTick();
      this.onBulletTick();
      this.onCollisionTick(entIdx);
    } else if (!this.respawnStatus) {
      this.unSpawn();
    }
  };

  // ==========================================================================
  // Dispose methods
  // ==========================================================================

  /**
   * Dispose move left interval.
   */
  disposeMoveLeftInterval = () => {
    clearInterval(this.moveIntervals.left);
    this.moveIntervals.left = 0;
  };

  /**
   * Dispose move right interval.
   */
  disposeMoveRightInterval = () => {
    clearInterval(this.moveIntervals.right);
    this.moveIntervals.right = 0;
  };

  /**
   * Dispose move up interval.
   */
  disposeMoveUpInterval = () => {
    clearInterval(this.moveIntervals.up);
    this.moveIntervals.up = 0;
  };

  /**
   * Dispose move down interval.
   */
  disposeMoveDownInterval = () => {
    clearInterval(this.moveIntervals.down);
    this.moveIntervals.down = 0;
  };
}

export default Player;
