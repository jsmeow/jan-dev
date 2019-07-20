import Entity from '../Entity';

/**
 * A gameplay entity.
 */
class GamePlayEntity extends Entity {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * Standard/default size of a gameplay entity.
   * @type {{width: number, height: number}}
   */
  static defaultSize = {
    width: 9,
    height: 9
  };

  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number} x
   * @param {number} y
   * @param {number} factionStatus
   * @constructor
   */
  constructor(game, { x, y }, factionStatus) {
    super(game, { x, y });
    /**
     * GamePlayEntity faction status.
     * Enemy entity = 0
     * Allied entity = 1
     * @type {number}
     */
    this.factionStatus = factionStatus;
    /**
     * GamePlayEntity enemy image source.
     * To be implemented by the extending class.
     * @type {HTMLElement}
     */
    this.enemyImageSrc = null;
    /**
     * GamePlayEntity allied image source.
     * To be implemented by the extending class.
     * @type {HTMLElement}
     */
    this.alliedImageSrc = null;
    /**
     * GamePlayEntity status flag if alive or dead.
     * Defaults to true.
     * @type {boolean}
     */
    this.aliveStatus = true;
    /**
     * GamePlayEntity status flag if immune to attack points.
     * Defaults to false.
     * @type {boolean}
     */
    this.invincibleStatus = false;
    /**
     * GamePlayEntity score worth.
     * Defaults to 1.
     * @type {number}
     */
    this.scorePoints = 1;
    /**
     * GamePlayEntity hit points (hp) worth.
     * Defaults to 1.
     * @type {number}
     */
    this.hitPoints = 1;
    /**
     * GamePlayEntity attack points (ap) worth.
     * Defaults to 1.
     * @type {number}
     */
    this.attackPoints = 1;
    /**
     * GamePlayEntity type.
     * To be implemented by the extending class.
     * @type {string|*}
     */
    this.entityType = null;
    this.init();
  }

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * @override
   */
  setImageSource = () => {
    if (this.factionStatus === 0) {
      this.image.src = this.enemyImageSrc;
    }
    if (this.factionStatus === 1) {
      this.image.src = this.alliedImageSrc;
    }
  };

  /**
   * Faction status setter.
   * @param {number} newFactionStatus
   */
  setFactionStatus = newFactionStatus => {
    this.factionStatus = newFactionStatus;
  };

  /**
   * Alive status setter.
   * @param {boolean} newAliveStatus
   */
  setAliveStatus = newAliveStatus => {
    this.aliveStatus = newAliveStatus;
  };

  /**
   * Invincibility status setter.
   * @param {boolean} newInvincibleStatus
   */
  setInvincibleStatus = newInvincibleStatus => {
    this.invincibleStatus = newInvincibleStatus;
  };

  /**
   * Score points setter.
   */
  setScorePoints = newScorePoints => {
    this.scorePoints = newScorePoints;
  };

  /**
   * Hit points setter.
   */
  setHitPoints = newHitPoints => {
    this.hitPoints = newHitPoints;
  };

  /**
   * Attack points setter.
   */
  setAttackPoints = newAttackPoints => {
    this.attackPoints = newAttackPoints;
  };

  /**
   * Entity type setter.
   */
  setEntityType = newEntityType => {
    this.entityType = newEntityType;
  };

  // ==========================================================================
  // Entity collision detection methods
  // ==========================================================================

  /**
   * @override
   */
  hasCollidedEntity = thisEntIdx => {
    let hasCollided = false;
    // Cycle through entity collection.
    this.game.gameEntities.forEach((entity, entIdx) => {
      // Skip if it references itself.
      if (
        thisEntIdx !== entIdx &&
        !this.invincibleStatus &&
        entity.entityType &&
        this.entityType !== 'bullet' &&
        this.factionStatus !== entity.factionStatus
      ) {
        if (
          this.position.x < entity.position.x + entity.size.width &&
          this.position.x + this.size.width > entity.position.x &&
          this.position.y < entity.position.y + entity.size.height &&
          this.position.y + this.size.height > entity.position.y
        ) {
          // Take action on collision.
          this.onEntityCollision(entity);
          // Set collided flag.
          hasCollided = true;
        }
      }
    });
    return hasCollided;
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * Draw actions taken on a game tick.
   */
  onDrawImageTick = () => {
    if (this.factionStatus === 0) {
      this.drawRotatedImage(Math.PI);
    }
    if (this.factionStatus === 1) {
      this.drawImage();
    }
  };
}

export default GamePlayEntity;
