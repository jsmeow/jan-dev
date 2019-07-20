import Level from '../Level';
import Wave101 from '../../waves/1/Wave101';
import Wave102 from '../../waves/1/Wave102';

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
    console.log('Level1 constructor');
    this.init();
  }

  // ==========================================================================
  // Wave methods
  // ==========================================================================

  /**
   * @override
   */
  createWaves = () => {
    console.log('createWaves');
    this.waves = [new Wave101(this.game), new Wave102(this.game)];
  };
}

export default Level1;
