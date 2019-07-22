import GameEntity from '../../../../GameEntity';
import broadbillImage from './assets/images/broadbill.png';
import BroadbillBullet from './BroadbillBullet';

/**
 * A weak enemy.
 */
class Broadbill extends GameEntity {
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
    this.image.src = broadbillImage;
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
      new BroadbillBullet(
        this.game,
        this.position.x + this.size.width / 2 - this.size.width / 16,
        this.position.y + this.size.width,
        'downLeft'
      )
    );
    this.game.addEntity(
      new BroadbillBullet(
        this.game,
        this.position.x + this.size.width / 2 - this.size.width / 16,
        this.position.y + this.size.width,
        'down'
      )
    );
    this.game.addEntity(
      new BroadbillBullet(
        this.game,
        this.position.x + this.size.width / 2 - this.size.width / 16,
        this.position.y + this.size.width,
        'downRight'
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

export default Broadbill;
