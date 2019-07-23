import Game from '../../../../game/Game';
import GamePlayEntity from '../../GamePlayEntity';
import AsteroidEntity from '../AsteroidEntity';
import gamePlayEntityEnemyImageSrc from './assets/images/asteroid-small-1.png';
import asteroidEntityDamagedImageSrc from './assets/images/damaged-asteroid-small-1.png';

class SmallAsteroid extends AsteroidEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number} x
   * @param {number} y
   * @param {number} factionStatus
   * @param {{dxLeft: number=, dxRight: number=, dyUp: number=, dyDown: number=}=} step
   * @constructor
   */
  constructor(game, { x, y }, step) {
    super(game, { x, y });
    this.loadAssets(gamePlayEntityEnemyImageSrc, asteroidEntityDamagedImageSrc);
    this.init(step);
  }

  /**
   * @override
   */
  init = step => {
    this.setEntityType('asteroid');
    this.setGameEntitySize({
      width: GamePlayEntity.defaultSize.width,
      height: GamePlayEntity.defaultSize.height
    });

    this.setGameEntitySpeed(
      Game.speed * AsteroidEntity.asteroidEntitySpeedModifierDefault
    );
    this.setHealthPoints(5);
    this.setAttackPoints(5);
    this.setScorePoints(5);
    this.moveDirection(step);
  };
}

export default SmallAsteroid;
