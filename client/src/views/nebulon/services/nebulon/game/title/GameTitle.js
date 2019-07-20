import { red } from '../../../../../../services/color/muiColors';
import GameCanvas from '../canvas/GameCanvas';

/**
 * The game title.
 */
class GameTitle {
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
  }

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  /**
   * 'Nebulon' text label.
   */
  drawNebulonLabel = () => {
    this.game.gameCanvas.drawText({
      fillStyle: red[500].main,
      text: 'Nebulon',
      size: 15,
      x: GameCanvas.size.width / 4.5,
      y: GameCanvas.size.height / 3
    });
  };

  /**
   * 'Press Enter To Play' text label.
   */
  drawPressEnterLabel = () => {
    this.game.gameCanvas.drawText({
      size: 7,
      text: 'Insert 25¢ To Play ',
      x: GameCanvas.size.width / 6,
      y: GameCanvas.size.height / 1.5
    });
  };

  // ==========================================================================
  // Loop tick methods
  // ==========================================================================

  /**
   * Actions taken on a game tick.
   */
  onTick = () => {
    this.drawNebulonLabel();
    this.drawPressEnterLabel();
  };
}

export default GameTitle;
