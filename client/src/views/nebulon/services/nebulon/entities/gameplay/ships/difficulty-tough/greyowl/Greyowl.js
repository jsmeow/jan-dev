import GameEntity from '../../../../GameEntity';
import greyowlImage from './assets/images/greyowl.png';
import GreyowlBullet from './GreyowlBullet';

/**
 * A weak enemy.
 */
class Greyowl extends GameEntity {
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
    this.fireBulletIntervalSize = 1000;
    /**
     * References the fire bullet setInterval.
     * @type {number}
     */
    this.fireBulletInterval = 0;
    this.init();
  }

  /**
   * @see GameEntity.init
   * @override
   */
  init = () => {
    this.image.onload = () => {
      this.drawRotated(Math.PI);
    };
    this.image.src = greyowlImage;
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
      new GreyowlBullet(
        this.game,
        this.position.x + this.size.width / 2 - this.size.width / 16,
        this.position.y + this.size.width
      )
    );
  };

  // ==========================================================================
  // Disposal methods
  // ==========================================================================

  /**
   * @see GameEntity.clearIntervals
   * @override
   */
  clearIntervals = () => {
    window.clearInterval(this.fireBulletInterval);
  };
}

export default Greyowl;
