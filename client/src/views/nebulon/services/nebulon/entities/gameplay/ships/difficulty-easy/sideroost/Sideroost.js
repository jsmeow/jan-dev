import GameCanvas from '../../../../../game/canvas/GameCanvas';
import ShipEntity from '../../ShipEntity';
import BulletEntity from '../../../bullets/BulletEntity';
import alliedShipImage from './assets/images/allied-sideroost.png';
import enemyShipImage from './assets/images/enemy-sideroost.png';
import damagedShipImage from './assets/images/damaged-sideroost.png';

/**
 * A weak enemy.
 */
class Sideroost extends ShipEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number=} x
   * @param {number=} y
   * @param {number=} faction
   * @constructor
   */
  constructor(game, x, y, faction) {
    super(game, x, y, faction);
    /**
     * @see ShipEntity.alliedShipImage
     * @override
     */
    this.alliedShipImage = alliedShipImage;
    /**
     * @see ShipEntity.enemyShipImage
     * @override
     */
    this.enemyShipImage = enemyShipImage;
    /**
     * @see ShipEntity.damagedShipImage
     * @override
     */
    this.damagedShipImage = damagedShipImage;
    /**
     * @see ShipEntity.hitPoints
     * @override
     */
    this.hitPoints = 2;
    /**
     * @see ShipEntity.fireBulletIntervalSize
     * @override
     */
    this.fireBulletIntervalSize = 2000;
    this.init();
  }

  // ==========================================================================
  // Roaming methods
  // ==========================================================================

  roamWild = () => {
    const { x, y } = this.position;
    return new Promise(resolve => {
      this.moveTo(x, GameCanvas.size.height - this.size.height)
        .then(() => this.moveTo(x, y))
        .then(() => resolve());
    });
  };

  // ==========================================================================
  // BulletEntity methods
  // ==========================================================================

  /**
   * Fire a bullet.
   * @override
   */
  fireBullet = () => {
    if (!this.fireBulletInterval) {
      // Fires an enemy bullet.
      const fireEnemyBullet1 = () => {
        this.game.addEntity(
          new BulletEntity(
            this.game,
            this.position.x + this.size.width / 2 - this.size.width / 16,
            this.position.y + this.size.width,
            this.faction,
            'down'
          )
        );
      };
      const fireEnemyBullet2 = () => {
        this.game.addEntity(
          new BulletEntity(
            this.game,
            this.position.x,
            this.position.y + this.size.width / 2,
            this.faction,
            'left'
          )
        );
      };
      const fireEnemyBullet3 = () => {
        this.game.addEntity(
          new BulletEntity(
            this.game,
            this.position.x + this.size.width,
            this.position.y + this.size.width / 2,
            this.faction,
            'right'
          )
        );
      };
      // Start fire bullet setInterval.
      this.fireBulletInterval = setInterval(() => {
        fireEnemyBullet1();
        fireEnemyBullet2();
        fireEnemyBullet3();
      }, this.fireBulletIntervalSize);
    }
  };
}

export default Sideroost;
