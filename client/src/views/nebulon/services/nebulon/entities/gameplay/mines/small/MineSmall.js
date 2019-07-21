import MineEntity from '../MineEntity';
import mineImageSrc from './assets/images/small-mine.png';

class MineSmall extends MineEntity {
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
  constructor(game, { x, y }, factionStatus, attackPoints) {
    super(game, { x, y }, factionStatus, attackPoints);
    /**
     * @override
     */
    this.mineImageSrc = mineImageSrc;
    this.init(attackPoints);
  }
}

export default MineSmall;
