import GamePlayEntity from '../GamePlayEntity';

/**
 * @abstract
 */
class ShipEntity extends GamePlayEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number=} x
   * @param {number=} y
   * @param {number=} width
   * @param {number=} height
   * @param {number=} faction
   * @param {number=} d
   * @constructor
   */
  constructor(game, { x, y }, { width, height }, faction, d) {
    super(game, { x, y }, { width, height }, d);
  }

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * @override
   */
  onTick = entIdx => {
    if (this.status.alive) {
      this.onDrawImageTick();
      this.onRoamingTick();
      this.onBulletTick();
      this.onCollisionTick(entIdx);
    } else {
      this.onDisposeTick();
    }
  };
}

export default ShipEntity;
