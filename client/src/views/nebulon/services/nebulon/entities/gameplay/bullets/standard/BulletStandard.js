import BulletEntity from '../BulletEntity';
import enemyImageSrc from './assets/images/enemy-standard-bullet.png';
import alliedImageSrc from './assets/images/allied-standard-bullet.png';

class BulletStandard extends BulletEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number} x
   * @param {number} y
   * @param {number} factionStatus
   * @param {number} attackPoints
   * @param {{dxLeft: number=, dxRight: number=, dyUp: number=, dyDown: number=}=} step
   * @constructor
   */
  constructor(game, { x, y }, factionStatus, attackPoints, step) {
    super(game, { x, y }, factionStatus, attackPoints, step);
    /**
     * @override
     */
    this.enemyImageSrc = enemyImageSrc;
    /**
     * @override
     */
    this.alliedImageSrc = alliedImageSrc;
    this.init(attackPoints, step);
  }
}

export default BulletStandard;
