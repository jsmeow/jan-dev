import GameLoop from './loop/GameLoop';
import GameCanvas from './canvas/GameCanvas';
import GameTitle from './title/GameTitle';
import GameKeyHandler from './key-handler/GameKeyHandler';
import GamePlayerEntity from '../entities/gameplay/player/GamePlayerEntity';
import Level from '../levels/Level';
import Level1 from '../levels/level1/Level1';
import GamePlay from './gameplay/GamePlay';
import ShipEntity from '../entities/gameplay/ships/ShipEntity';

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
  static gameSpeed = 1;

  /**
   * Game states.
   * @type {*}
   */
  static gameStates = {
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
     * Game GameEntity collection.
     * @type {Array.<*>}
     */
    this.gameEntities = [];
    /**
     * Game reference of the current running level instance.
     * @see Level objects.
     */
    this.gameLevel = null;
    /**
     * Game level action to be taken.
     * @type {number|*}
     */
    this.gameLevelAction = Level.levels.unset;
    /**
     * Game current score.
     */
    this.gameScore = 0;
    /**
     * Game current state.
     */
    this.gameState = null;
    /**
     * @see GameCanvas
     */
    this.gameCanvas = new GameCanvas(canvasRef);
    /**
     * @see GameLoop
     */
    this.gameLoop = new GameLoop(this);
    /**
     * @see GameKeyHandler
     */
    this.gameKeyHandler = new GameKeyHandler(this);
    /**
     * @see GameTitle
     */
    this.gameTitle = new GameTitle(this);
    /**
     * @see GamePlay
     */
    this.gamePlay = null;
    /**
     * @see GamePlayerEntity
     */
    this.gamePlayer = null;
    this.init();
  }

  init = () => {
    // Initialize after the game canvas font is loaded.
    document.fonts.load(`12px "${GameCanvas.gameCanvasFont}"`).then(() => {
      // Add keyboard event listeners.
      this.gameKeyHandler.addGameKeyHandlerKeydownEventListener();
      this.gameKeyHandler.addGameKeyHandlerKeyupEventListener();
      // Set the game state to title screen.
      this.setGameState(0);
      // Start the main game loop.
      this.gameLoop.loop();
    });
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Game state setter.
   * State 0 = Title screen
   * State 1 = Playing
   * State 2 = Paused
   * @param {number|*} newGameState
   */
  setGameState = newGameState => {
    switch (newGameState) {
      // Title screen state
      case Game.gameStates.title:
        this.resetGame();
        break;
      // Playing state
      case Game.gameStates.playing:
        this.createNewGamePlay();
        break;
      default:
    }
    this.gameState = newGameState;
  };

  /**
   * Game level action setter.
   * @param {number|*} newGameLevelAction
   */
  setGameLevelAction = newGameLevelAction => {
    this.gameLevelAction = newGameLevelAction;
  };

  /**
   * Game entities idle status setter.
   * @param {boolean} newGameEntitiesIdleStatus
   */
  setGameEntitiesIdleStatus = newGameEntitiesIdleStatus => {
    // Cycle through entity collection.
    this.gameEntities.forEach(entity => {
      if (entity instanceof ShipEntity) {
        console.log(entity);
        entity.setShipEntityIdleStatus(newGameEntitiesIdleStatus);
      }
    });
  };

  // ==========================================================================
  // Create methods
  // ==========================================================================

  /**
   * Game player creator.
   */
  createNewGamePlayer = () => {
    this.gamePlayer = new GamePlayerEntity(this, {
      ...GamePlayerEntity.defaultSpawnPosition
    });
    this.addToGameEntities(this.gamePlayer);
  };

  /**
   * Game level creator.
   * @param {number} newLevel
   */
  createNewGameLevel = newLevel => {
    // Create the level.
    switch (newLevel) {
      case Level.levels.createLevel1:
        this.gameLevel = new Level1(this);
        break;
      case Level.levels.createLevel2:
        // this.gameLevel = new Level2(this);
        break;
      case Level.levels.createLevel3:
        // this.gameLevel = new Level3(this);
        break;
      default:
    }
  };

  /**
   * Game play creator.
   */
  createNewGamePlay = () => {
    this.gamePlay = new GamePlay(this);
  };

  // ==========================================================================
  // Add instance/to methods
  // ==========================================================================

  /**
   * Game add a new entity to the entities collection.
   * @param {*} newGameEntity
   */
  addToGameEntities = newGameEntity => {
    this.gameEntities.push(newGameEntity);
  };

  /**
   * Game add a score to the total game score.
   * @param {number} addToGameScore
   */
  addToGameScore = addToGameScore => {
    this.gameScore = this.gameScore + addToGameScore;
  };

  // ==========================================================================
  // Reset methods
  // ==========================================================================

  /**
   * Game reset.
   */
  resetGame = () => {
    this.disposeGameEntities();
    this.disposeGameScore();
    this.disposeGamePlay();
    this.disposeGamePlayer();
    this.disposeGameLevel();
  };

  // ==========================================================================
  // Disposal methods
  // ==========================================================================

  /**
   * Game dispose the game entity by removing from the game entities
   * collection.
   * @param {number} entIdx
   */
  disposeGameEntity = entIdx => {
    this.gameEntities.splice(entIdx, 1);
  };

  /**
   * Game dispose the game entities.
   */
  disposeGameEntities = () => {
    this.gameEntities = [];
  };

  /**
   * Game dispose the game score.
   */
  disposeGameScore = () => {
    this.gameScore = 0;
  };

  /**
   * Game dispose the current running game.
   */
  disposeGamePlay = () => {
    this.gamePlay = null;
  };

  /**
   * Game dispose the current running game.
   */
  disposeGamePlayer = () => {
    this.gamePlayer = null;
  };

  /**
   * Game dispose the current running game level.
   */
  disposeGameLevel = () => {
    this.gameLevel = null;
  };

  /**
   * Game dispose of running animation frames and running event listeners.
   */
  disposeGame = () => {
    this.gameLoop.disposeAnimationFrame();
    this.gameKeyHandler.removeGameKeyHandlerKeydownEventListener();
    this.gameKeyHandler.removeGameKeyHandlerKeyupEventListener();
  };
}

export default Game;
