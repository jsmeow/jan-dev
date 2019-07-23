import Game from '../game/Game';
import GameCanvas from '../game/canvas/GameCanvas';

/**
 * @abstract
 */
class GameEntity {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * @see GameEntity.vector
   */
  static defaultVector = {
    interval: 0,
    intervalDelay: 10
  };

  /**
   * @see GameEntity.type
   */
  static types = {
    SHIP: 0,
    BULLET: 1,
    BOMB: 2,
    ASTEROID: 3,
    EXPLOSION: 4
  };

  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {Object=}
   * @constructor
   */
  constructor(game, { x, y, width, height, vector }) {
    /**
     * @see Game
     */
    this.game = game;
    /**
     * Entity position.
     * @type {Object}
     */
    this.position = {
      x,
      y
    };
    /**
     * Entity size.
     * @type {Object}
     */
    this.size = {
      width,
      height
    };
    /**
     * Vector interval, interval delay, magnitude and direction.
     * @type {Object}
     */
    this.vector = {
      ...GameEntity.defaultVector,
      ...vector
    };
    /**
     * Type of entity.
     * @type {?string}
     */
    this.type = null;
  }

  /**
   * To be implemented by the extending class.
   */
  init = () => {
    // Implementation.
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * @see GameEntity.position
   */
  setPosition = newPosition => {
    this.position = newPosition;
  };

  /**
   * @see GameEntity.size
   */
  setSize = newSize => {
    this.size = newSize;
  };

  /**
   * @see GameEntity.vector.intervalDelay
   */
  setVectorIntervalDelay = newIntervalDelay => {
    this.vector.intervalDelay = newIntervalDelay;
  };

  /**
   * @see GameEntity.vector
   */
  setVector = newVector => {
    this.vector = { ...newVector };
  };

  // ==========================================================================
  // Boundary collision detection methods
  // ==========================================================================

  /**
   * Entity left boundary collision detection.
   * @returns {boolean}
   */
  willCollideLeftBoundary = () => {
    if (this.vector.left) {
      return this.position.x + this.vector.left <= 0;
    }
    return false;
  };

  /**
   * Entity right boundary collision detection.
   * @returns {boolean}
   */
  willCollideRightBoundary = () => {
    if (this.vector.right) {
      return (
        this.position.x + this.vector.right >=
        GameCanvas.size.width - this.size.width
      );
    }
    return false;
  };

  /**
   * Entity top boundary collision detection.
   * @returns {boolean}
   */
  willCollideTopBoundary = () => {
    if (this.vector.up) {
      return this.position.y + this.vector.up <= 0;
    }
    return false;
  };

  /**
   * Entity bottom boundary collision detection.
   * @returns {boolean}
   */
  willCollideBottomBoundary = () => {
    if (this.vector.down) {
      return (
        this.position.y + this.vector.down >=
        GameCanvas.size.height - this.size.height
      );
    }
    return false;
  };

  // ==========================================================================
  // Move in vector methods
  // ==========================================================================

  /**
   * Move entity in a left vector.
   */
  moveInLeftVector = (vectorMagnitude = 0) => {
    this.position.x = this.position.x - Game.speed * vectorMagnitude;
  };

  /**
   * Move entity in a right vector.
   */
  moveInRightVector = (vectorMagnitude = 0) => {
    this.position.x = this.position.x + Game.speed * vectorMagnitude;
  };

  /**
   * Move entity in an up vector.
   */
  moveInUpVector = (vectorMagnitude = 0) => {
    this.position.y = this.position.y - Game.speed * vectorMagnitude;
  };

  /**
   * Move entity in a down vector.
   */
  moveInDownVector = (vectorMagnitude = 0) => {
    this.position.y = this.position.y + Game.speed * vectorMagnitude;
  };

  /**
   * Move entity in a vector.
   * @param {Object} vector
   * @param {number=} vectorIntervalDelay
   */
  moveInVector = (
    vector = this.vector,
    vectorIntervalDelay = this.vector.intervalDelay
  ) => {
    // Start moving in a vector at an interval.
    this.vector.interval = setInterval(() => {
      this.moveInLeftVector(vector.left);
      this.moveInRightVector(vector.right);
      this.moveInUpVector(vector.up);
      this.moveInDownVector(vector.down);
    }, Game.speed * vectorIntervalDelay);
  };

  /**
   * Move entity in a vector to a point.
   * @param {Object}
   * @param {Object} vector
   * @param {number=} vectorIntervalDelay
   * @return {Promise}
   */
  moveInVectorToPoint = (
    { x, y },
    vector = this.vector,
    vectorIntervalDelay = this.vector.intervalDelay
  ) => {
    return new Promise(resolve => {
      if (!this.vector.interval) {
        // Flags if vector has magnitude in a cardinal direction.
        let willMoveInLeftVector = true;
        let willMoveInRightVector = true;
        let willMoveInUpVector = true;
        let willMoveInDownVector = true;
        // Begin moving in a vector.
        this.vector.interval = setInterval(() => {
          if (x < this.position.x) {
            this.moveInLeftVector(vector.left);
          } else {
            willMoveInLeftVector = false;
          }
          if (x > this.position.x) {
            this.moveInRightVector(vector.right);
          } else {
            willMoveInRightVector = false;
          }
          if (y < this.position.y) {
            this.moveInUpVector(vector.up);
          } else {
            willMoveInUpVector = false;
          }
          if (y > this.position.y) {
            this.moveInDownVector(vector.down);
          } else {
            willMoveInDownVector = false;
          }
          if (
            !willMoveInLeftVector &&
            !willMoveInRightVector &&
            !willMoveInUpVector &&
            !willMoveInDownVector
          ) {
            resolve();
          }
        }, Game.speed * vectorIntervalDelay);
      }
    }).then(() => {
      this.disposeVectorInterval();
      return Promise.resolve();
    });
  };

  /**
   * Move entity in a vector to a path.
   * @param {Array} path
   * @return {Promise}
   */
  moveInVectorPath = path => {
    return path.reduce((previousPromise, currentPath) => {
      return previousPromise.then(() => {
        return this.moveInVectorToPoint({ ...currentPath });
      });
    }, Promise.resolve());
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * Dispose action taken on a game tick.
   * To be implemented by the extending class.
   * @param {number} entIdx
   */
  onDisposeTick = entIdx => {
    // Implementation.
  };

  /**
   * Entity actions taken on a game tick.
   * To be implemented by the extending class.
   * @param {number} entIdx
   */
  onTick = entIdx => {
    // Implementation.
  };

  // ==========================================================================
  // Dispose methods
  // ==========================================================================

  /**
   * Dispose entity move vector interval.
   */
  disposeVectorInterval = () => {
    clearInterval(this.vector.interval);
    this.vector.interval = 0;
  };
}

export default GameEntity;
