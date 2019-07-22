import Game from '../../game/Game';
import Wave from '../Wave';
import Narrowbill from '../../entities/gameplay/ships/difficulty-easy/narrowbill/Narrowbill';
import Bentclaw from '../../entities/gameplay/ships/difficulty-easy/bentclaw/Bentclaw';
import SmallAsteroid from '../../entities/gameplay/asteroids/small/SmallAsteroid';
import Seekerbird from '../../entities/gameplay/ships/difficulty-easy/seekerbird/Seekerbird';
import Sideroost from '../../entities/gameplay/ships/difficulty-easy/sideroost/Sideroost';
import Sharpbeak from '../../entities/gameplay/ships/difficulty-easy/sharpbeak/Sharpbeak';
import Goldfinch from '../../entities/gameplay/ships/difficulty-easy/goldfinch/Goldfinch';
import Highdiver from '../../entities/gameplay/ships/difficulty-easy/highdiver/Highdiver';
import Minebird from '../../entities/gameplay/ships/difficulty-easy/minebird/Minebird';
import Torrentclaw from '../../entities/gameplay/ships/boss/torrentclaw/Torrentclaw';

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
    this.init();
  }

  /**
   * @override
   */
  init = () => {
    this.setEnemyEntities([
      // Seekerbird 1
      new Torrentclaw(
        this.game,
        {
          x: this.util.defaultEntityCanvasCenterX,
          y: -this.util.defaultEntityHeight
        },
        0
      )
    ]);
    this.setEnemyEntityPaths([
      [
        {
          x: this.util.defaultEntityCanvasCenterX,
          y: this.util.defaultEntityCanvasCenterY
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
