import Game from '../../../game/Game';
import GamePlayEntity from '../GamePlayEntity';
import DestroyExplosion from '../../display/explosions/destroy/DestroyExplosion';

/**
 * @abstract
 */
class BombEntity extends GamePlayEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number} x
   * @param {number} y
   * @param {number} factionStatus
   * @param {{width: number, height: number}} bombEntityExplosionSize
   * @constructor
   */
  constructor(game, { x, y }, factionStatus, bombEntityExplosionSize) {
    super(game, { x, y }, factionStatus);
    /**
     * BombEntity damaged image.
     * @type {HTMLElement}
     */
    this.bombEntityDamagedImage = new Image();
    /**
     * BombEntity explosion size.
     * @type {{width: number, height: number}|*}
     */
    this.bombEntityExplosionSize = bombEntityExplosionSize;
  }

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * BombEntity image source setter.
   * @param {HTMLElement} newBombEntityDamagedImageSource
   */
  setBombEntityDamagedImageSource = newBombEntityDamagedImageSource => {
    this.bombEntityDamagedImage.src = newBombEntityDamagedImageSource;
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * @override
   */
  onDrawImageTick = () => {
    this.drawImage();
  };

  /**
   * Collision actions taken on a game tick.
   * @param {number} entIdx
   */
  onCollisionTick = entIdx => {
    if (
      this.hasCollidedEntity(entIdx) ||
      this.hasGameEntityCollidedTopBoundary(this.moveStepSize) ||
      this.hasGameEntityCollidedBottomBoundary(this.moveStepSize)
    ) {
      // Ready to dispose.
      this.setAliveStatus(false);
    }
  };

  /**
   * @override
   */
  onTick = entIdx => {
    if (this.aliveStatus) {
      this.onDrawImageTick();
      this.onCollisionTick(entIdx);
    } else {
      // Create the destroy explosion.
      this.createDestroyExplosion();
      this.disposeEntity(entIdx);
    }
  };
}

export default BombEntity;
