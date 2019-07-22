import GameCanvas from '../../../../../game/canvas/GameCanvas';
import GamePlayEntity from '../../../GamePlayEntity';
import ShipEntity from '../../ShipEntity';
import StandardBullet from '../../../bullets/standard/StandardBullet';
import enemyImageSrc from './assets/images/enemy-sideroost.png';
import alliedImageSrc from './assets/images/allied-sideroost.png';
import damagedImageSrc from './assets/images/damaged-sideroost.png';

class Sideroost extends ShipEntity {
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
    this.setHitPoints(2);
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
      { x, y: this.size.height },
      { x, y: GameCanvas.size.height - this.size.height },
      { x, y: this.size.height },
      { x, y: GameCanvas.size.height - this.size.height },
      { x, y }
    ]);
  };

  /**
   * @override
   */
  roamInPlace = () => {
    return new Promise(resolve => {
      // Start roaming.
      this.roamUp()
        .then(() => this.roamPromise(this.roamDown))
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
    if (this.factionStatus === 0) {
      this.game.addToGameEntities(
        new StandardBullet(
          this.game,
          {
            x: this.position.x + this.size.width / 2 - this.size.width / 16,
            y: this.position.y + this.size.height + 1
          },
          this.factionStatus,
          this.attackPoints,
          {
            dxLeft: this.fireStandardBulletMagnitude
          }
        )
      );
      this.game.addToGameEntities(
        new StandardBullet(
          this.game,
          {
            x: this.position.x + this.size.width / 2 - this.size.width / 16,
            y: this.position.y + this.size.height + 1
          },
          this.factionStatus,
          this.attackPoints,
          {
            dxRight: this.fireStandardBulletMagnitude
          }
        )
      );
    }
    if (this.factionStatus === 1) {
      this.game.addToGameEntities(
        new StandardBullet(
          this.game,
          {
            x: this.position.x + this.size.width / 2 - this.size.width / 16,
            y: this.position.y - 1
          },
          this.factionStatus,
          this.attackPoints,
          {
            dxLeft: this.fireStandardBulletMagnitude
          }
        )
      );
      this.game.addToGameEntities(
        new StandardBullet(
          this.game,
          {
            x: this.position.x + this.size.width / 2 - this.size.width / 16,
            y: this.position.y + this.size.height + 1
          },
          this.factionStatus,
          this.attackPoints,
          {
            dxRight: this.fireStandardBulletMagnitude
          }
        )
      );
    }
  };
}

export default Sideroost;
