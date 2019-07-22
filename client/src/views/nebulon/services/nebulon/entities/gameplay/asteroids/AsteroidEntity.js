import Game from '../../../game/Game';
import GamePlayEntity from '../GamePlayEntity';
import ExplosionDamage from '../../display/explosions/damage/DamageExplosion';
import DestroyExplosion from '../../display/explosions/destroy/DestroyExplosion';

/**
 * @abstract
 */
class AsteroidEntity extends GamePlayEntity {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * AsteroidEntity damaged image timeout delay modifier value on initial spawn.
   * @type {number}
   */
  static asteroidEntityDamagedImageTimeoutDelayModifierDefault = 200;

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
  constructor(game, { x, y }) {
    super(game, { x, y }, 0);
    /**
     * AsteroidEntity damaged image timeout.
     * Defaults to game speed * 50ms.
     * @type {number}
     */
    this.asteroidEntityDamagedImageTimeout = 0;
    /**
     * AsteroidEntity damaged image timeout delay relative to the game speed.
     * Defaults to game speed * 50ms.
     * @type {number}
     */
    this.asteroidEntityDamagedImageTimeoutDelay =
      Game.speed *
      AsteroidEntity.asteroidEntityDamagedImageTimeoutDelayModifierDefault;
  }

  /**
   * @override
   */
  loadAssets = (gamePlayEntityEnemyImageSrc, shipEntityDamagedImageSrc) => {
    this.setGamePlayEntityImageSource(gamePlayEntityEnemyImageSrc);
    this.setAsteroidEntityDamagedImageSource(shipEntityDamagedImageSrc);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * AsteroidEntity damaged image source setter.
   * @param {HTMLElement} newAsteroidEntityDamagedImageSource
   */
  setAsteroidEntityDamagedImageSource = newAsteroidEntityDamagedImageSource => {
    this.asteroidEntityDamagedImage.src = newAsteroidEntityDamagedImageSource;
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * AsteroidEntity collision actions taken on a game tick.
   * @param {number} entIdx
   */
  onAsteroidEntityCollisionTick = entIdx => {
    // On collision check true.
    if (
      !this.asteroidEntityDamagedImageTimeout &&
      this.hasGameEntityCollidedGameEntity(entIdx)
    ) {
      // Create a damage explosion.
      if (this.gamePlayEntityAliveStatus) {
        this.addGameEntityDamageExplosionToGameEntities();
      }
      // Flash damage image.
      this.setGamePlayEntityImageSource(this.asteroidEntityDamagedImage);
      // Restore original image after timeout.
      this.asteroidEntityDamagedImageTimeout = setTimeout(() => {
        this.setGamePlayEntityImageSource(this.gamePlayEntityEnemyImageSrc);
        this.disposeAsteroidEntityDamagedImageTimeout();
      }, this.asteroidEntityDamagedImageTimeoutDelay);
    }
  };

  /**
   * AsteroidEntity score actions taken on a game tick.
   */
  onAsteroidEntityScoreTick = () => {
    this.game.addToGameScore(this.gamePlayEntityScorePoints);
  };

  /**
   * @override
   */
  onTick = entIdx => {
    if (this.gamePlayEntityAliveStatus) {
      this.onDrawImageTick();
      this.onAsteroidEntityCollisionTick(entIdx);
    } else {
      // Dispose GameEntity intervals and timeouts.
      this.disposeGameEntityMoveInterval();
      // Dispose AsteroidEntity intervals and timeouts.
      this.disposeAsteroidEntityDamagedImageTimeout();
      // Add to Game score.
      this.onAsteroidEntityScoreTick();
      // Create the destroy explosion.
      this.addGameEntityDestroyExplosionToGameEntities();
      // Dispose GameEntity.
      this.disposeGameEntity(entIdx);
    }
  };

  // ==========================================================================
  // Dispose methods
  // ==========================================================================

  /**
   * AsteroidEntity dispose the damaged image timeout.
   */
  disposeAsteroidEntityDamagedImageTimeout = () => {
    clearTimeout(this.asteroidEntityDamagedImageTimeout);
    this.asteroidEntityDamagedImageTimeout = 0;
  };
}

export default AsteroidEntity;
