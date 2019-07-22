import GameEntity from '../GameEntity';

/**
 * A gameplay entity.
 */
class GameDisplayEntity extends GameEntity {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * Standard/default size of a display entity.
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
   * @constructor
   */
  constructor(game, { x, y }) {
    super(game, { x, y });
    /**
     * GameDisplayEntity status flag if immune to attack points.
     * Defaults to false.
     * @type {boolean}
     */
    this.invincibleStatus = true;
    this.init();
  }

  // ==========================================================================
  // Setter methods
  // ===========================================================================

  /**
   * Invincibility status setter.
   * @param {boolean} newInvincibleStatus
   */
  setInvincibleStatus = newInvincibleStatus => {
    this.invincibleStatus = newInvincibleStatus;
  };
}

export default GameDisplayEntity;
