import ShipEntity from '../../ShipEntity';
import StandardBullet from '../../../bullets/standard/StandardBullet';
import enemyImageSrc from './assets/images/enemy-torrentclaw.png';
import alliedImageSrc from './assets/images/allied-torrentclaw.png';
import damagedImageSrc from './assets/images/damaged-torrentclaw.png';
import HomingBullet from '../../../bullets/homing/HomingBullet';

class Torrentclaw extends ShipEntity {
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
    this.setGameEntitySize({ width: 45, height: 36 });
    this.setHitPoints(150);
    this.setFireHomingBulletIntervalDelay(
      this.fireHomingBulletIntervalDelay * 4
    );
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
  createStandardBullets = () => {
    if (this.factionStatus === 0) {
      // Left 0 degree bullet.
      this.addStandardBulletToGameEntities(
        {
          x: this.position.x,
          y: this.position.y + this.size.height / 2
        },
        {
          dxLeft: this.fireStandardBulletMagnitude
        }
      );
      // Right 0 degree bullet.
      this.addStandardBulletToGameEntities(
        {
          x: this.position.x + this.size.width,
          y: this.position.y + this.size.height / 2
        },
        {
          dxRight: this.fireStandardBulletMagnitude
        }
      );
      // Left 22.5 degree bullet.
      this.addStandardBulletToGameEntities(
        {
          x: this.position.x + this.size.width / 20,
          y: this.position.y + this.size.height / 2 + this.size.height / 8
        },
        {
          dxLeft: this.fireStandardBulletMagnitude,
          dyDown: this.fireStandardBulletMagnitude / 4
        }
      );
      // Right 22.5 degree bullet.
      this.addStandardBulletToGameEntities(
        {
          x: this.position.x + this.size.width - this.size.width / 20,
          y: this.position.y + this.size.height / 2 + this.size.height / 16
        },
        {
          dxRight: this.fireStandardBulletMagnitude,
          dyDown: this.fireStandardBulletMagnitude / 4
        }
      );
      // Left 45 degree bullet.
      this.addStandardBulletToGameEntities(
        {
          x: this.position.x + this.size.width / 10,
          y: this.position.y + this.size.height / 2 + this.size.height / 4
        },
        {
          dxLeft: this.fireStandardBulletMagnitude,
          dyDown: this.fireStandardBulletMagnitude
        }
      );
      // Right 45 degree bullet.
      this.addStandardBulletToGameEntities(
        {
          x: this.position.x + this.size.width - this.size.width / 10,
          y: this.position.y + this.size.height / 2 + this.size.height / 4
        },
        {
          dxRight: this.fireStandardBulletMagnitude,
          dyDown: this.fireStandardBulletMagnitude
        }
      );
      // Left 67.5 degree bullet.
      this.addStandardBulletToGameEntities(
        {
          x: this.position.x + this.size.width / 7.5,
          y: this.position.y + this.size.height / 2 + this.size.height / 3.5
        },
        {
          dxLeft: this.fireStandardBulletMagnitude / 4,
          dyDown: this.fireStandardBulletMagnitude
        }
      );
      // Right 67.5 degree bullet.
      this.addStandardBulletToGameEntities(
        {
          x: this.position.x + this.size.width - this.size.width / 7.5,
          y: this.position.y + this.size.height / 2 + this.size.height / 3.5
        },
        {
          dxRight: this.fireStandardBulletMagnitude / 4,
          dyDown: this.fireStandardBulletMagnitude
        }
      );
      // Left 90 degree bullet.
      this.addStandardBulletToGameEntities(
        {
          x: this.position.x + this.size.width / 7.5,
          y: this.position.y + this.size.height / 2 + this.size.height / 3.5
        },
        {
          dyDown: this.fireStandardBulletMagnitude
        }
      );
      // Right 90 degree bullet.
      this.addStandardBulletToGameEntities(
        {
          x: this.position.x + this.size.width - this.size.width / 7.5,
          y: this.position.y + this.size.height / 2 + this.size.height / 3.5
        },
        {
          dyDown: this.fireStandardBulletMagnitude
        }
      );
    }
  };

  /**
   * @override
   */
  createHomingBullets = () => {
    this.addHomingBulletToGameEntities({
      x: this.position.x + this.size.width / 2,
      y: this.position.y + this.size.height
    });
  };
}

export default Torrentclaw;
