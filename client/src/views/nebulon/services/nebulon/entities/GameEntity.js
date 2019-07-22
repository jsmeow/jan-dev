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
   * @see GameEntity.position
   */
  static defaultPosition = {
    x: 0,
    y: 0
  };

  /**
   * @see GameEntity.size
   */
  static defaultSize = {
    width: 0,
    height: 0
  };

  /**
   * @see GameEntity.moveVector
   */
  static defaultMoveVector = {
    interval: 0,
    intervalDelayModifier: 10,
    magnitudeModifier: 0
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
   * @param {number=} d
   * @constructor
   */
  constructor(game, { x, y }, { width, height }, d) {
    /**
     * @see Game
     */
    this.game = game;
    /**
     * GameEntity position.
     * @type {Object}
     */
    this.position = {
      x: x || GameEntity.defaultPosition.x,
      y: y || GameEntity.defaultPosition.y
    };
    /**
     * GameEntity size.
     * @type {Object}
     */
    this.size = {
      width: width || GameEntity.defaultSize.width,
      height: height || GameEntity.defaultSize.height
    };
    /**
     * GameEntity move vector interval reference.
     * GameEntity move interval delay modifier value.
     * GameEntity move vector magnitude value.
     * @type {Object}
     */
    this.moveVector = {
      interval: GameEntity.defaultMoveVector.interval,
      intervalDelay:
        Game.speed * GameEntity.defaultMoveVector.intervalDelayModifier,
      magnitude:
        d || Game.speed * GameEntity.defaultMoveVector.magnitudeModifier
    };
  }

  /**
   * Initializer to be implemented by the extending class.
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
  setPosition = ({ x = this.position.x, y = this.position.y }) => {
    this.position = { x, y };
  };

  /**
   * @see GameEntity.size
   */
  setSize = ({ width = this.size.width, height = this.size.height }) => {
    this.size = { width, height };
  };

  /**
   * @see GameEntity.moveVector.intervalDelay
   */
  setMoveVectorIntervalDelay = intervalDelayModifier => {
    this.moveVector.intervalDelay = Game.speed * intervalDelayModifier;
  };

  /**
   * @see GameEntity.moveVector.magnitude
   */
  setMoveVectorMagnitude = magnitudeModifier => {
    this.moveVector.magnitude = Game.speed * magnitudeModifier;
  };

  // ==========================================================================
  // Boundary collision detection methods
  // ==========================================================================

  /**
   * GameEntity left boundary collision detection.
   * @param {number=} dx
   * @returns {boolean}
   */
  hasCollidedLeftBoundary = (dx = 0) => {
    return this.position.x + dx <= 0;
  };

  /**
   * GameEntity right boundary collision detection.
   * @param {number=} dx
   * @returns {boolean}
   */
  hasCollidedRightBoundary = (dx = 0) => {
    return this.position.x + dx >= GameCanvas.size.width - this.size.width;
  };

  /**
   * GameEntity top boundary collision detection.
   * @param {number=} dy
   * @returns {boolean}
   */
  hasCollidedTopBoundary = (dy = 0) => {
    return this.position.y + dy <= 0;
  };

  /**
   * GameEntity bottom boundary collision detection.
   * @param {number=} dy
   * @returns {boolean}
   */
  hasCollidedBottomBoundary = (dy = 0) => {
    return this.position.y + dy >= GameCanvas.size.height - this.size.height;
  };

  // ==========================================================================
  // Move vector methods
  // ==========================================================================

  /**
   * Move GameEntity in a left vector + change in x.
   * @param {number=} dx
   */
  moveVectorLeft = (dx = 0) => {
    this.position.x = this.position.x - this.moveVector.magnitude - dx;
  };

  /**
   * Move GameEntity in a right vector + change in x.
   * @param {number=} dx
   */
  moveVectorRight = (dx = 0) => {
    this.position.x = this.position.x + this.moveVector.magnitude + dx;
  };

  /**
   * Move GameEntity in a up vector + change in y.
   * @param {number=} dy
   */
  moveVectorUp = (dy = 0) => {
    this.position.y = this.position.y - this.moveVector.magnitude - dy;
  };

  /**
   * Move GameEntity in a down vector + change in y.
   * @param {number=} dy
   */
  moveVectorDown = (dy = 0) => {
    this.position.y = this.position.y + this.moveVector.magnitude + dy;
  };

  /**
   * Move GameEntity in a vector, modified by a change in d.
   * @param {Object=}
   * @param {number=} moveVectorIntervalDelay
   */
  moveVector = (
    { leftDx = 0, rightDx = 0, upDy = 0, downDy = 0 },
    moveVectorIntervalDelay = this.moveVector.intervalDelay
  ) => {
    // Start move in a vector interval.
    this.moveVector.interval = setInterval(() => {
      if (leftDx) {
        this.moveVectorLeft(leftDx);
      }
      if (rightDx) {
        this.moveVectorRight(rightDx);
      }
      if (upDy) {
        this.moveVectorUp(upDy);
      }
      if (downDy) {
        this.moveVectorDown(downDy);
      }
    }, moveVectorIntervalDelay);
  };

  // ==========================================================================
  // Move vector to a point methods
  // ==========================================================================

  /**
   * Move GameEntity in a vector to a point, modified by a change in d.
   * @param {Object}
   * @param {Object=}
   * @param {number=} moveVectorIntervalDelay
   * @return {Promise}
   */
  moveVectorTo = (
    { x, y },
    { leftDx = 0, rightDx = 0, upDy = 0, downDy = 0 } = {},
    moveVectorIntervalDelay = this.moveVector.intervalDelay
  ) => {
    // Flags if vector has magnitude in a cardinal direction.
    let willMoveVectorLeft = false;
    let willMoveVectorRight = false;
    let willMoveVectorUp = false;
    let willMoveVectorDown = false;
    // Stop move left vector validation.
    const stopMoveLeftVector = () => {
      return x > this.position.x - 0.1;
    };
    // Stop move right vector validation.
    const stopMoveRightVector = () => {
      return x < this.position.x + 0.1;
    };
    // Stop move up vector validation.
    const stopMoveUpVector = () => {
      return y > this.position.y - 0.1;
    };
    // Stop move down vector validation.
    const stopMoveDownVector = () => {
      return y < this.position.y + 0.1;
    };
    // Begin moving in a vector.
    const startMoveVectorTo = resolve => {
      this.moveVector.interval = setInterval(() => {
        if (!willMoveVectorLeft && !stopMoveLeftVector()) {
          this.moveVectorLeft(leftDx);
        } else {
          willMoveVectorLeft = true;
        }
        if (!willMoveVectorRight && !stopMoveRightVector()) {
          this.moveVectorRight(rightDx);
        } else {
          willMoveVectorRight = true;
        }
        if (!willMoveVectorUp && !stopMoveUpVector()) {
          this.moveVectorUp(upDy);
        } else {
          willMoveVectorUp = true;
        }
        if (!willMoveVectorDown && !stopMoveDownVector()) {
          this.moveVectorDown(downDy);
        } else {
          willMoveVectorDown = true;
        }
        if (
          willMoveVectorLeft &&
          willMoveVectorRight &&
          willMoveVectorUp &&
          willMoveVectorDown
        ) {
          this.disposeMoveVectorInterval();
          resolve();
        }
      }, moveVectorIntervalDelay);
    };
    return new Promise(resolve => {
      if (!this.moveVector.interval) {
        startMoveVectorTo(resolve);
      }
    }).then(() => {
      this.disposeMoveVectorInterval();
      return Promise.resolve();
    });
  };

  // ==========================================================================
  // Move through a vector path methods
  // ==========================================================================

  /**
   * Move GameEntity through a vector path of in the order given.
   * @param {Object[]} path
   * @param {Object=} d
   * @return {Promise}
   */
  moveVectorPath = (path, d) => {
    return path.reduce((previousPromise, currentPath) => {
      return previousPromise.then(() => {
        const { x, y } = currentPath;
        return this.moveVectorTo({ x, y }, d);
      });
    }, Promise.resolve());
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * GameEntity actions taken on a game tick.
   * To be implemented by the extending class.
   * @param {number} entIdx
   * @return {*}
   */
  onTick = entIdx => {
    // Implementation.
  };

  // ==========================================================================
  // Dispose methods
  // ==========================================================================

  /**
   * Dispose GameEntity move vector interval.
   */
  disposeMoveVectorInterval = () => {
    clearInterval(this.moveVector.interval);
    this.moveVector.interval = 0;
  };
}

export default GameEntity;
