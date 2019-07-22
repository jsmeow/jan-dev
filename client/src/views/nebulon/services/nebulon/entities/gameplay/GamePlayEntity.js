import GameEntity from '../GameEntity';
import BulletEntity from './bullets/BulletEntity';
import DamageExplosion from '../display/explosions/damage/DamageExplosion';
import DestroyExplosion from '../display/explosions/destroy/DestroyExplosion';
import Game from '../../game/Game';

/**
 * @abstract
 */
class GamePlayEntity extends GameEntity {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * @see GamePlayEntity.damagedImage
   */
  static defaultDamagedImageDuration = {
    timeout: 0,
    timeoutDelayModifier: 200
  };

  /**
   * @see GamePlayEntity.standardBullet
   */
  static defaultStandardBullet = {
    interval: 0,
    intervalDelayModifier: 500,
    vectorMagnitudeModifier: 0.15
  };

  /**
   * @see GamePlayEntity.homingBullet
   */
  static defaultHomingBullet = {
    interval: 0,
    intervalDelayModifier: 500,
    vectorMagnitudeModifier: 0.15
  };

  /**
   * @see GamePlayEntity.roaming
   */
  static defaultRoaming = {
    timeout: 0,
    timeoutDelayModifier: 1500,
    vectorMagnitudeModifier: 0.15
  };

  /**
   * @see GamePlayEntity.status
   */
  static defaultStatus = {
    alive: true,
    invincible: false,
    firing: false,
    idle: false,
    roaming: false
  };

  /**
   * @see GamePlayEntity.points
   */
  static defaultPoints = {
    health: 1,
    attack: 1,
    score: 1
  };

  /**
   * @see GamePlayEntity.factions
   */
  static factions = {
    ENEMY: 0,
    ALLIED: 1
  };

