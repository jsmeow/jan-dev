import Game from '../../../../game/Game';
import BulletEntity from '../BulletEntity';
import gamePlayEntityEnemyImageSrc from './assets/images/enemy-standard-bullet.png';
import gamePlayEntityAlliedImageSrc from './assets/images/allied-standard-bullet.png';

class StandardBullet extends BulletEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number} x
   * @param {number} y
   * @param {number} factionStatus
   * @param {number} attackPoints
   * @param {{dxLeft: number=, dxRight: number=, dyUp: number=, dyDown: number=}=} d
   * @constructor
   */
  constructor(game, { x, y }, factionStatus, attackPoints, d) {
    super(game, { x, y }, factionStatus);
    this.loadAssets(gamePlayEntityEnemyImageSrc, gamePlayEntityAlliedImageSrc);
    this.init(attackPoints, d);
  }

  init = (attackPoints, d) => {
    this.setEntityType('bullet');
    this.setGameEntitySize({
      width: 1,
      height: 1
    });
    this.setGameEntitySpeed(
      Game.gameSpeed * BulletEntity.bulletEntitySpeedModifierDefault
    );
    this.setGamePlayEntityAttackPoints(attackPoints);
    this.moveGameEntityDirection(d);
  };
}

export default StandardBullet;
