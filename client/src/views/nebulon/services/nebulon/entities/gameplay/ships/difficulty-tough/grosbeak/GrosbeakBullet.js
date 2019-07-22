import Game from '../../../../../game/Game';
import GameEntity from '../../../../GameEntity';
import { lightBlue, pink } from '../../../../../../../../../services/color/muiColors';

/**
 * An enemy bullet.
 */
class GrosbeakBullet extends GameEntity {
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
     * @see GameEntity.size
     */
    this.size = {
      width: game.ship.size.width / 8,
      height: game.ship.size.height / 8
    };
    /**
     * @see GameEntity.speed
     * @override
     */
    this.speed = Game.speed / 25;
    this.init();
  }

  /**
   * @see GameEntity.init
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
   * @see GameEntity.draw
   * @override
   */
  draw = () => {
    // Corners
    this.game.canvas.drawRect({
      fillStyle: pink[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x,
      y: this.position.y
    });
    this.game.canvas.drawRect({
      fillStyle: pink[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width - this.size.width / 3,
      y: this.position.y
    });
    this.game.canvas.drawRect({
      fillStyle: pink[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x,
      y: this.position.y + (this.size.width / 3) * 2
    });
    this.game.canvas.drawRect({
      fillStyle: pink[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width - this.size.width / 3,
      y: this.position.y + (this.size.width / 3) * 2
    });
    // Center cross
    this.game.canvas.drawRect({
      fillStyle: pink[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width / 3,
      y: this.position.y
    });
    this.game.canvas.drawRect({
      fillStyle: pink[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x,
      y: this.position.y + this.size.width / 3
    });
    this.game.canvas.drawRect({
      fillStyle: pink[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width - this.size.width / 3,
      y: this.position.y + this.size.width / 3
    });
    this.game.canvas.drawRect({
      fillStyle: pink[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width / 3,
      y: this.position.y + (this.size.width / 3) * 2
    });
    // Center
    this.game.canvas.drawRect({
      fillStyle: lightBlue[300].light,
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
   * @see GameEntity.onTick
   * @override
   */
  onTick = () => {
    this.draw();
    if (this.hasGameEntityCollidedBottomBoundary(this.moveStepSize)) {
      this.setAliveStatus(false);
    }
  };
}

export default GrosbeakBullet;
