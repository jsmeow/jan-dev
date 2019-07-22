import GamePlayEntity from '../../../GamePlayEntity';
import ShipEntity from '../../ShipEntity';
import StandardBullet from '../../../bullets/standard/StandardBullet';
import enemyImageSrc from './assets/images/enemy-goldfinch.png';
import alliedImageSrc from './assets/images/allied-goldfinch.png';
import damagedImageSrc from './assets/images/damaged-goldfinch.png';

class Goldfinch extends ShipEntity {
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
            dxLeft: this.fireStandardBulletMagnitude,
            dyDown: this.fireStandardBulletMagnitude
          }
        )
      );
      setTimeout(() => {
        this.createStandardBullet();
      }, this.fireBulletIntervalDelay / 3);
      setTimeout(() => {
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
              dxRight: this.fireStandardBulletMagnitude,
              dyDown: this.fireStandardBulletMagnitude
            }
          )
        );
      }, (this.fireBulletIntervalDelay * 2) / 3);
    }
    if (this.factionStatus === 1) {
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
            dxLeft: this.fireStandardBulletMagnitude,
            dyUp: this.fireStandardBulletMagnitude
          }
        )
      );
      setTimeout(() => {
        this.createStandardBullet();
      }, this.fireBulletIntervalDelay / 3);
      setTimeout(() => {
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
              dxRight: this.fireStandardBulletMagnitude,
              dyUp: this.fireStandardBulletMagnitude
            }
          )
        );
      }, (this.fireBulletIntervalDelay * 2) / 3);
    }
  };
}

export default Goldfinch;
