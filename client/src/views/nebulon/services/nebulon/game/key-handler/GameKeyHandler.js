import Game from '../Game';

class GameKeyHandler {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * GameKeyHandler keyboard keys used.
   * @type {*}
   */
  static gameKeyHandlerKeys = {
    start: 'Enter',
    left: 'a',
    right: 'd',
    up: 'w',
    down: 's',
    action1: ' ',
    action2: 'q'
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
     * GameKeyHandler status flag whether a key has been fired/pressed.
     * @type {boolean}
     */
    this.gameKeyHandlerKeypressStatus = false;
  }

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * GameKeyHandler key pressed status flag setter.
   * @param {boolean} newGameKeyHandlerKeypressStatus
   */
  setGameKeyHandlerKeypressStatus = newGameKeyHandlerKeypressStatus => {
    this.gameKeyHandlerKeypressStatus = newGameKeyHandlerKeypressStatus;
  };

  // ==========================================================================
  // Add keydown event listener methods
  // ==========================================================================

  /**
   * GameKeyHandler add keydown event listener.
   */
  addGameKeyHandlerKeydownEventListener = () => {
    document.body.addEventListener(
      'keydown',
      this.handleGameKeyHandlerOnKeyDown.bind(this)
    );
  };

  /**
   * GameKeyHandler add keyup event listener.
   */
  addGameKeyHandlerKeyupEventListener = () => {
    document.body.addEventListener('keyup', this.handleOnKeyUp.bind(this));
  };

  // ==========================================================================
  // Event handler methods
  // ==========================================================================

  /**
   * GameKeyHandler keydown event handler.
   * @param {string} key
   * @returns {*}
   */
  handleGameKeyHandlerOnKeyDown = ({ key }) => {
    this.setGameKeyHandlerKeypressStatus(true);
    const keyEvents = {
      [GameKeyHandler.gameKeyHandlerKeys.start]() {
        // Start the game if in title screen state and not running.
        if (this.game.gameState === Game.gameStates.title) {
          this.game.setGameState(Game.gameStates.playing);
        }
      },
      // Move game player entity left.
      [GameKeyHandler.gameKeyHandlerKeys.left]() {
        this.game.gamePlayer.moveGameEntityDirection('left');
      },
      // Move game player entity right.
      [GameKeyHandler.gameKeyHandlerKeys.right]() {
        this.game.gamePlayer.moveGameEntityDirection('right');
      },
      // Move game player entity up.
      [GameKeyHandler.gameKeyHandlerKeys.up]() {
        this.game.gamePlayer.moveGameEntityDirection('up');
      },
      // Move game player entity down.
      [GameKeyHandler.gameKeyHandlerKeys.down]() {
        this.game.gamePlayer.moveGameEntityDirection('down');
      },
      // Fire a game player entity bomb.
      [GameKeyHandler.gameKeyHandlerKeys.action1]() {
        this.game.gamePlayer.addPlayerEntitySmallBombToGameEntities();
      },
      // Use game player entity power.
      [GameKeyHandler.gameKeyHandlerKeys.action2]() {
        this.game.gamePlayer.usePlayerPower();
      }
    };
    return keyEvents.hasOwnProperty(key) && keyEvents[key].call(this);
  };

  /**
   * GameKeyHandler keyup event handler.
   * @param {string} key
   * @returns {*}
   */
  handleGameKeyHandlerOnKeyUp = ({ key }) => {
    this.setGameKeyHandlerKeypressStatus(false);
    const keyEvents = {
      // Clear move player entity move left interval.
      [GameKeyHandler.gameKeyHandlerKeys.left]() {
        this.game.gamePlayer.disposePlayerMoveLeftInterval();
      },
      // Clear move player entity move right interval.
      [GameKeyHandler.gameKeyHandlerKeys.right]() {
        this.game.gamePlayer.disposePlayerMoveRightInterval();
      },
      // Clear move player entity move up interval.
      [GameKeyHandler.gameKeyHandlerKeys.up]() {
        this.game.gamePlayer.disposePlayerMoveUpInterval();
      },
      // Clear move player entity move down interval.
      [GameKeyHandler.gameKeyHandlerKeys.down]() {
        this.game.gamePlayer.disposePlayerMoveDownInterval();
      }
    };
    return keyEvents.hasOwnProperty(key) && keyEvents[key].call(this);
  };

  // ==========================================================================
  // Disposal methods
  // ==========================================================================

  /**
   * GameKeyHandler remove keydown event listener.
   */
  removeGameKeyHandlerKeydownEventListener = () => {
    document.body.removeEventListener(
      'keydown',
      this.handleGameKeyHandlerOnKeyDown.bind(this)
    );
  };

  /**
   * GameKeyHandler remove keyup event listener.
   */
  removeGameKeyHandlerKeyupEventListener = () => {
    document.body.removeEventListener(
      'keyup',
      this.handleGameKeyHandlerOnKeyUp.bind(this)
    );
  };
}

export default GameKeyHandler;
