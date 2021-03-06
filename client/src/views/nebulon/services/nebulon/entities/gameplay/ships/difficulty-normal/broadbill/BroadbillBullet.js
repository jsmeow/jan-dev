import Game from '../../../../../game/Game';
import GameEntity from '../../../../GameEntity';
import { amber, orange } from '../../../../../../../../../services/color/muiColors';

/**
 * An enemy bullet.
 */
class BroadbillBullet extends GameEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number|*} x
   * @param {number|*} y
   * @param {string} direction
   * @constructor
   */
  constructor(game, x, y, direction) {
    super(game, x, y);
    /**
     * @see GameEntity.moveDirection
     */
    this.direction = direction;
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
    this.moveDirection(this.direction);
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
      fillStyle: amber[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x,
      y: this.position.y
    });
    this.game.canvas.drawRect({
      fillStyle: amber[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width - this.size.width / 3,
      y: this.position.y
    });
    this.game.canvas.drawRect({
      fillStyle: amber[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x,
      y: this.position.y + (this.size.width / 3) * 2
    });
    this.game.canvas.drawRect({
      fillStyle: amber[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width - this.size.width / 3,
      y: this.position.y + (this.size.width / 3) * 2
    });
    // Center cross
    this.game.canvas.drawRect({
      fillStyle: amber[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width / 3,
      y: this.position.y
    });
    this.game.canvas.drawRect({
      fillStyle: amber[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x,
      y: this.position.y + this.size.width / 3
    });
    this.game.canvas.drawRect({
      fillStyle: amber[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width - this.size.width / 3,
      y: this.position.y + this.size.width / 3
    });
    this.game.canvas.drawRect({
      fillStyle: amber[500].main,
      width: this.size.width / 3,
      height: this.size.height / 3,
      x: this.position.x + this.size.width / 3,
      y: this.position.y + (this.size.width / 3) * 2
    });
    // Center
    this.game.canvas.drawRect({
      fillStyle: orange[900].dark,
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

export default BroadbillBullet;
