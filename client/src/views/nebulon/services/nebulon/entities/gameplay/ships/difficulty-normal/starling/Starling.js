import Entity from '../../../../Entity';
import starlingImage from './assets/images/starling.png';
import StarlingBullet from './StarlingBullet';

/**
 * A weak enemy.
 */
class Starling extends Entity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number|*} x
   * @param {number|*} y
   * @constructor
   */
  constructor(game, x, y) {
    super(game, x, y);
    /**
     * Fire bullet setInterval size.
     * @type {number}
     */
    this.fireBulletIntervalSize = 1500;
    /**
     * References the fire bullet setInterval.
     * @type {number}
     */
    this.fireBulletInterval = 0;
    /**
     * References the fire bullet setTimeouts.
     * @type {number}
     */
    this.fireBulletTimeout1 = 0;
    this.fireBulletTimeout2 = 0;
    this.init();
  }

  /**
   * @see Entity.init
   * @override
   */
  init = () => {
    this.image.onload = () => {
      this.drawRotated(Math.PI);
    };
    this.image.src = starlingImage;
    this.setFireBulletInterval();
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Enemy fire bullet interval setter.
   */
  setFireBulletInterval = () => {
    this.fireBulletInterval = setInterval(() => {
      this.fireBullet();
    }, this.fireBulletIntervalSize);
  };

  // ==========================================================================
  // BulletEntity methods
  // ==========================================================================

  /**
   * Fire a bullet.
   */
  fireBullet = () => {
    this.game.addEntity(
      new StarlingBullet(
        this.game,
        this.position.x + this.size.width / 2 - this.size.width / 16,
        this.position.y + this.size.width
      )
    );
    this.fireBulletTimeout1 = setTimeout(() => {
      this.game.addEntity(
        new StarlingBullet(
          this.game,
          this.position.x + this.size.width / 2 - this.size.width / 16,
          this.position.y + this.size.width
        )
      );
    }, 250);
    this.fireBulletTimeout2 = setTimeout(() => {
      this.game.addEntity(
        new StarlingBullet(
          this.game,
          this.position.x + this.size.width / 2 - this.size.width / 16,
          this.position.y + this.size.width
        )
      );
    }, 500);
  };

  // ==========================================================================
  // Disposal methods
  // ==========================================================================

  /**
   * @see Entity.clearIntervals
   * @override
   */
  clearIntervals = () => {
    window.clearInterval(this.fireBulletInterval);
    clearTimeout(this.fireBulletTimeout1);
    clearTimeout(this.fireBulletTimeout2);
  };
}

export default Starling;
