import ExplosionEntity from '../ExplosionEntity';
import explosionImage1Src from './assets/images/explosion-destroy1.png';
import explosionImage2Src from './assets/images/explosion-destroy2.png';
import explosionImage3Src from './assets/images/explosion-destroy3.png';
import explosionImage4Src from './assets/images/explosion-destroy4.png';

class ExplosionDestroy extends ExplosionEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number|*} x
   * @param {number|*} y
   * @param {number|*} width
   * @param {number|*} height
   * @constructor
   */
  constructor(game, { x, y }, { width, height } = {}) {
    super(game, { x, y });
    /**
     * @override
     */
    this.explosionImage1Src = explosionImage1Src;
    /**
     * @override
     */
    this.explosionImage2Src = explosionImage2Src;
    /**
     * @override
     */
    this.explosionImage3Src = explosionImage3Src;
    /**
     * @override
     */
    this.explosionImage4Src = explosionImage4Src;
    this.init(width, height);
  }
}

export default ExplosionDestroy;
