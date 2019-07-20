import Wave from '../Wave';
import Narrowbill from '../../entities/gameplay/ships/difficulty-easy/narrowbill/Narrowbill';
import Bentclaw from '../../entities/gameplay/ships/difficulty-easy/bentclaw/Bentclaw';
import Hookneck from '../../entities/gameplay/ships/boss/hookneck/Hookneck';

class Wave101 extends Wave {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @constructor
   */
  constructor(game) {
    super(game);
    console.log('Wave101 constructor');
    this.init();
  }

  /**
   * @override
   */
  init = () => {
    this.setEnemyEntities([
      // Narrowbill 1
      new Narrowbill(
        this.game,
        {
          x:
            this.util.defaultEntityCanvasCenterX -
            this.util.defaultEntityWidth * 3,
          y: -this.util.defaultEntityHeight
        },
        0
      ),
      // Narrowbill 2
      new Narrowbill(
        this.game,
        {
          x: this.util.defaultEntityCanvasCenterX,
          y: -this.util.defaultEntityHeight
        },
        0
      ),
      // Narrowbill 3
      new Narrowbill(
        this.game,
        {
          x:
            this.util.defaultEntityCanvasCenterX +
            this.util.defaultEntityWidth * 3,
          y: -this.util.defaultEntityHeight
        },
        0
      ),
      // Narrowbill 4
      new Narrowbill(
        this.game,
        {
          x: this.util.defaultEntityWidth,
          y: -this.util.defaultEntityHeight * 5
        },
        0
      ),
      // Narrowbill 5
      new Narrowbill(
        this.game,
        {
          x: this.util.canvasWidth - this.util.defaultEntityWidth * 2,
          y: -this.util.defaultEntityHeight * 5
        },
        0
      ),
      // Bentclaw 1
      new Bentclaw(
        this.game,
        {
          x:
            this.util.defaultEntityCanvasCenterX -
            this.util.defaultEntityWidth * 5,
          y: -this.util.defaultEntityHeight
        },
        0
      ),
      // Bentclaw 2
      new Bentclaw(
        this.game,
        {
          x:
            this.util.defaultEntityCanvasCenterX +
            this.util.defaultEntityWidth * 5,
          y: -this.util.defaultEntityHeight
        },
        0
      )
    ]);
    this.setEnemyEntityPaths([
      // Narrowbill 1
      [
        {
          x:
            this.util.defaultEntityCanvasCenterX -
            this.util.defaultEntityWidth * 3,
          y: this.util.defaultEntityCanvasCenterY
        }
      ],
      // Narrowbill 1
      [
        {
          x: this.util.defaultEntityCanvasCenterX,
          y: this.util.defaultEntityCanvasCenterY
        }
      ],
      // Narrowbill 3
      [
        {
          x:
            this.util.defaultEntityCanvasCenterX +
            this.util.defaultEntityWidth * 3,
          y: this.util.defaultEntityCanvasCenterY
        }
      ],
      // Narrowbill 4
      [
        {
          x: this.util.defaultEntityWidth,
          y: this.util.canvasHeight - this.util.defaultEntityHeight * 2
        },
        {
          x: this.util.canvasWidth - this.util.defaultEntityWidth * 2,
          y: this.util.canvasHeight - this.util.defaultEntityHeight * 2
        },
        {
          x:
            this.util.defaultEntityCanvasCenterX -
            this.util.defaultEntityWidth * 5,
          y:
            this.util.defaultEntityCanvasCenterY -
            this.util.defaultEntityHeight * 2
        }
      ],
      // Narrowbill 5
      [
        {
          x: this.util.canvasWidth - this.util.defaultEntityWidth * 2,
          y: this.util.canvasHeight - this.util.defaultEntityHeight * 4
        },
        {
          x: this.util.defaultEntityWidth,
          y: this.util.canvasHeight - this.util.defaultEntityHeight * 4
        },
        {
          x:
            this.util.defaultEntityCanvasCenterX +
            this.util.defaultEntityWidth * 5,
          y:
            this.util.defaultEntityCanvasCenterY -
            this.util.defaultEntityHeight * 2
        }
      ],
      // Bentclaw 1
      [
        {
          x:
            this.util.defaultEntityCanvasCenterX -
            this.util.defaultEntityWidth * 5,
          y:
            this.util.defaultEntityCanvasCenterY -
            this.util.defaultEntityHeight * 3
        }
      ],
      // Bentclaw 1
      [
        {
          x:
            this.util.defaultEntityCanvasCenterX +
            this.util.defaultEntityWidth * 5,
          y:
            this.util.defaultEntityCanvasCenterY -
            this.util.defaultEntityHeight * 3
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

export default Wave101;
