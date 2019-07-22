import GamePlayEntity from './gameplay/GamePlayEntity';
import GameCanvas from '../game/canvas/GameCanvas';

export default {
  /**
   * @see GamePlayEntity.size.width
   */
  defaultEntityWidth: GamePlayEntity.defaultSize.width,
  /**
   * @see GamePlayEntity.size.height
   */
  defaultEntityHeight: GamePlayEntity.defaultSize.height,
  /**
   * @see GameCanvas.size.width
   */
  canvasWidth: GameCanvas.size.width,
  /**
   * @see GameCanvas.size.height
   */
  canvasHeight: GameCanvas.size.height,
  /**
   * X coordinate to spawn an enemy in the center of the canvas for a
   * default GameEntity.
   */
  defaultEntityCanvasCenterX:
    GameCanvas.size.width * 0.5 - GamePlayEntity.defaultSize.width / 2,
  /**
   * Y coordinate to spawn an enemy in the center of the canvas for a
   * default GameEntity.
   */
  defaultEntityCanvasCenterY:
    GameCanvas.size.height * 0.5 - GamePlayEntity.defaultSize.height / 2
};
