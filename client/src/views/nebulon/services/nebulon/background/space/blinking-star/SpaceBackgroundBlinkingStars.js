import GameCanvas from '../../../game/canvas/GameCanvas';
import {
  blue,
  red,
  yellow
} from '../../../../../../../services/color/muiColors';

/**
 * A space background blinking star.
 */
class SpaceBackgroundBlinkingStars {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * SpaceBackgroundBlinkingStars opacity hex gradient. Obtained from
   * https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
   * @type {{red: *, yellow: *, blue: *}}
   */
  static blinkingColors = {
    red: red[500].light,
    blue: blue[500].light,
    yellow: yellow[500].light
  };

  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param background
   * @constructor
   */
  constructor(game, background) {
    /**
     * @see Game
     */
    this.game = game;
    /**
     * @see SpaceBackground
     */
    this.background = background;
    /**
     * @see GameEntity.size
     * @type {{width: number, height: number}}
     */
    this.size = {
      width: GameCanvas.size.width / 455,
      height: GameCanvas.size.height / 455
    };
    /**
     * The blinking stars collection.
     */
    this.blinkingStars = [];
    /**
     * The amount of blinking stars to draw.
     */
    this.blinkingStarsCount = 30;
    /**
     * The current star color.
     */
    this.currentColor = null;
    /**
     * The setInterval references to draw different color stars.
     * @type {number}
     */
    this.drawRedInterval = 0;
    this.drawBlueInterval = 0;
    this.drawYellowInterval = 0;
    /**
     * The setInterval size to draw different color stars.
     * @type {number}
     */
    this.drawRedIntervalSize = 100;
    this.drawBlueIntervalSize = 200;
    this.drawYellowIntervalSize = 300;
    this.init();
  }

  init = () => {
    this.createBlinkingStars();
    this.drawRedInterval = setInterval(() => {
      this.currentColor = SpaceBackgroundBlinkingStars.blinkingColors.red;
    }, this.drawRedIntervalSize);
    this.drawBlueInterval = setInterval(() => {
      this.currentColor = SpaceBackgroundBlinkingStars.blinkingColors.blue;
    }, this.drawBlueIntervalSize);
    this.drawYellowInterval = setInterval(() => {
      this.currentColor = SpaceBackgroundBlinkingStars.blinkingColors.yellow;
    }, this.drawYellowIntervalSize);
  };

  /**
   * Create an array of blinking stars at random positions.
   */
  createBlinkingStars = () => {
    this.blinkingStars = [...Array(this.blinkingStarsCount)].map(() => ({
      position: {
        x: Math.random() * this.background.size.width,
        y:
          Math.random() * -this.background.size.height +
          this.background.size.height
      }
    }));
  };

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  /**
   * Draws the blinking star.
   */
  draw = () => {
    this.blinkingStars.forEach(blinkingStar => {
      this.game.gameCanvas.drawRect({
        fillStyle: this.currentColor,
        width: this.size.width,
        height: this.size.height,
        x: blinkingStar.position.x,
        y: blinkingStar.position.y + this.size.height
      });
    });
  };

  // ==========================================================================
  // Move methods
  // ==========================================================================

  /**
   * Moves the blinking star downwards.
   */
  move = () => {
    this.blinkingStars.forEach(blinkingStar => {
      if (blinkingStar.position.y > GameCanvas.size.height) {
        blinkingStar.position = { ...this.resetGameEntityPosition() };
      }
      blinkingStar.position.y += this.size.height;
    });
  };

  /**
   * Get new random position.
   */
  resetGameEntityPosition = () => {
    return {
      x: Math.random() * GameCanvas.size.width,
      y: Math.random() * GameCanvas.size.height * -1.5
    };
  };

  // ==========================================================================
  // Event action methods
  // ==========================================================================

  /**
   * Actions taken on a game tick.
   */
  onTick = () => {
    this.draw();
    this.move();
  };

  // ==========================================================================
  // Clear intervals methods
  // ==========================================================================

  /**
   * Clear the draw red interval.
   * @returns {*}
   */
  clearDrawRedInterval = () => {
    if (this.drawRedInterval) {
      clearInterval(this.drawRedInterval);
      this.drawRedInterval = 0;
    }
    return Promise.resolve();
  };

  /**
   * Clear the draw blue interval.
   * @returns {*}
   */
  clearDrawBlueInterval = () => {
    if (this.drawBlueInterval) {
      clearInterval(this.drawBlueInterval);
      this.drawBlueInterval = 0;
    }
    return Promise.resolve();
  };

  /**
   * Clear the draw yellow interval.
   * @returns {*}
   */
  clearDrawYellowInterval = () => {
    if (this.drawYellowInterval) {
      clearInterval(this.drawYellowInterval);
      this.drawYellowInterval = 0;
    }
    return Promise.resolve();
  };

  /**
   * Clear intervals.
   */
  clearIntervals = () => {
    this.clearDrawRedInterval();
    this.clearDrawBlueInterval();
    this.clearDrawYellowInterval();
  };
}

export default SpaceBackgroundBlinkingStars;
