import GamePlayEntity from '../../../GamePlayEntity';
import ShipEntity from '../../ShipEntity';
import BulletEntity from '../../../bullets/BulletEntity';
import MineSmall from '../../../mines/small/MineSmall';
import enemyImageSrc from './assets/images/enemy-minebird.png';
import alliedImageSrc from './assets/images/allied-minebird.png';
import damagedImageSrc from './assets/images/damaged-minebird.png';
import StandardBullet from '../../../bullets/standard/StandardBullet';

class Minebird extends ShipEntity {
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
    this.setHealthPoints(5);
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
    return this.moveTo({
      x: x + 25,
      y: y + 25
    })
      .then(() => {
        this.createMine();
        return Promise.resolve();
      })
      .then(() => {
        return this.moveTo({
          x: x - 25,
          y: y + 25
        });
      })
      .then(() => {
        this.createMine();
        return Promise.resolve();
      })
      .then(() => {
        return this.moveTo({
          x,
          y
        });
      });
  };

  // ==========================================================================
  // Mine methods
  // ==========================================================================

  /**
   * Create a mine at the current position.
   */
  createMine = () => {
    this.game.addToGameEntities(
      new MineSmall(
        this.game,
        {
          x: this.position.x + this.size.width / 2 - this.size.width / 16,
          y: this.position.y + this.size.height + 1
        },
        this.factionStatus,
        this.attack
      )
    );
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

export default Minebird;
