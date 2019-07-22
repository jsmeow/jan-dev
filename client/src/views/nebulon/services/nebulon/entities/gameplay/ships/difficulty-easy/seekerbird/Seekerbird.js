import GamePlayEntity from '../../../GamePlayEntity';
import ShipEntity from '../../ShipEntity';
import enemyImageSrc from './assets/images/enemy-seekerbird.png';
import alliedImageSrc from './assets/images/allied-seekerbird.png';
import damagedImageSrc from './assets/images/damaged-seekerbird.png';

class Seekerbird extends ShipEntity {
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
    super(game, { x, y }, factionStatus);
    /**
     * @override
     */
    this.enemyImageSrc = enemyImageSrc;
    /**
     * @override
     */
    this.alliedImageSrc = alliedImageSrc;
    /**
     * @override
     */
    this.damagedImageSrc = damagedImageSrc;
    this.init();
    /**
     * Seekerbird player entity position reference.
     * @see GameEntity.position
     */
    this.playerEntityPosition = null;
    /**
     * Seekerbird status flag is player entity position is current.
     * @see GameEntity.position
     */
    this.isPlayerEntityPositionCurrentStatus = false;
  }

  /**
   * @override
   */
  init = () => {
    this.setGameEntityImageSource();
    this.setGameEntitySize({ ...GamePlayEntity.defaultSize });
    this.setHitPoints(2);
    this.setScorePoints(2);
    this.setFiringStatus(true);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Current player entity position status flag setter.
   * @param {boolean} newIsPlayerEntityPositionCurrentStatus
   */
  setIsPlayerEntityPositionCurrentStatus = newIsPlayerEntityPositionCurrentStatus => {
    this.isPlayerEntityPositionCurrentStatus = newIsPlayerEntityPositionCurrentStatus;
  };

  // ==========================================================================
  // Util methods
  // ==========================================================================

  /**
   * Get the current player entity position.
   */
  getPlayerEntityPosition = () => {
    this.playerEntityPosition = { ...this.game.gamePlayer.position };
  };

  // ==========================================================================
  // Roaming methods
  // ==========================================================================

  /**
   * @override
   */
  roamWildly = () => {
    this.setFiringStatus(false);
    return this.movePath([
      {
        x: this.playerEntityPosition.x,
        y: this.playerEntityPosition.y
      }
    ]).then(() => {
      this.setFiringStatus(true);
      this.setIsPlayerEntityPositionCurrentStatus(false);
      return Promise.resolve();
    });
  };

  /**
   * @override
   */
  roamInPlace = () => {
    return new Promise(resolve => {
      if (!this.isPlayerEntityPositionCurrentStatus) {
        // Store player position.
        this.getPlayerEntityPosition();
        this.setIsPlayerEntityPositionCurrentStatus(true);
        // Wait before seeking.
        setTimeout(() => {
          resolve();
        }, 2000);
      }
    });
  };

  // ==========================================================================
  // Bullet methods
  // ==========================================================================

  /**
   * @override
   */
  createBullets = () => {
    this.createStandardBullet();
  };
}

export default Seekerbird;
