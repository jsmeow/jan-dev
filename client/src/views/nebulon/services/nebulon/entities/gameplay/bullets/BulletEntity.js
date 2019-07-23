import GamePlayEntity from '../GamePlayEntity';

/**
 * @abstract
 */
class BulletEntity extends GamePlayEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {Object}
   * @constructor
   * @abstract
   */
  constructor(
    game,
    { position, size, faction, attackPoints, vectorMagnitude, d }
  ) {
    super(game, { position, size, faction, attackPoints, d });
  }

  // ==========================================================================
  // Entity collision detection methods
  // ==========================================================================

  /**
   * @override
   */
  onCollisionEvent = entity => {
    // Skip if entity instance dead or invincible.
    if (entity.status.alive && !entity.status.invincible) {
      // Do damage on entity instance.
      entity.points.health -= this.points.attack;
      // Die if hit points <= 0 on entity instance.
      if (entity.points.health <= 0) {
        entity.status.alive = false;
      }
    }
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * @override
   */
  onCollisionTick = entIdx => {
    // Check collision and collision boundaries.
    if (
      this.hasEntityCollidedEntity(entIdx) ||
      this.hasCollidedLeftBoundary(this.moveVector.magnitude) ||
      this.hasCollidedRightBoundary(this.moveVector.magnitude) ||
      this.hasCollidedTopBoundary(this.moveVector.magnitude) ||
      this.hasCollidedBottomBoundary(this.moveVector.magnitude)
    ) {
      this.setAliveStatus(false);
    }
  };

  /**
   * @override
   */
  onDisposeTick = entIdx => {
    // Dispose GameEntity resources.
    this.disposeMoveVectorInterval();
    // Dispose GamePlayEntity resources.
    this.disposeDamagedImageDurationTimeout();
    // Dispose entity.
    this.disposeEntity(entIdx);
  };

  /**
   * @override
   */
  onTick = entIdx => {
    if (this.status.aliveStatus) {
      this.onDrawImageTick();
      this.onCollisionTick(entIdx);
    } else {
      this.onDisposeTick(entIdx);
    }
  };
}

export default BulletEntity;
