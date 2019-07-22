import GamePlayEntity from '../../../GamePlayEntity';
import ShipEntity from '../../ShipEntity';
import enemyImageSrc from './assets/images/enemy-sharpbeak.png';
import alliedImageSrc from './assets/images/allied-sharpbeak.png';
import damagedImageSrc from './assets/images/damaged-sharpbeak.png';

class Sharpbeak extends ShipEntity {
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
    this.setGameEntitySpeed(this.speed * 2);
    this.setRoamSpeed(this.roamSpeed * 2);
    this.setFireStandardBulletMagnitude(this.fireStandardBulletMagnitude * 4);
    this.setHitPoints(5);
    this.setFiringStatus(true);
  };

  // ==========================================================================
  // Roaming methods
  // ==========================================================================

  /**
   * @override
   */
  roamWildly = () => {
    const { y } = this.position;
    return this.movePath([{ x: this.game.gamePlayer.position.x, y }])
      .then(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            this.movePath([{ x: this.game.gamePlayer.position.x, y }]).then(
              () => {
                resolve();
              }
            );
          }, 2000);
        });
      })
      .then(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            this.movePath([{ x: this.game.gamePlayer.position.x, y }]).then(
              () => {
                resolve();
              }
            );
          }, 2000);
        });
      })
      .then(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            this.movePath([{ x: this.game.gamePlayer.position.x, y }]).then(
              () => {
                resolve();
              }
            );
          }, 2000);
        });
      });
  };

  /**
   * @override
   */
  roamInPlace = () => {
    return new Promise(resolve => {
      // Start roaming.
      this.roamLeft()
        .then(() => this.roamPromise(this.roamRight))
        .then(() => {
          resolve();
        });
    });
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

export default Sharpbeak;
