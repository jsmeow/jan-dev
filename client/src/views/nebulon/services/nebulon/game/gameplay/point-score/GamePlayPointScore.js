import { grey } from '../../../../../../../services/color/muiColors';

class GamePlayPointScore {
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
     * Text label position
     */
    this.labelPosition = {
      x: 140,
      y: 12
    };
  }

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  /**
   * 'Score:' text label.
   */
  drawScoreLabel = () => {
    this.game.gameCanvas.drawText({
      fillStyle: grey[50].light,
      text: 'Score:',
      size: 4,
      x: this.labelPosition.x,
      y: this.labelPosition.y
    });
  };

  /**
   * Draw power images.
   */
  drawScorePointsLabel = () => {
    this.game.gameCanvas.drawText({
      fillStyle: grey[50].light,
      text: this.game.gameScore,
      size: 4,
      x: this.labelPosition.x + 37.5,
      y: this.labelPosition.y
    });
  };

  // ==========================================================================
  // Event action methods
  // ==========================================================================

  /**
   * Playing actions taken on game tick.
   */
  onTick = () => {
    this.drawScoreLabel();
    this.drawScorePointsLabel();
  };
}

export default GamePlayPointScore;
