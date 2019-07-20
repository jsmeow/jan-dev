import Game from '../Game';
import SpaceBackground from '../../background/space/SpaceBackground';

/**
 * The main game loop.
 */
class GameLoop {
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
     * Animation tick and frame data.
     * @type {{startTick: Date|null, frame: *}}
     */
    this.animation = {
      frame: null,
      startTick: null
    };
    /**
     * @see SpaceBackground
     */
    this.background = new SpaceBackground(this.game);
    this.init();
  }

  /**
   * Initialize.
   */
  init = () => {
    this.setAnimationStartTick(new Date());
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Animation start tick timestamp setter.
   * @param {Date|number} newAnimationStartTick
   */
  setAnimationStartTick = newAnimationStartTick => {
    this.animation.startTick = newAnimationStartTick;
  };

  // ==========================================================================
  // Loop methods
  // ==========================================================================

  /**
   * A game tick.
   */
  tick = () => {
    const startTick = new Date();
    if (startTick - this.animation.startTick >= Game.speed) {
      this.setAnimationStartTick(startTick);
      this.onTick();
    }
  };

  /**
   * Main game loop.
   */
  loop = () => {
    this.animation.frame = window.requestAnimationFrame(() => {
      // Scroll background regardless of state.
      this.onBackgroundTick();
      // Tick and loop.
      this.tick();
      this.loop();
    });
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * Background actions taken on game tick.
   */
  onBackgroundTick = () => {
    this.background.onTick();
  };

  /**
   * Title actions taken on game tick.
   */
  onTitleTick = () => {
    this.game.gameTitle.onTick();
  };

  /**
   * Game play actions taken on game tick.
   */
  onGamePlayTick = () => {
    this.game.gamePlay.onTick();
  };

  /**
   * State actions taken on a game tick.
   * State 0 = Title screen
   * State 1 = Playing
   */
  onTick = () => {
    switch (this.game.gameState) {
      // Title screen state
      case Game.gameStates.title:
        this.onTitleTick();
        break;
      // Playing state
      case Game.gameStates.playing:
        this.onGamePlayTick();
        break;
      default:
    }
  };

  // ==========================================================================
  // Disposal methods
  // ==========================================================================

  disposeAnimationFrame = () => {
    window.cancelAnimationFrame(this.animation.frame);
  };
}

export default GameLoop;
