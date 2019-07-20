import Game from '../../../../../game/Game';
import GamePlayEntity from '../../../GamePlayEntity';
import ShipEntity from '../../ShipEntity';
import enemyImageSrc from './assets/images/enemy-bentclaw.png';
import alliedImageSrc from './assets/images/allied-bentclaw.png';
import damagedImageSrc from './assets/images/damaged-bentclaw.png';
import BulletEntity from '../../../bullets/BulletEntity';

class Bentclaw extends ShipEntity {
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
    this.setSize({ ...GamePlayEntity.defaultSize });
    this.setHitPoints(2);
    this.setImageSource();
    this.setDamagedImageSource();
    this.setFiringStatus(true);
  };

  // ==========================================================================
  // Roaming methods
  // ==========================================================================

  roamWild = () => {
    const { x, y } = this.position;
    return this.movePath([
      { x: x + 20, y: y + 20 },
      { x, y },
      { x: x - 20, y: y - 20 },
      { x, y }
    ]);
  };

  // ==========================================================================
  // Bullet methods
  // ==========================================================================

  /**
   * @override
   */
  createBullet = () => {
    if (this.factionStatus === 0) {
      this.game.addToGameEntities(
        new BulletEntity(
          this.game,
          {
            x: this.position.x + this.size.width / 2 - this.size.width / 16,
            y: this.position.y + this.size.height + 1
          },
          this.factionStatus,
          this.attackPoints,
          { dxLeft: this.fireBulletMagnitude, dyDown: this.fireBulletMagnitude }
        )
      );
      this.game.addToGameEntities(
        new BulletEntity(
          this.game,
          {
            x: this.position.x + this.size.width / 2 - this.size.width / 16,
            y: this.position.y + this.size.height + 1
          },
          this.factionStatus,
          this.attackPoints,
          {
            dxRight: this.fireBulletMagnitude,
            dyDown: this.fireBulletMagnitude
          }
        )
      );
    }
    if (this.factionStatus === 1) {
      this.game.addToGameEntities(
        new BulletEntity(
          this.game,
          {
            x: this.position.x + this.size.width / 2 - this.size.width / 16,
            y: this.position.y - 1
          },
          this.factionStatus,
          this.attackPoints,
          { dxLeft: this.fireBulletMagnitude, dyUp: this.fireBulletMagnitude }
        )
      );
      this.game.addToGameEntities(
        new BulletEntity(
          this.game,
          {
            x: this.position.x + this.size.width / 2 - this.size.width / 16,
            y: this.position.y + this.size.height + 1
          },
          this.factionStatus,
          this.attackPoints,
          {
            dxRight: this.fireBulletMagnitude,
            dyUp: this.fireBulletMagnitude
          }
        )
      );
    }
  };
}

export default Bentclaw;
