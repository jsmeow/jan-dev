import { grey } from '../../../../../../../services/color/muiColors';
import GameCanvas from '../../../game/canvas/GameCanvas';

/**
 * A space background star.
 */
class SpaceBackgroundComets {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * SpaceBackgroundComets opacity hex gradient. Obtained from
   * https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
   * @type {string[]}
   */
  static opacityGradient = ['B3', '99', '80', '66', '4D', '33', '1A', '00'];

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
     * @see Entity.size
     * @type {{width: number, height: number}}
     */
    this.size = {
      width: GameCanvas.size.width / 455,
      height: GameCanvas.size.height / 455
    };
    /**
     * The comets collection.
     * @type {Array}
     */
    this.comets = [];
    /**
     * Amount of comets to draw.
     * @type {number}
     */
    this.cometCount = 30;
    this.init();
  }

  init = () => {
    this.createComets();
  };

  /**
   * Create an array of comets at random positions.
   */
  createComets = () => {
    this.comets = [...Array(this.cometCount)].map(() => ({
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
   * Draws the comet.
   */
  draw = () => {
    this.comets.forEach(comet => {
      SpaceBackgroundComets.opacityGradient.forEach((hexOpacity, hexIdx) => {
        this.game.gameCanvas.drawRect({
          fillStyle: `${grey[50].light}${hexOpacity}`,
          width: this.size.width,
          height: this.size.height,
          x: comet.position.x,
          y: comet.position.y - hexIdx * this.size.height
        });
      });
    });
  };

  // ==========================================================================
  // Move methods
  // ==========================================================================

  /**
   * Moves the comet downwards.
   */
  move = () => {
    const cometLength =
      SpaceBackgroundComets.opacityGradient.length * this.size.height;
    const bottomBoundary = GameCanvas.size.height + cometLength;
    this.comets.forEach(comet => {
      if (comet.position.y > bottomBoundary) {
        comet.position = { ...this.resetPosition() };
      }
      comet.position.y += this.size.height / 2;
    });
  };

  /**
   * Get new random position.
   */
  resetPosition = () => {
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
}

export default SpaceBackgroundComets;
