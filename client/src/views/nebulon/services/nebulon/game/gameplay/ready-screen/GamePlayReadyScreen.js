import Game from '../../Game';
import GameCanvas from '../../canvas/GameCanvas';
import { grey } from '../../../../../../../services/color/muiColors';
import GamePlay from '../GamePlay';
import Level from '../../../levels/Level';

class GamePlayReadyScreen {
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
      x: GameCanvas.size.height / 2 - 25,
      y: GameCanvas.size.width / 2
    };
    /**
     * GamePlayReadyScreen blinking text label setInterval reference.
     * @type {number}
     */
    this.blinkTextLabelInterval = 0;
    /**
     * GamePlayReadyScreen blinking text label setInterval delay relative to
     * the game speed.
     * @type {number}
     */
    this.blinkTextLabelIntervalDelay = Game.speed * 750;
    /**
     * GamePlayReadyScreen status flag is text label will be drawn.
     * @type {boolean}
     */
    this.drawTextLabelStatus = true;
    /**
     * GamePlayReadyScreen number the text label will blink.
     * Must be an odd number.
     * @type {number}
     */
    this.blinkTextLabelCount = 5;
    /**
     * GamePlayReadyScreen blink amount reference.
     * @type {number}
     */
    this.blinkTextLabelCounter = 0;
    /**
     * GamePlayReadyScreen done blinking flag.
     * @type {boolean}
     */
    this.doneBlinkingTextLabelStatus = false;
  }

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Draw text label status flag setter.
   * @param {boolean} newDrawTextLabelStatus
   */
  setDrawTextLabelStatus = newDrawTextLabelStatus => {
    this.drawTextLabelStatus = newDrawTextLabelStatus;
  };

  /**
   * Blink text label counter setter.
   * @param {number} newNewBlinkTextLabelCounter
   */
  setNewBlinkTextLabelCounter = newNewBlinkTextLabelCounter => {
    this.blinkTextLabelCounter = newNewBlinkTextLabelCounter;
  };

  /**
   * Done blinking flag setter.
   * @param {boolean} newDoneBlinkingTextLabelStatus
   */
  setDoneBlinkingTextLabelStatus = newDoneBlinkingTextLabelStatus => {
    this.doneBlinkingTextLabelStatus = newDoneBlinkingTextLabelStatus;
  };

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  /**
   * 'Ready:' text label.
   */
  drawReadyLabel = () => {
    this.game.gameCanvas.drawText({
      fillStyle: grey[50].light,
      text: 'Ready',
      size: 10,
      x: this.labelPosition.x,
      y: this.labelPosition.y
    });
  };

  // ==========================================================================
  // Animation methods
  // ==========================================================================

  blinkTextLabel = () => {
    this.blinkTextLabelInterval = setInterval(() => {
      if (this.blinkTextLabelCounter < this.blinkTextLabelCount) {
        if (this.drawTextLabelStatus) {
          this.setDrawTextLabelStatus(false);
        } else {
          this.setDrawTextLabelStatus(true);
        }
        this.blinkTextLabelCounter = this.blinkTextLabelCounter + 1;
      } else {
        this.setDoneBlinkingTextLabelStatus(true);
      }
    }, this.blinkTextLabelIntervalDelay);
  };

  // ==========================================================================
  // Event action methods
  // ==========================================================================

  /**
   * Actions taken on game tick.
   */
  onTick = () => {
    if (this.drawTextLabelStatus) {
      this.drawReadyLabel();
    }
    if (this.doneBlinkingTextLabelStatus) {
      this.setNewBlinkTextLabelCounter(0);
      this.disposeBlinkTextLabelInterval();
      this.setDoneBlinkingTextLabelStatus(false);
      this.game.gamePlay.setGamePlayState(GamePlay.gamePlayStates.handleLevel);
    }
  };

  // ==========================================================================
  // Dispose methods
  // ==========================================================================

  /**
   * Dispose blinking text label setInterval reference.
   */
  disposeBlinkTextLabelInterval = () => {
    clearInterval(this.blinkTextLabelInterval);
    this.blinkTextLabelInterval = 0;
  };
}

export default GamePlayReadyScreen;
