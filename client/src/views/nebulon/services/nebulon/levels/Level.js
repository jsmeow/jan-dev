class Level {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @constructor
   */
  constructor(game) {
    /**
     * @see Game
     */
    this.game = game;
    /**
     * Level wave object reference collection.
     * @type {Array}
     */
    this.waves = [];
    /**
     * Level current wave.
     * @type {*}
     */
    this.currentWave = null;
    /**
     * Level status flag is cleared.
     * @type {boolean}
     */
    this.isLevelClearedStatus = false;
    this.init();
  }

  init = () => {
    this.createWaves();
    this.beginNextWave();
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Current wave setter.
   * @param {*} newCurrentWave
   */
  setCurrentWave = newCurrentWave => {
    this.currentWave = newCurrentWave;
  };

  /**
   * Level cleared status flag setter.
   * @param {boolean} newIsLevelClearedStatus
   */
  setIsLevelClearedStatus = newIsLevelClearedStatus => {
    this.isLevelClearedStatus = newIsLevelClearedStatus;
  };

  // ==========================================================================
  // Wave methods
  // ==========================================================================

  /**
   * Create waves object instances.
   * To be implemented by the extending class.
   */
  createWaves = () => {
    this.waves = [];
  };

  /**
   * Begin the next wave in the wave collection.
   */
  beginNextWave = () => {
    if (this.waves.length > 0) {
      const currentWave = this.waves.shift();
      this.setCurrentWave(currentWave);
      // Begin the new current wave.
      this.currentWave.begin();
    } else {
      this.setIsLevelClearedStatus(true);
    }
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * Actions taken on a game tick for current wave.
   */
  onCurrentWaveTick = () => {
    this.currentWave.onTick();
  };

  /**
   * Actions taken on a game tick.
   */
  onTick = () => {
    this.onCurrentWaveTick();
    if (this.currentWave.isWaveClearedStatus) {
      this.beginNextWave();
    }
  };
}

export default Level;
