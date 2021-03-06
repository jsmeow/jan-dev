import Game from '../../../../../game/Game';
import GamePlayEntity from '../../../GamePlayEntity';
import ShipEntity from '../../ShipEntity';
import enemyImageSrc from './assets/images/enemy-narrowbill.png';
import alliedImageSrc from './assets/images/allied-narrowbill.png';
import damagedImageSrc from './assets/images/damaged-narrowbill.png';

class Narrowbill extends ShipEntity {
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
    this.setFireBulletIntervalDelay(Game.speed * 2000);
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
    return this.movePath([
      { x: x + 30, y },
      { x: x + 30, y: y + 30 },
      { x, y: y + 30 },
      { x, y }
    ]);
  };

  // ==========================================================================
  // Bullet methods
  // ==========================================================================

  /**
   * @override
   */
  createBullets = () => {
    this.createStandardBullet();
  };
}

export default Narrowbill;
