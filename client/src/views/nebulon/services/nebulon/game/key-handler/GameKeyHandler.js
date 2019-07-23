import Game from '../Game';

class GameKeyHandler {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * Keyboard keys used.
   * @type {Object}
   */
  static keys = {
    START: 'Enter',
    LEFT: 'a',
    RIGHT: 'd',
    UP: 'w',
    DOWN: 's',
    ACTION1: ' ',
    ACTION2: 'q'
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
     * Status flag whether a key has been fired/pressed.
     * @type {boolean}
     */
    this.keyHandlerKeypressStatus = false;
  }

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Key pressed status flag setter.
   * @param {boolean} newKeypressStatus
   */
  setKeypressStatus = newKeypressStatus => {
    this.keyHandlerKeypressStatus = newKeypressStatus;
  };

  // ==========================================================================
  // Add keydown event listener methods
  // ==========================================================================

  /**
   * add keydown event listener.
   */
  addKeydownEventListener = () => {
    document.body.addEventListener('keydown', this.handleOnKeyDown.bind(this));
  };

  /**
   * Add keyup event listener.
   */
  addKeyupEventListener = () => {
    document.body.addEventListener('keyup', this.handleOnKeyUp.bind(this));
  };

  // ==========================================================================
  // Key event handler methods
  // ==========================================================================

  /**
   * Keydown event handler.
   * @param {string} key
   * @returns {*}
   */
  handleOnKeyDown = ({ key }) => {
    this.setKeypressStatus(true);
    const keyEvents = {
      [GameKeyHandler.keys.START]() {
        // Start the game if in title screen state and not running.
        if (this.game.state === Game.states.TITLE) {
          this.game.setState(Game.states.PLAYING);
        }
      },
      // Move game player entity left.
      [GameKeyHandler.keys.LEFT]() {
        this.game.playerEntity.moveInVector('left');
      },
      // Move game player entity right.
      [GameKeyHandler.keys.RIGHT]() {
        this.game.playerEntity.moveInVector('right');
      },
      // Move game player entity up.
      [GameKeyHandler.keys.UP]() {
        this.game.playerEntity.moveInVector('up');
      },
      // Move game player entity down.
      [GameKeyHandler.keys.DOWN]() {
        this.game.playerEntity.moveInVector('down');
      },
      // Fire a game player entity bomb.
      [GameKeyHandler.keys.ACTION1]() {
        this.game.playerEntity.addPlayerEntitySmallBombToGameEntities();
      },
      // Use game player entity power.
      [GameKeyHandler.keys.ACTION2]() {
        this.game.playerEntity.usePlayerPower();
      }
    };
    return keyEvents.hasOwnProperty(key) && keyEvents[key].call(this);
  };

  /**
   * keyup event handler.
   * @param {string} key
   * @returns {*}
   */
  handleOnKeyUp = ({ key }) => {
    this.setKeypressStatus(false);
    const keyEvents = {
      // Clear move player entity move left interval.
      [GameKeyHandler.keys.left]() {
        this.game.playerEntity.disposePlayerEntityMoveLeftInterval();
      },
      // Clear move player entity move right interval.
      [GameKeyHandler.keys.right]() {
        this.game.playerEntity.disposePlayerEntityMoveRightInterval();
      },
      // Clear move player entity move up interval.
      [GameKeyHandler.keys.up]() {
        this.game.playerEntity.disposePlayerEntityMoveUpInterval();
      },
      // Clear move player entity move down interval.
      [GameKeyHandler.keys.down]() {
        this.game.playerEntity.disposePlayerEntityMoveDownInterval();
      }
    };
    return keyEvents.hasOwnProperty(key) && keyEvents[key].call(this);
  };

  // ==========================================================================
  // Disposal methods
  // ==========================================================================

  /**
   * remove keydown event listener.
   */
  removeKeydownEventListener = () => {
    document.body.removeEventListener(
      'keydown',
      this.handleOnKeyDown.bind(this)
    );
  };

  /**
   * remove keyup event listener.
   */
  removKeyupEventListener = () => {
    document.body.removeEventListener('keyup', this.handleOnKeyUp.bind(this));
  };
}

export default GameKeyHandler;
