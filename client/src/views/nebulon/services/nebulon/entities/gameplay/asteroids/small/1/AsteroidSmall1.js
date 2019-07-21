import AsteroidEntity from '../../AsteroidEntity';
import enemyImageSrc from './assets/images/asteroid-small-1.png';
import damagedImageSrc from './assets/images/damaged-asteroid-small-1.png';

class AsteroidSmall1 extends AsteroidEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number} x
   * @param {number} y
   * @param {number} factionStatus
   * @param {{dxLeft: number=, dxRight: number=, dyUp: number=, dyDown: number=}=} step
   * @constructor
   */
  constructor(game, { x, y }, step) {
    super(game, { x, y }, step);
    /**
     * @override
     */
    this.enemyImageSrc = enemyImageSrc;
    /**
     * @override
     */
    this.damagedImageSrc = damagedImageSrc;
    this.init(step);
  }
}

export default AsteroidSmall1;
