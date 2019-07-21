import Level from '../Level';
import Wave101 from '../../waves/1/Wave101';

class Level1 extends Level {
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

  // ==========================================================================
  // Wave methods
  // ==========================================================================

  /**
   * @override
   */
  createWaves = () => {
    this.waves = [new Wave101(this.game)];
  };
}

export default Level1;
