import GameCanvas from './canvas/GameCanvas';
import GameKeyHandler from './key-handler/GameKeyHandler';
import GameLoop from './loop/GameLoop';
import GameLogic from './gameplay/GameLogic';
import GameTitle from './title/GameTitle';
import GamePlayerEntity from '../entities/gameplay/player/GamePlayerEntity';
import Level from '../levels/Level';
import Level1 from '../levels/level1/Level1';

/**
 * The main game logic.
 */
class Game {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * Game speed.
   * @type {number}
   */
  static speed = 1;

  /**
   * @see Game.state
   */
  static states = {
    TITLE: 0,
    PLAYING: 1
  };

  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param {HTMLElement} canvasRef
   * @constructor
   */
  constructor(canvasRef) {
    /**
     * GameEntity collection.
     * @type {Object[]}
     */
    this.entities = [];
    /**
     * Game score.
     * @type {number}
     */
    this.score = 0;
    /**
     * Game state.
     * @type {?number}
     */
    this.state = null;
    /**
     * @see Level.
     */
    this.level = null;
    /**
     * @see GameCanvas
     */
    this.canvas = new GameCanvas(canvasRef);
    /**
     * @see GameLoop
     */
    this.loop = new GameLoop(this);
    /**
     * @see GameKeyHandler
     */
    this.keyHandler = new GameKeyHandler(this);
    /**
     * @see GameTitle
     */
    this.title = new GameTitle(this);
    /**
     * @see GameLogic
     */
    this.logic = new GameLogic(this);
    /**
     * @see GamePlayerEntity
     */
    this.playerEntity = null;
    this.init();
  }

  init = () => {
    // Initialize after the game canvas font is loaded.
    document.fonts.load(`12px "${GameCanvas.font}"`).then(() => {
      // Add keyboard event listeners.
      this.keyHandler.addKeydownEventListener();
      this.keyHandler.addKeyupEventListener();
      // Set the game state to title screen.
      this.setState(Game.states.TITLE);
      // Start the main game loop.
      this.loop.loop();
    });
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Game state setter.
   * @param {number} newState
   */
  setState = newState => {
    switch (newState) {
      // Title screen state
      case Game.states.TITLE:
        this.reset();
        break;
      // Playing state
      case Game.states.PLAYING:
        this.logic.init();
        break;
      default:
    }
    this.state = newState;
  };

  /**
   * Entities idle status setter.
   * @param {boolean} newEntitiesIdleStatus
   */
  setEntitiesIdleStatus = newEntitiesIdleStatus => {
    // Cycle through entity collection.
    this.entities.forEach(entity => {
      if (entity.type === Game) {
        console.log(entity);
        entity.setIdleStatus(newEntitiesIdleStatus);
      }
    });
  };

  // ==========================================================================
  // Create methods
  // ==========================================================================

  /**
   * Player entity creator.
   */
  createNewPlayerEntity = () => {
    this.playerEntity = new GamePlayerEntity(this);
    this.addToEntities(this.playerEntity);
  };

  /**
   * Level creator.
   * @param {number} newLevel
   */
  createNewLevel = newLevel => {
    // Create the level.
    switch (newLevel) {
      case Level.levels.createLevel1:
        this.level = new Level1(this);
        break;
      case Level.levels.createLevel2:
        // this.level = new Level2(this);
        break;
      case Level.levels.createLevel3:
        // this.level = new Level3(this);
        break;
      default:
    }
  };

  // ==========================================================================
  // Entity methods
  // ==========================================================================

  /**
   * Add a new entity to the entities collection.
   * @param {*} newGameEntity
   */
  addToEntities = newGameEntity => {
    this.entities.push(newGameEntity);
  };

  // ==========================================================================
  // Score methods
  // ==========================================================================

  /**
   * Add a score to the total game score.
   * @param {number} addToGameScore
   */
  addToScore = addToGameScore => {
    this.score = this.score + addToGameScore;
  };

  // ==========================================================================
  // Reset methods
  // ==========================================================================

  /**
   * reset.
   */
  reset = () => {
    this.disposeEntities();
    this.disposeScore();
    this.disposeLogic();
    this.disposePlayerEntity();
    this.disposeLevel();
  };

  // ==========================================================================
  // Disposal methods
  // ==========================================================================

  /**
   * Dispose the game entity by removing from the game entities
   * collection.
   * @param {number} entIdx
   */
  disposeEntity = entIdx => {
    this.entities.splice(entIdx, 1);
  };

  /**
   * Dispose the game entities.
   */
  disposeEntities = () => {
    this.entities = [];
  };

  /**
   * Dispose the game score.
   */
  disposeScore = () => {
    this.score = 0;
  };

  /**
   * Dispose the game logic.
   */
  disposeLogic = () => {
    this.logic = null;
  };

  /**
   * Dispose the game player entity.
   */
  disposePlayerEntity = () => {
    this.playerEntity = null;
  };

  /**
   * Dispose the game level.
   */
  disposeLevel = () => {
    this.level = null;
  };

  /**
   * Dispose the running animation frames and running event listeners.
   */
  dispose = () => {
    this.loop.disposeAnimationFrame();
    this.keyHandler.removeKeydownEventListener();
    this.keyHandler.removKeyupEventListener();
  };
}

export default Game;
