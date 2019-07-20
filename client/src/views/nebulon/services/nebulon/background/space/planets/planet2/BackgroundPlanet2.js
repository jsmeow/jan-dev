import GameCanvas from '../../../../game/canvas/GameCanvas';
import backgroundPlanet2Image from './assets/images/backgroundPlanet2.png';

/**
 * A space background planet.
 */
class BackgroundStar {
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
     * Background planet image.
     */
    this.image = new Image();
    /**
     * @see Entity.position
     * @type {{x: number, y: number}}
     */
    this.position = {
      x: 10,
      y: 10
    };
    /**
     * @see Entity.size
     * @type {{width: number, height: number}}
     */
    this.size = {
      width: 81,
      height: 81
    };
    this.init();
  }

  /**
   * Initializer.
   */
  init = () => {
    this.image.onload = () => {
      this.draw();
    };
    this.image.src = backgroundPlanet2Image;
  };

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  /**
   * Draws the planet.
   */
  draw = () => {
    this.game.canvas.context.drawImage(
      this.image,
      this.position.x * this.game.canvas.unit,
      this.position.y * this.game.canvas.unit,
      this.size.width * this.game.canvas.unit,
      this.size.height * this.game.canvas.unit
    );
  };
}

export default BackgroundStar;
