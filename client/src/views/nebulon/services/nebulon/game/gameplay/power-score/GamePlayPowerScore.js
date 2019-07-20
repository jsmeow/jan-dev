import image from './assets/images/power.png';
import { grey } from '../../../../../../../services/color/muiColors';

class GamePlayPowerScore {
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
      x: 5.9,
      y: 12
    };
    /**
     * Image position
     */
    this.imagePosition = {
      x: 31,
      y: 7
    };
    /**
     * Image size.
     */
    this.imageSize = {
      width: 4.5,
      height: 4.5
    };
    /**
     * Power score image.
     */
    this.image = new Image();
    this.init();
  }

  init = () => {
    this.setImageSource();
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Image source setter.
   */
  setImageSource = () => {
    this.image.src = image;
  };

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  /**
   * 'Power:' text label.
   */
  drawPowerLabel = () => {
    this.game.gameCanvas.drawText({
      fillStyle: grey[50].light,
      text: 'Power:',
      size: 4,
      x: this.labelPosition.x,
      y: this.labelPosition.y
    });
  };

  /**
   * Draw power images.
   */
  drawPowerImages = () => {
    for (let idx = 0; idx < this.game.gamePlayer.powerPoints; idx += 1) {
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
    this.drawPowerLabel();
    this.drawPowerImages();
  };
}

export default GamePlayPowerScore;
