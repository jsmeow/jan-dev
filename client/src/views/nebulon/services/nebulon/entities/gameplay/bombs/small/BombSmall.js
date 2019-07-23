import Game from '../../../../game/Game';
import BombEntity from '../BombEntity';
import bombImageSrc from './assets/images/small-bomb.png';

/**
 * A bullet entity.
 */
class BombSmall extends BombEntity {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * Standard/default size of a small bomb.
   * @type {{width: number, height: number}}
   */
  static defaultSize = {
    width: 4,
    height: 4
  };

  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number} x
   * @param {number} y
   * @param {number} factionStatus
   * @param {number} attack
   * @param {*} step
   * @constructor
   */
  constructor(game, { x, y }, factionStatus, attack, step) {
    super(game, { x, y }, factionStatus, attack, step);
    /**
     * BombEntity image source.
     * To be implemented by the extending class.
     * @type {HTMLElement}
     */
    this.bombImageSrc = bombImageSrc;
    this.init(attack, step);
  }

  /**
   * @override
   */
  init = (attack, step) => {
    this.setGameEntityImageSource();
    this.setGameEntitySize({
      width: 4,
      height: 4
    });
    this.setEntityType('bomb');
    this.setGameEntitySpeed(Game.speed / 30);
    this.setInvincibleStatus(true);
    this.setAttackPoints(attack * 2);
    this.moveDirection(step);
  };
}

export default BombSmall;
