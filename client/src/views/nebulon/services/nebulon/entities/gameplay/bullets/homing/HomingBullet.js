import GamePlayEntity from '../../GamePlayEntity';
import BulletEntity from '../BulletEntity';
import enemyImageSource from './assets/images/enemy-homing-bullet.png';
import alliedImageSource from './assets/images/allied-homing-bullet.png';

class HomingBullet extends BulletEntity {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * @see GameEntity.size
   */
  static defaultSize = {
    width: 1,
    height: 1
  };

  static defaultMoveVectorMagnitudeModifier = 0.1;

  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {Object}
   * @constructor
   * @abstract
   */
  constructor(game, { position, size, faction, attackPoints, d }) {
    super(game, { position, size, faction, attackPoints, d });
    this.loadAssets({
      enemyImageSource,
      alliedImageSource
    });
    this.init(position, size, faction, attackPoints, d);
  }

  /**
   * @override
   */
  init = (
    position,
    size = HomingBullet.defaultSize,
    faction,
    attackPoints,
    d
  ) => {
    // Set position.
    this.setPosition({ ...position });
    // Set size.
    this.setSize({ ...size });
    // Set faction
    this.setFaction(faction);
    // Set move vector magnitude.
    this.setMoveVectorMagnitude(
      HomingBullet.defaultMoveVectorMagnitudeModifier
    );
    // Set attack points.
    this.setAttackPoints(attackPoints);
    // Set type.
    this.setType(GamePlayEntity.types.BULLET);
    // Move in vector.
    this.moveInVector(d);
  };

  // ==========================================================================
  // Move vector methods
  // ==========================================================================

  /**
   * Determine which vector direction the bullet vector will travel.
   * @param {Object} entityPosition
   * @param {Object} bulletPosition
   * @return {Object}
   */
  getMoveDirections = (entityPosition, bulletPosition) => {
    return {
      left: entityPosition.x < bulletPosition.x,
      right: entityPosition.x > bulletPosition.x,
      up: entityPosition.y < bulletPosition.y,
      down: entityPosition.y > bulletPosition.y
    };
  };

  /**
   * Get the movement change in x.
   * @param {{x: number, y: number}} entityPosition
   * @param {{x: number, y: number}} bulletPosition
   * @param d {number}
   * @return {number}
   */
  getMoveDx = (entityPosition, bulletPosition, d) => {
    const moveVectorMagnitude = Game.speed * d;
    return (
      (moveVectorMagnitude - Math.abs(bulletPosition.y - entityPosition.x)) /
      (moveVectorMagnitude - Math.abs(entityPosition.y + bulletPosition.x))
    );
  };

  /**
   * Get the movement change in y.
   * @param {{x: number, y: number}} entityPosition
   * @param {{x: number, y: number}} bulletPosition
   * @param d {number}
   * @return {number}
   */
  getMoveDy = (entityPosition, bulletPosition, d) => {
    const constant = Game.speed * d;
    return (
      (constant - Math.abs(entityPosition.y - bulletPosition.x)) /
      (constant - Math.abs(entityPosition.y + bulletPosition.x))
    );
  };

  // ==========================================================================
  // Move in a direction methods
  // ==========================================================================

  /**
   * @override
   */
  moveDirection = (bulletPosition, d) => {
    /**
     * @type  {{x: number, y: number}} entityPosition
     */
    const entityPosition = { ...this.game.gamePlayer.position };
    const moveDirections = this.getMoveDirections(
      entityPosition,
      bulletPosition
    );
    const dx = this.getMoveDx(entityPosition, bulletPosition, d);
    const dy = this.getMoveDy(entityPosition, bulletPosition, d);
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
