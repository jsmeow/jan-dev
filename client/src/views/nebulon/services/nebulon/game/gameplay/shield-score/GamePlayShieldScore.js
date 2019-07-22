import image from './assets/images/shield.png';
import { grey } from '../../../../../../../services/color/muiColors';

class GamePlayShieldScore {
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
      x: 68,
      y: 6
    };
    /**
     * Image position
     */
    this.imagePosition = {
      x: 102,
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
     * See GameEntity.draw
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
   * 'Shield:' text label.
   */
  drawShieldLabel = () => {
    this.game.gameCanvas.drawText({
      fillStyle: grey[50].light,
      text: 'Shields:',
      size: 4,
      x: this.labelPosition.x,
      y: this.labelPosition.y
    });
  };

  /**
   * Draw shield images.
   */
  drawShieldImages = () => {
    for (let idx = 0; idx < this.game.gamePlayer.shieldPoints; idx += 1) {
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
    this.drawShieldLabel();
    this.drawShieldImages();
  };
}

export default GamePlayShieldScore;
