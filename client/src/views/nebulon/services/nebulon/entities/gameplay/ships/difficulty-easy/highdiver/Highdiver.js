import GamePlayEntity from '../../../GamePlayEntity';
import ShipEntity from '../../ShipEntity';
import HomingBullet from '../../../bullets/homing/HomingBullet';
import enemyImageSrc from './assets/images/enemy-highdiver.png';
import alliedImageSrc from './assets/images/allied-highdiver.png';
import damagedImageSrc from './assets/images/damaged-highdiver.png';

class Highdiver extends ShipEntity {
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
  constructor(game, { x, y }, factionStatus) {
    super(game, { x, y }, factionStatus);
    /**
     * @override
     */
    this.enemyImageSrc = enemyImageSrc;
    /**
     * @override
     */
    this.alliedImageSrc = alliedImageSrc;
    /**
     * @override
     */
    this.damagedImageSrc = damagedImageSrc;
    this.init();
  }

  /**
   * @override
   */
  init = () => {
    this.setGameEntityImageSource();
    this.setGameEntitySize({ ...GamePlayEntity.defaultSize });
    this.setHealthPoints(2);
    this.setFiringStatus(true);
  };

  // ==========================================================================
  // Roaming methods
  // ==========================================================================

  /**
   * @override
   */
  roamWildly = () => {
    const { x, y } = this.position;
    const originalSpeed = this.speed;
    this.setGameEntitySpeed(this.speed / 2);
    return this.movePath([
      { x: x + 25, y: y + 25 },
      { x: x - 25, y: y + 25 },
      { x: x + 25, y: y - 25 },
      { x: x - 25, y: y - 25 },
      { x, y }
    ]).then(() => {
      this.setGameEntitySpeed(originalSpeed);
      return Promise.resolve();
    });
  };

  // ==========================================================================
  // Bullet methods
  // ==========================================================================

  /**
   * @override
   */
  createBullets = () => {
    this.createHomingBullet();
  };
}

export default Highdiver;
