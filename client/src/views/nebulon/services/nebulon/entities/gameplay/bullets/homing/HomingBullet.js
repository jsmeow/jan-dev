import Game from '../../../../game/Game';
import BulletEntity from '../BulletEntity';
import gamePlayEntityEnemyImageSrc from '../standard/assets/images/enemy-standard-bullet.png';
import gamePlayEntityAlliedImageSrc from '../standard/assets/images/allied-standard-bullet.png';

class HomingBullet extends BulletEntity {
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
    this.loadAssets(gamePlayEntityEnemyImageSrc, gamePlayEntityAlliedImageSrc);
    this.init(bulletSpawnPosition, attackPoints, d);
  }

  init = (attackPoints, d) => {
    this.setEntityType('bullet');
    this.setGameEntitySize({
      width: 1,
      height: 1
    });
    this.setGameEntitySpeed(
      Game.gameSpeed * BulletEntity.bulletEntitySpeedModifierDefault
    );
    this.setGamePlayEntityAttackPoints(attackPoints);
    this.moveGameEntityDirection(d);
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
      moveDirections.left && this.moveGameEntitySpeedUnitLeft(dx);
      moveDirections.right && this.moveSpeedUnitRight(dx);
      moveDirections.up && this.moveSpeedUnitUp(dy);
      moveDirections.down && this.moveSpeedUnitDown(dy);
    }, this.moveIntervalDelay);
  };
}

export default HomingBullet;
