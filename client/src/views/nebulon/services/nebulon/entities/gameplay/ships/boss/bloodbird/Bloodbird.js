import Game from '../../../../../game/Game';
import ShipEntity from '../../ShipEntity';
import BulletEntity from '../../../bullets/BulletEntity';
import enemyImageSrc from './assets/images/enemy-bloodbird.png';
import alliedImageSrc from './assets/images/allied-bloodbird.png';
import damagedImageSrc from './assets/images/damaged-bloodbird.png';

class Bloodbird extends ShipEntity {
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
    this.setGameEntitySize({ width: 27, height: 18 });
    this.setHitPoints(50);
    this.setFireBulletIntervalDelay(Game.speed * 500);
    this.setFiringStatus(true);
  };

  // ==========================================================================
  // Roaming methods
  // ==========================================================================

  roamWildly = () => {
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
          {
            dxLeft: this.fireBulletMagnitude * -0.1,
            dyDown: this.fireBulletMagnitude
          }
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
            dxLeft: this.fireBulletMagnitude * -0.5,
            dyDown: this.fireBulletMagnitude
          }
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
            dxLeft: this.fireBulletMagnitude * -1,
            dyDown: this.fireBulletMagnitude
          }
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
            dxLeft: this.fireBulletMagnitude * -1.5,
            dyDown: this.fireBulletMagnitude
          }
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
            dxRight: this.fireBulletMagnitude * -0.1,
            dyDown: this.fireBulletMagnitude
          }
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
            dxRight: this.fireBulletMagnitude * -0.5,
            dyDown: this.fireBulletMagnitude
          }
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
            dxRight: this.fireBulletMagnitude * -1,
            dyDown: this.fireBulletMagnitude
          }
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
            dxRight: this.fireBulletMagnitude * -1.5,
            dyDown: this.fireBulletMagnitude
          }
        )
      );
    }
  };
}

export default Bloodbird;
