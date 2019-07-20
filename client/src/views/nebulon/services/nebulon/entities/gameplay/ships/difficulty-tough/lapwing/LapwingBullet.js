import Game from '../../../../../game/Game';
import Entity from '../../../../Entity';
import { lightGreen, red } from '../../../../../../../../../services/color/muiColors';

/**
 * An enemy bullet.
 */
class LapwingBullet extends Entity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number|*} x
   * @param {number|*} y
   * @constructor
   */
  constructor(game, x, y) {
    super(game, x, y);
    /**
     * @see Entity.size
     */
    this.size = {
      width: game.ship.size.width / 8,
      height: game.ship.size.height / 8
    };
    /**
     * @see Entity.speed
     * @override
     */
    this.speed = Game.speed / 25;
    this.init();
  }

  /**
   * @see Entity.init
   * @override
   */
  init = () => {
    this.draw();
    this.moveDirection('down');
  };

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  /**
   * @see Entity.draw
   * @override
   */
  draw = () => {
    // Corners
    this.game.canvas.drawRect({
      fillStyle: lightGreen[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x,
      y: this.position.y
    });
    this.game.canvas.drawRect({
      fillStyle: lightGreen[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width - this.size.width / 3,
      y: this.position.y
    });
    this.game.canvas.drawRect({
      fillStyle: lightGreen[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x,
      y: this.position.y + (this.size.width / 3) * 2
    });
    this.game.canvas.drawRect({
      fillStyle: lightGreen[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width - this.size.width / 3,
      y: this.position.y + (this.size.width / 3) * 2
    });
    // Center cross
    this.game.canvas.drawRect({
      fillStyle: lightGreen[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width / 3,
      y: this.position.y
    });
    this.game.canvas.drawRect({
      fillStyle: lightGreen[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x,
      y: this.position.y + this.size.width / 3
    });
    this.game.canvas.drawRect({
      fillStyle: lightGreen[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width - this.size.width / 3,
      y: this.position.y + this.size.width / 3
    });
    this.game.canvas.drawRect({
      fillStyle: lightGreen[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width / 3,
      y: this.position.y + (this.size.width / 3) * 2
    });
    // Center
    this.game.canvas.drawRect({
      fillStyle: red[500].dark,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width / 3,
      y: this.position.y + this.size.width / 3
    });
  };

  // ==========================================================================
  // Loop tick methods
  // ==========================================================================

  /**
   * @see Entity.onTick
   * @override
   */
  onTick = () => {
    this.draw();
    if (this.hasCollidedBottomBoundary(this.moveStepSize)) {
      this.setAliveStatus(false);
    }
  };
}

export default LapwingBullet;
