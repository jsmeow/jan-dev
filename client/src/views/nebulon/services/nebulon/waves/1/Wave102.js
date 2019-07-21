import Wave from '../Wave';
import Bloodbird from '../../entities/gameplay/ships/boss/bloodbird/Bloodbird';

class Wave102 extends Wave {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @constructor
   */
  constructor(game) {
    super(game);
    this.init();
  }

  /**
   * @override
   */
  init = () => {
    this.setEnemyEntities([
      // Bloodbird 1
      new Bloodbird(
        this.game,
        {
          x: this.util.defaultEntityCanvasCenterX - 27 / 2,
          y: -this.util.defaultEntityHeight
        },
        0
      )
    ]);
    this.setEnemyEntityPaths([
      // Bloodbird 1
      [
        {
          x: this.util.defaultEntityCanvasCenterX - 27 / 2,
          y:
            this.util.defaultEntityCanvasCenterY - this.util.defaultEntityHeight
        },
        {
          x: 27 / 2,
          y:
            this.util.defaultEntityCanvasCenterY - this.util.defaultEntityHeight
        },
        {
          x: this.util.canvasWidth - 27,
          y:
            this.util.defaultEntityCanvasCenterY - this.util.defaultEntityHeight
        },
        {
          x: this.util.defaultEntityCanvasCenterX - 27,
          y: 20
        }
      ]
    ]);
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * @override
   */
  isClearedConditionMet = () => {
    let enemiesDefeated = true;
    this.enemyEntities.forEach(entity => {
      if (entity.aliveStatus) {
        enemiesDefeated = false;
      }
    });
    return enemiesDefeated;
  };
}

export default Wave102;
