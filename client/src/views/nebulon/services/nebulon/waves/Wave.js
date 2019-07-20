import GameCanvas from '../game/canvas/GameCanvas';
import GamePlayEntity from '../entities/gameplay/GamePlayEntity';

class Wave {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * Util values for enemy and wave path creation.
   * @type {*}
   */
  util = {
    /**
     * @see GamePlayEntity.size.width
     */
    defaultEntityWidth: GamePlayEntity.defaultSize.width,
    /**
     * @see GamePlayEntity.size.height
     */
    defaultEntityHeight: GamePlayEntity.defaultSize.height,
    /**
     * @see GameCanvas.size.width
     */
    canvasWidth: GameCanvas.size.width,
    /**
     * @see GameCanvas.size.height
     */
    canvasHeight: GameCanvas.size.height,
    /**
     * X coordinate to spawn an enemy in the center of the canvas for a
     * default GameEntity.
     */
    defaultEntityCanvasCenterX:
      GameCanvas.size.width * 0.5 - GamePlayEntity.defaultSize.width / 2,
    /**
     * Y coordinate to spawn an enemy in the center of the canvas for a
     * default GameEntity.
     */
    defaultEntityCanvasCenterY:
      GameCanvas.size.height * 0.5 - GamePlayEntity.defaultSize.height / 2
  };

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
     * Wave enemies entities.
     * @type {Array}
     */
    this.enemyEntities = [];
    /**
     * Wave enemies entity paths.
     * @type {Array}
     */
    this.enemyEntityPaths = [];
    /**
     * Wave status flag whether the wave is cleared.
     * @type {boolean}
     */
    this.isWaveClearedStatus = false;
    this.init();
  }

  init = () => {
    this.setEnemyEntities([]);
    this.setEnemyEntityPaths([]);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Enemy entities setter.
   * @param {*} newEnemyEntities
   */
  setEnemyEntities = newEnemyEntities => {
    this.enemyEntities = newEnemyEntities;
  };

  /**
   * Enemy entity paths setter.
   * @param {*} newEnemyEntityPaths
   */
  setEnemyEntityPaths = newEnemyEntityPaths => {
    this.enemyEntityPaths = newEnemyEntityPaths;
  };

  /**
   * Wave cleared status flag setter.
   * @param {boolean} newIsWaveClearedStatus
   */
  setIsWaveClearedStatus = newIsWaveClearedStatus => {
    this.isWaveClearedStatus = newIsWaveClearedStatus;
  };

  // ==========================================================================
  // Add methods
  // ==========================================================================

  /**
   * Add to the game entity collection.
   */
  addToGameEntities = () => {
    this.enemyEntities.forEach(entity => {
      this.game.addToGameEntities(entity);
    });
  };

  // ==========================================================================
  // Wave enemy path methods
  // ==========================================================================

  /**
   * Execute the wave enemy paths.
   * To be implemented by the extending class.
   */
  beginPaths = () => {
    this.enemyEntities.forEach((entity, entIdx) => {
      entity.movePath(this.enemyEntityPaths[entIdx]).then(() => {
        entity.setRoamingStatus(true);
      });
    });
  };

  /**
   * Execute the wave.
   */
  begin = () => {
    this.addToGameEntities();
    this.beginPaths();
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * Check the clear condition of the wave.
   * To be implemented by the extending class.
   * @return {boolean}
   */
  isClearedConditionMet = () => {
    return true;
  };

  /**
   * Actions taken on a game tick.
   */
  onTick = () => {
    if (this.isClearedConditionMet()) {
      this.setIsWaveClearedStatus(true);
    }
  };
}

export default Wave;
