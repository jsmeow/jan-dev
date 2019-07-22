import image from './assets/images/bomb.png';
import { grey } from '../../../../../../../services/color/muiColors';

class GamePlayBombScore {
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
      y: 6
    };
    /**
     * Image position
     */
    this.imagePosition = {
      x: 165,
      y: 1.5
    };
    /**
     * Image size.
     */
    this.imageSize = {
      width: 4.5,
      height: 4.5
    };
    /**
     * Bomb score image.
     */
    this.image = new Image();
    this.init();
  }

  init = () => {
    this.setGameEntityImageSource();
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Image source setter.
   */
  setGameEntityImageSource = () => {
    this.image.src = image;
  };

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  /**
   * 'Bomb:' text label.
   */
  drawBombLabel = () => {
    this.game.gameCanvas.drawText({
      fillStyle: grey[50].light,
      text: 'Bombs:',
      size: 4,
      x: this.labelPosition.x,
      y: this.labelPosition.y
    });
  };

  /**
   * Draw bomb images.
   */
  drawBombs = () => {
    for (let idx = 0; idx < this.game.gamePlayer.bombPoints; idx += 1) {
      this.game.gameCanvas.context.drawImage(
        this.image,
        (this.imagePosition.x + idx * 6) * this.game.gameCanvas.unit,
        this.imagePosition.y * this.game.gameCanvas.unit,
        this.imageSize.width * this.game.gameCanvas.unit,
        this.imageSize.height * this.game.gameCanvas.unit
      );
    }
  };

  // ==========================================================================
  // Event action methods
  // ==========================================================================

  /**
   * Playing actions taken on game tick.
   */
  onTick = () => {
    this.drawBombLabel();
    this.drawBombs();
  };
}

export default GamePlayBombScore;
