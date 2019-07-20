import Game from '../../../game/Game';
import GamePlayEntity from '../GamePlayEntity';
import enemyImageSrc from './assets/images/enemy-bullet.png';
import alliedImageSrc from './assets/images/allied-bullet.png';

/**
 * A bullet entity.
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
   * @param {{dxLeft: number=, dxRight: number=, dyUp: number=, dyDown: number=}=} step
   * @constructor
   */
  constructor(game, { x, y }, factionStatus, attackPoints, step) {
    super(game, { x, y }, factionStatus);
    /**
     * @override
     */
    this.enemyImageSrc = enemyImageSrc;
    /**
     * @override
     */
    this.alliedImageSrc = alliedImageSrc;
    this.init(attackPoints, step);
  }

  /**
   * @override
   */
  init = (attackPoints, step) => {
    this.setImageSource();
    this.setSize({
      width: 1,
      height: 1
    });
    this.setEntityType('bullet');
    this.setSpeed(Game.speed / 3.125);
    this.setHitPoints(1);
    this.setAttackPoints(attackPoints);
    this.moveDirection(step);
  };

  // ==========================================================================
  // Entity collision detection methods
  // ==========================================================================

  /**
   * @override
   */
  onEntityCollision = entity => {
    entity.hitPoints -= this.attackPoints;
    if (entity.hitPoints <= 0) {
      entity.aliveStatus = false;
    }
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * Collision actions taken on a game tick.
   * @param {number} entIdx
   */
  onCollisionTick = entIdx => {
    if (
      this.hasCollidedEntity(entIdx) ||
      this.hasCollidedTopBoundary(this.speed) ||
      this.hasCollidedBottomBoundary(this.speed)
    ) {
      console.log('asd');
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
      this.disposeEntity(entIdx);
    }
  };
}

export default BulletEntity;
