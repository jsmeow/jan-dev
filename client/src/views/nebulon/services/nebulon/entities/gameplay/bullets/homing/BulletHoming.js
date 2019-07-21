import Game from '../../../../game/Game';
import BulletEntity from '../BulletEntity';
import enemyImageSrc from './assets/images/enemy-homing-bullet.png';
import alliedImageSrc from './assets/images/allied-homing-bullet.png';

class BulletHoming extends BulletEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {{x: number, y: number}} bulletSpawnPosition
   * @param {number} factionStatus
   * @param {number} attackPoints
   * @param {number=} d
   * @constructor
   */
  constructor(game, bulletSpawnPosition, factionStatus, attackPoints, d) {
    super(game, bulletSpawnPosition, factionStatus, attackPoints, {});
    /**
     * @override
     */
    this.enemyImageSrc = enemyImageSrc;
    /**
     * @override
     */
    this.alliedImageSrc = alliedImageSrc;
    this.init(bulletSpawnPosition, attackPoints, d);
  }

  /**
   * @override
   */
  init = (bulletSpawnPosition, attackPoints, d) => {
    this.setImageSource();
    this.setSize({
      width: 1,
      height: 1
    });
    this.setEntityType('bullet');
    this.setSpeed(Game.speed / 30);
    this.setHitPoints(1);
    this.setAttackPoints(attackPoints);
    this.moveDirection(bulletSpawnPosition, d);
  };

  // ==========================================================================
  // Get methods
  // ==========================================================================

  /**
   * Determine which cardinal direction positions the bullet vector will travel.
   * @param {{x: number, y: number}} playerEntityPosition
   * @param {{x: number, y: number}} bulletSpawnPosition
   * @return {{left: boolean, right: boolean, up: boolean, down: boolean}}
   */
  getMoveDirections = (playerEntityPosition, bulletSpawnPosition) => {
    return {
      left: playerEntityPosition.x < bulletSpawnPosition.x,
      right: playerEntityPosition.x > bulletSpawnPosition.x,
      up: playerEntityPosition.y < bulletSpawnPosition.y,
      down: playerEntityPosition.y > bulletSpawnPosition.y
    };
  };

  /**
   * Get the movement change in x.
   * @param {{x: number, y: number}} playerEntityPosition
   * @param {{x: number, y: number}} bulletSpawnPosition
   * @param d {number}
   * @return {number}
   */
  getMoveDx = (playerEntityPosition, bulletSpawnPosition, d) => {
    const constant = Game.speed * d;
    return (
      (constant - Math.abs(bulletSpawnPosition.y - playerEntityPosition.x)) /
      (constant - Math.abs(playerEntityPosition.y + bulletSpawnPosition.x))
    );
  };

  /**
   * Get the movement change in y.
   * @param {{x: number, y: number}} playerEntityPosition
   * @param {{x: number, y: number}} bulletSpawnPosition
   * @param d {number}
   * @return {number}
   */
  getMoveDy = (playerEntityPosition, bulletSpawnPosition, d) => {
    const constant = Game.speed * d;
    return (
      (constant - Math.abs(playerEntityPosition.y - bulletSpawnPosition.x)) /
      (constant - Math.abs(playerEntityPosition.y + bulletSpawnPosition.x))
    );
  };

  // ==========================================================================
  // Move in a direction methods
  // ==========================================================================

  /**
   * @override
   */
  moveDirection = (bulletSpawnPosition, d) => {
    /**
     * @type  {{x: number, y: number}} playerEntityPosition
     */
    const playerEntityPosition = { ...this.game.gamePlayer.position };
    const moveDirections = this.getMoveDirections(
      playerEntityPosition,
      bulletSpawnPosition
    );
    const dx = this.getMoveDx(playerEntityPosition, bulletSpawnPosition, d);
    const dy = this.getMoveDy(playerEntityPosition, bulletSpawnPosition, d);
    console.log(dx);
    // Start move setInterval.
    this.moveInterval = setInterval(() => {
      moveDirections.left && this.moveSpeedUnitLeft(dx);
      moveDirections.right && this.moveSpeedUnitRight(dx);
      moveDirections.up && this.moveSpeedUnitUp(dy);
      moveDirections.down && this.moveSpeedUnitDown(dy);
    }, this.moveIntervalDelay);
  };
}

export default BulletHoming;
