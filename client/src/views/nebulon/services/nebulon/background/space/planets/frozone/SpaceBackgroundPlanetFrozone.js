import GameCanvas from '../../../../game/canvas/GameCanvas';
import backgroundPlanet1Image from './assets/images/backgroundPlanet1.png';

/**
 * A space background planet.
 */
class SpaceBackgroundPlanetFrozone {
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
      x: GameCanvas.size.width / 3.6,
      y: 15
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
    this.image.src = backgroundPlanet1Image;
  };

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  /**
   * Draws the planet.
   */
  draw = () => {
    this.game.gameCanvas.context.drawImage(
      this.image,
      this.position.x * this.game.gameCanvas.unit,
      this.position.y * this.game.gameCanvas.unit,
      this.size.width * this.game.gameCanvas.unit,
      this.size.height * this.game.gameCanvas.unit
    );
  };
}

export default SpaceBackgroundPlanetFrozone;
