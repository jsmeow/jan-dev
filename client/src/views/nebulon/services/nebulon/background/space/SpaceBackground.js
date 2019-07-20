import Game from '../../game/Game';
import GameCanvas from '../../game/canvas/GameCanvas';
import SpaceBackgroundComets from './comet/SpaceBackgroundComets';
import SpaceBackgroundBlinkingStars from './blinking-star/SpaceBackgroundBlinkingStars';
import SpaceBackgroundPlanetFrozone from './planets/frozone/SpaceBackgroundPlanetFrozone';
import { grey } from '../../../../../../services/color/muiColors';

/**
 * Space spaceBackground.
 */
class SpaceBackground {
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
     * @see GameCanvas.size
     * @type {{width: number, height: number}}
     */
    this.size = {
      width: GameCanvas.size.width,
      height: GameCanvas.size.height
    };
    /**
     * The space background blinking stars.
     * @type {SpaceBackgroundBlinkingStars}
     */
    this.spaceBackgroundBlinkingStars = new SpaceBackgroundBlinkingStars(
      this.game,
      this
    );
    /**
     * The space background comets.
     * @type {SpaceBackgroundComets}
     */
    this.spaceBackgroundComets = new SpaceBackgroundComets(this.game, this);
    /**
     * The space background title planet.
     * @type {SpaceBackgroundPlanetFrozone}
     */
    this.spaceBackgroundPlanetFrozone = new SpaceBackgroundPlanetFrozone(
      this.game
    );
  }

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  /**
   * Draw the black empty space.
   */
  drawSpace = () => {
    this.game.gameCanvas.drawRect({
      fillStyle: grey[900].dark,
      strokeStyle: grey[50].light,
      lineWidth: 2,
      width: this.size.width,
      height: this.size.height,
      x: 0,
      y: 0
    });
  };

  // ==========================================================================
  // Event action methods
  // ==========================================================================

  /**
   * Actions taken on a game tick.
   */
  onTick = () => {
    this.drawSpace();
    this.spaceBackgroundBlinkingStars.onTick();
    this.spaceBackgroundComets.onTick();
    if (this.game.gameState === Game.gameStates.title) {
      this.spaceBackgroundPlanetFrozone.draw();
    }
  };
}

export default SpaceBackground;
