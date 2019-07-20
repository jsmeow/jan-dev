import Game from '../Game';
import GamePlay from '../gameplay/GamePlay';

/**
 * Keyboard key event handler.
 */
class GameKeyHandler {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * Game keyboard keys used.
   */
  static keys = {
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
     * Flag whether a key has been fired/pressed.
     * @type {boolean}
     */
    this.isKeyFired = false;
  }

  // ==========================================================================
  // Add keydown event listener methods
  // ==========================================================================

  /**
   * Add key down event listener.
   */
  addKeydownEventListener = () => {
    document.body.addEventListener('keydown', this.handleOnKeyDown.bind(this));
  };

  /**
   * Add key up event listener.
   */
  addKeyupEventListener = () => {
    document.body.addEventListener('keyup', this.handleOnKeyUp.bind(this));
  };

  // ==========================================================================
  // Event handler methods
  // ==========================================================================

  /**
   * Key down event handler.
   * @param {string} key
   * @returns {*}
   */
  handleOnKeyDown = ({ key }) => {
    this.isKeyFired = true;
    const keyEvents = {
      [GameKeyHandler.keys.start]() {
        // Start the game if in title screen state and not running.
        if (
          this.game.gameState === Game.gameStates.title &&
          !this.game.isGameRunningStatus
        ) {
          this.game.setGameState(Game.gameStates.playing);
        }
      },
      // Move player left.
      [GameKeyHandler.keys.left]() {
        this.game.gamePlayer.moveDirection('left');
      },
      // Move player right.
      [GameKeyHandler.keys.right]() {
        this.game.gamePlayer.moveDirection('right');
      },
      // Move player up.
      [GameKeyHandler.keys.up]() {
        this.game.gamePlayer.moveDirection('up');
      },
      // Move player down.
      [GameKeyHandler.keys.down]() {
        this.game.gamePlayer.moveDirection('down');
      },
      // Fire a player bomb.
      [GameKeyHandler.keys.action1]() {
        this.game.gamePlayer.fireBomb();
      },
      // Use player power.
      [GameKeyHandler.keys.action2]() {
        this.game.gamePlayer.usePower();
      }
    };
    return keyEvents.hasOwnProperty(key) && keyEvents[key].call(this);
  };

  /**
   * Key up event handler.
   * @param {string} key
   * @returns {*}
   */
  handleOnKeyUp = ({ key }) => {
    this.isKeyFired = false;
    const keyEvents = {
      // Clear move player left interval.
      [GameKeyHandler.keys.left]() {
        this.game.gamePlayer.disposeMoveLeftInterval();
      },
      // Clear move player right interval.
      [GameKeyHandler.keys.right]() {
        this.game.gamePlayer.disposeMoveRightInterval();
      },
      // Clear move player up interval.
      [GameKeyHandler.keys.up]() {
        this.game.gamePlayer.disposeMoveUpInterval();
      },
      // Clear move player down interval.
      [GameKeyHandler.keys.down]() {
        this.game.gamePlayer.disposeMoveDownInterval();
      }
    };
    return keyEvents.hasOwnProperty(key) && keyEvents[key].call(this);
  };

  // ==========================================================================
  // Disposal methods
  // ==========================================================================

  /**
   * Remove key down event listener.
   */
  removeKeydownEventListener = () => {
    document.body.removeEventListener(
      'keydown',
      this.handleOnKeyDown.bind(this)
    );
  };

  /**
   * Remove key up event listener.
   */
  removeKeyupEventListener = () => {
    document.body.removeEventListener('keyup', this.handleOnKeyUp.bind(this));
  };
}

export default GameKeyHandler;
