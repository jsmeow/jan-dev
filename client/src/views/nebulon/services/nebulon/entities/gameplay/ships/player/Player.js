import GamePlayEntity from '../../GamePlayEntity';
import ShipEntity from '../ShipEntity';
import BombSmall from '../../bombs/damage-small/BombSmall';
import alliedImageSrc from './assets/images/player.png';
import damagedImageSrc from './assets/images/damaged-player.png';
import shieldedImageSrc from './assets/images/shielded-player.png';
import Game from '../../../../game/Game';

/**
 * The player ship.
 */
class Player extends ShipEntity {
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
     * Shielded plaer image source.
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
    this.init();
  }

  /**
   * @override
   */
  init = () => {
    this.setSize({ ...GamePlayEntity.defaultSize });
    this.setFireBulletIntervalDelay(Game.speed * 250);
    this.setImageSource();
    this.setDamagedImageSource();
    this.setHitPoints(3);
    this.setFiringStatus(false);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Shield points setter.
   */
  setShieldPoints = newShieldPoints => {
    this.shieldPoints = newShieldPoints;
  };

  /**
   * Bomb points setter.
   */
  setBombPoints = newBombPoints => {
    this.bombPoints = newBombPoints;
  };

  /**
   * Power points setter.
   */
  setPowerPoints = newPowerPoints => {
    this.powerPoints = newPowerPoints;
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
