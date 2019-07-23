import GamePlayEntity from '../../GamePlayEntity';
import BulletEntity from '../BulletEntity';
import enemyImageSource from './assets/images/enemy-standard-bullet.png';
import alliedImageSource from './assets/images/allied-standard-bullet.png';

class StandardBullet extends BulletEntity {
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
    size = StandardBullet.defaultSize,
    faction,
    attackPoints,
    d
  ) => {
    // Set position.
    this.setPosition({ ...position });
    // Set size.
    this.setSize(size ? { ...size } : { ...BulletEntity.defaultSize });
    // Set faction
    this.setFaction(faction);
    // Set move vector magnitude.
    this.setMoveVectorMagnitude(
      StandardBullet.defaultMoveVectorMagnitudeModifier
    );
    // Set attack points.
    this.setAttackPoints(attackPoints);
    // Set type.
    this.setType(GamePlayEntity.types.BULLET);
    // Move in vector.
    this.moveInVector(d);
  };
}

export default StandardBullet;