  /**
   * @see GamePlayEntity.types
   */
  static types = {
    SHIP: 0,
    BULLET: 1,
    BOMB: 2,
    ASTEROID: 3
  };

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
    /**
     * GamePlayEntity factions types.
     * @type {Object}
     */
    this.faction = faction || GamePlayEntity.factions.ENEMY;
    /**
     * Default GamePlayEntity image. The image source to be provided by the
     * extending class.
     * Damaged GamePlayEntity image. The image source to be provided by the
     * extending class.
     * @type {Object}
     */
    this.images = {
      defaultImage: new Image(),
      damagedImage: new Image()
    };
    /**
     * Damaged GamePlayEntity image duration timeout.
     * @type {Object}
     */
    this.damagedImageDuration = {
      timeout: GamePlayEntity.defaultDamagedImageDuration.timeout,
      timeoutDelay:
        Game.gameSpeed *
        GamePlayEntity.defaultDamagedImageDuration.timeoutDelayModifier
    };
    /**
     * Standard bullet creation interval and vector magnitude.
     * @type {Object}
     */
    this.standardBullet = {
      interval: GamePlayEntity.defaultStandardBullet.interval,
      intervalDelay:
        Game.gameSpeed *
        GamePlayEntity.defaultStandardBullet.intervalDelayModifier,
      vectorMagnitude:
        Game.gameSpeed *
        GamePlayEntity.defaultStandardBullet.vectorMagnitudeModifier
    };
    /**
     * Homing bullet creation interval and vector magnitude.
     * @type {Object}
     */
    this.homingBullet = {
      interval: GamePlayEntity.defaultHomingBullet.interval,
      intervalDelay:
        Game.gameSpeed *
        GamePlayEntity.defaultHomingBullet.intervalDelayModifier,
      vectorMagnitude:
        Game.gameSpeed *
        GamePlayEntity.defaultHomingBullet.vectorMagnitudeModifier
    };
    /**
     * GamePlayEntity roaming creation interval and vector magnitude.
     * @type {Object}
     */
    this.roaming = {
      timeout: GamePlayEntity.defaultRoaming.timeout,
      timeoutDelay:
        Game.gameSpeed * GamePlayEntity.defaultRoaming.timeoutDelayModifier,
      vectorMagnitude:
        Game.gameSpeed * GamePlayEntity.defaultRoaming.vectorMagnitudeModifier
    };
    /**
     * Types of statuses the GamePlayEntity can take.
     * @type {Object}
     */
    this.status = {
      ...GamePlayEntity.defaultStatus
    };
    /**
     * Types of resource points used by the GamePlayEntity.
     * @type {Object}
     */
    this.points = {
      ...GamePlayEntity.defaultPoints
    };
    /**
     * Types of GamePlayEntity.
     * @type {?string}
     */
    this.type = null;
  }

  /**
   * Load assets.
   * @param {{string}}
   */
  loadAssets = ({
    enemyImageSource,
    alliedImageSource,
    damagedImageSource
  }) => {
    if (enemyImageSource && this.faction === 0) {
      this.setDefaultImageSource(enemyImageSource);
    }
    if (alliedImageSource && this.faction === 1) {
      this.setDefaultImageSource(alliedImageSource);
    }
    if (damagedImageSource) {
      this.setDamagedImageSource(damagedImageSource);
    }
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Image source setter.
   * @param {string} newDefaultImage
   */
  setDefaultImageSource = newDefaultImage => {
    this.Images.defaultImage.src = newDefaultImage;
  };

  /**
   * Damaged image source setter.
   * @param {string} newDamagedImage
   */
  setDamagedImageSource = newDamagedImage => {
    this.Images.damagedImage.src = newDamagedImage;
  };

  /**
   * Faction status setter.
   * @param {number} newFaction
   */
  setFaction = newFaction => {
    this.faction = newFaction;
  };

  /**
   * alive status setter.
   * @param {boolean} newAliveStatus
   */
  setAliveStatus = newAliveStatus => {
    this.Status.alive = newAliveStatus;
  };

  /**
   * invincibility status setter.
   * @param {boolean} newInvincibleStatus
   */
  setInvincibleStatus = newInvincibleStatus => {
    this.Status.invincible = newInvincibleStatus;
  };

  /**
   * hit points setter.
   * @param {number} newHitPoints
   */
  setHitPoints = newHitPoints => {
    this.Points.hitPoints = newHitPoints;
  };

  /**
   * attack points setter.
   * @param {number} newAttackPoints
   */
  setAttackPoints = newAttackPoints => {
    this.Points.attackPoints = newAttackPoints;
  };

  /**
   * score points setter.
   * @param {number} newScorePoints
   */
  setScorePoints = newScorePoints => {
    this.Points.scorePoints = newScorePoints;
  };

  /**
   * type setter.
   * @param {string} newType
   */
  setType = newType => {
    this.Type = newType;
  };

  // ==========================================================================
  // Entity collision detection methods
  // ==========================================================================

  /**
   * actions to take on entity collision.
   * @param {*} entity
   */
  onGamePlayEntityCollision = entity => {
    // Skip if this entity instance dead or invincible.
    if (this.Status.alive && !this.Status.invincible) {
      // Take damage on this entity instance.
      this.Points.hitPoints -= entity.Points.attackPoints;
      // Die if hit points <= 0 on this entity instance.
      if (this.Points.hitPoints <= 0) {
        this.Status.alive = false;
      }
    }
    // Skip if entity instance dead or invincible.
    if (entity.Status.alive && !entity.Status.invincible) {
      // Do damage on entity instance.
      entity.Points.hitPoints -= this.Points.attackPoints;
      // Die if hit points <= 0 on entity instance.
      if (entity.Points.hitPoints <= 0) {
        entity.Status.alive = false;
      }
    }
  };

  /**
   * collision detection algorithm.
   * @param {number} thisEntIdx
   */
  hasGamePlayEntityCollidedGamePlayEntity = thisEntIdx => {
    let hasEntityCollided = false;
    // Cycle through entity collection.
    this.game.gameEntities.forEach((entity, entIdx) => {
      if (
        // Skip if this entity instance faction is the same as entity faction.
        this.faction !== entity.Faction &&
        // Skip if this entity instance type is bullet.
        !(this.Type instanceof BulletEntity) &&
        // Skip if this entity instance is invincible status is true.
        !this.Status.invincible &&
        // Skip if entity references itself.
        thisEntIdx !== entIdx &&
        // Skip if entity is does not have an entity type.
        !entity.Type &&
        // Skip if entity is dead.
        !entity.Status.alive
      ) {
        // Perform collision check.
        if (
          this.gameEntityPosition.x <
            entity.gameEntityPosition.x + entity.gameEntitySize.width &&
          this.gameEntityPosition.x + this.gameEntitySize.width >
            entity.gameEntityPosition.x &&
          this.gameEntityPosition.y <
            entity.gameEntityPosition.y + entity.gameEntitySize.height &&
          this.gameEntityPosition.y + this.gameEntitySize.height >
            entity.gameEntityPosition.y
        ) {
          // Take action on collision.
          this.onGamePlayEntityCollision(entity);
          // Set collided flag.
          hasEntityCollided = true;
        }
      }
    });
    return hasEntityCollided;
  };

  // ==========================================================================
  // Create explosion methods
  // ==========================================================================

  /**
   * create a damage explosion.
   * @param {{x: number, y: number}} position
   * @param {{width: number, height: number}} size
   */
  addGamePlayEntityDamageExplosionToGameEntities = (
    position = this.gameEntityPosition,
    size = this.gameEntitySize
  ) => {
    this.game.addToGameEntities(
      new DamageExplosion(this.game, { ...position }, { ...size })
    );
  };

  /**
   * create a destroy explosion.
   * @param {{x: number, y: number}} position
   * @param {{width: number, height: number}} size
   */
  addGamePlayEntityDestroyExplosionToGameEntities = (
    position = this.gameEntityPosition,
    size = this.gameEntitySize
  ) => {
    this.game.addToGameEntities(
      new DestroyExplosion(this.game, { ...position }, { ...size })
    );
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * draw actions taken on a game tick.
   * @param {HTMLElement=} image
   * @param {{x: number, y: number}=} position
   * @param {{width: number, height: number}=} size
   * @param {number=} degrees
   */
  onGamePlayEntityDrawImageTick = (
    image = this.Images.default,
    position = this.gameEntityPosition,
    size = this.gameEntitySize,
    degrees = Math.PI
  ) => {
    if (this.faction === 0) {
      this.game.gameCanvas.drawGameCanvasRotatedImage(
        image,
        position,
        size,
        degrees
      );
    }
    if (this.faction === 1) {
      this.game.gameCanvas.drawGameCanvasImage(image, position, size);
    }
  };

  /**
   * collision actions taken on a game tick.
   * @param {number} entIdx
   * @param {number=} DamagedImageDurationTimeoutDelay
   */
  onGamePlayEntityCollisionTick = (
    entIdx,
    DamagedImageDurationTimeoutDelay = this.DamagedImageDuration.timeoutDelay
  ) => {
    // On collision check true.
    if (
      !this.DamagedImageDuration.timeout &&
      this.hasGamePlayEntityCollidedGamePlayEntity(entIdx)
    ) {
      // Create a damage explosion.
      if (this.Status.alive) {
        this.addGamePlayEntityDamageExplosionToGameEntities();
      }
      // Flash damage image.
      this.setGameEntityImageSource(this.Images.damagedImage);
      // Restore default image after timeout.
      this.DamagedImageDuration.timeout = setTimeout(() => {
        this.setGameEntityImageSource(this.Images.defaultImage);
        this.disposeGamePlayEntityDamagedImageTimeout();
      }, DamagedImageDurationTimeoutDelay);
    }
  };

  /**
   * score actions taken on a game tick.
   */
  onGamePlayEntityScoreTick = () => {
    this.game.addToGameScore(this.Points.score);
  };

  // ==========================================================================
  // Dispose methods
  // ==========================================================================

  /**
   * dispose the damaged image timeout.
   */
  disposeGamePlayEntityDamagedImageTimeout = () => {
    clearTimeout(this.DamagedImageDuration.timeout);
    this.DamagedImageDuration.timeout = 0;
  };
}

export default GamePlayEntity;
