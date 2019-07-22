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
   * @param {number} x
   * @param {number} y
   * @param {number} factionStatus
   * @param {number} attackPoints
   * @param {{dxLeft: number=, dxRight: number=, dyUp: number=, dyDown: number=}=} d
   * @constructor
   * @abstract
   */
  constructor(game, { x, y }, factionStatus) {
    super(game, { x, y }, factionStatus);
  }

  // ==========================================================================
  // Entity collision detection methods
  // ==========================================================================

  /**
   * @override
   */
  onGameEntityCollision = entity => {
    // Skip if entity instance dead or invincible.
    if (
      entity.gamePlayEntityAliveStatus &&
      !entity.gamePlayEntityInvincibleStatus
    ) {
      // Do damage on entity instance.
      entity.gamePlayEntityHitPoints -= this.gamePlayEntityAttackPoints;
      // Die if hit points <= 0 on entity instance.
      if (entity.gamePlayEntityHitPoints <= 0) {
        entity.gamePlayEntityAliveStatus = false;
      }
    }
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * BulletEntity collision actions taken on a game tick.
   * @param {number} entIdx
   */
  onBulletEntityCollisionTick = entIdx => {
    if (
      this.hasGameEntityCollidedGameEntity(entIdx) ||
      this.hasGameEntityCollidedTopBoundary(
        this.gameEntityMoveVectorMagnitude
      ) ||
      this.hasGameEntityCollidedBottomBoundary(
        this.gameEntityMoveVectorMagnitude
      )
    ) {
      this.setGamePlayEntityAliveStatus(false);
    }
  };

  /**
   * @override
   */
  onTick = entIdx => {
    if (this.gamePlayEntityAliveStatus) {
      this.onGameEntityDrawImageTick();
      this.onBulletEntityCollisionTick(entIdx);
    } else {
      // Dispose GameEntity intervals and timeouts.
      this.disposeGameEntityMoveInterval();
      // Dispose GameEntity.
      this.disposeGameEntity(entIdx);
    }
  };
}

export default BulletEntity;
