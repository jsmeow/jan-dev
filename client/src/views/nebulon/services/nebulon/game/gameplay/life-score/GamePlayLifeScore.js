import image from './assets/images/life.png';
import { grey } from '../../../../../../../services/color/muiColors';

class GamePlayLifeScore {
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
      x: 75.7,
      y: 12
    };
    /**
     * Image position
     */
    this.imagePosition = {
      x: 102,
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
     * Life score image.
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
   * 'Lives:' text label.
   */
  drawLifeLabel = () => {
    this.game.gameCanvas.drawText({
      fillStyle: grey[50].light,
      text: 'Lives:',
      size: 4,
      x: this.labelPosition.x,
      y: this.labelPosition.y
    });
  };

  /**
   * Draw life images.
   */
  drawLifeImages = () => {
    for (let idx = 0; idx < this.game.gamePlayer.lifePoints; idx += 1) {
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
    this.drawLifeLabel();
    this.drawLifeImages();
  };
}

export default GamePlayLifeScore;
