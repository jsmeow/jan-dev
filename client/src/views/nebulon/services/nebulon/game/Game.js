import GameLoop from './loop/GameLoop';
import GameCanvas from './canvas/GameCanvas';
import GameTitle from './title/GameTitle';
import GameKeyHandler from './key-handler/GameKeyHandler';
import Player from '../entities/gameplay/ships/player/Player';
import Level1 from '../levels/level1/Level1';
import GamePlay from './gameplay/GamePlay';
import GamePlayEntity from '../entities/gameplay/GamePlayEntity';

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
   * Game states.
   * @type {*}
   */
  static gameStates = {
    title: 0,
    playing: 1
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
     * Game Entity collection.
     * @type {Array.<*>}
     */
    this.gameEntities = [];
    /**
     * Game reference of the current running level instance.
     * @see Level objects.
     */
    this.gameLevel = null;
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
     * @see Player
     */
    this.gamePlayer = null;
    this.init();
  }

  init = () => {
    // Initialize after the canvas font is loaded.
    document.fonts.load(`12px "${GameCanvas.font}"`).then(() => {
      // Add keyboard event listeners.
      this.gameKeyHandler.addKeydownEventListener();
      this.gameKeyHandler.addKeyupEventListener();
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

  // ==========================================================================
  // Create methods
  // ==========================================================================

  /**
   * Game player creator.
   */
  createNewGamePlayer = () => {
    this.gamePlayer = new Player(this, {
      x: GameCanvas.size.width * 0.5 - GamePlayEntity.defaultSize.width / 2,
      y: GameCanvas.size.height - GamePlayEntity.defaultSize.height * 2
    });
    this.addToGameEntities(this.gamePlayer);
  };

  /**
   * Game level creator.
   * @param {number} newLevel
   */
  createNewGameLevel = newLevel => {
    switch (newLevel) {
      case 1:
        this.gameLevel = new Level1(this);
        break;
      case 2:
        // this.gameLevel = new Level2(this);
        break;
      case 3:
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
   * Add a new entity to the entities collection.
   * @param newEntity
   */
  addToGameEntities = newEntity => {
    this.gameEntities.push(newEntity);
  };

  /**
   * Add a score to the total game score.
   * @param score
   */
  addToGameScore = score => {
    this.score = this.score + score;
  };

  // ==========================================================================
  // Reset methods
  // ==========================================================================

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
   * Dispose the game entities.
   */
  disposeGameEntities = () => {
    this.gameEntities = [];
  };

  /**
   * Dispose the game score.
   */
  disposeGameScore = () => {
    this.gameScore = 0;
  };

  /**
   * Dispose the current running game.
   */
  disposeGamePlay = () => {
    this.gamePlay = null;
  };

  /**
   * Dispose the current running game.
   */
  disposeGamePlayer = () => {
    this.gamePlayer = null;
  };

  /**
   * Dispose the current running game level.
   */
  disposeGameLevel = () => {
    this.gameLevel = null;
  };

  /**
   * Dispose of running animation frames and running event listeners.
   */
  disposeGame = () => {
    this.gameLoop.disposeAnimationFrame();
    this.gameKeyHandler.removeKeydownEventListener();
    this.gameKeyHandler.removeKeyupEventListener();
  };
}

export default Game;
