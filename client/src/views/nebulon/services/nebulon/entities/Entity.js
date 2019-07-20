import Game from '../game/Game';
import GameCanvas from '../game/canvas/GameCanvas';

/**
 * A game entity.
 */
class Entity {
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
    /**
     * @see Game
     */
    this.game = game;
    /**
     * Entity image HTMLElement.
     * @type {HTMLElement}
     */
    this.image = new Image();
    /**
     * Entity position.
     * @type {{x: number, y: number}}
     */
    this.position = {
      x,
      y
    };
    /**
     * Entity size.
     * To be implemented by the extending class.
     * @type {{width: number, height: number}}
     */
    this.size = {};
    /**
     * Entity speed relative to the game speed.
     * @type {number}
     */
    this.speed = Game.speed / 10;
    /**
     * Entity move interval reference.
     * @type {number}
     */
    this.moveInterval = 0;
    /**
     * Entity move setInterval delay relative to the game speed.
     * @type {number}
     */
    this.moveIntervalDelay = Game.speed / 0.1;
    this.init();
  }

  /**
   * Initializer.
   */
  init = () => {
    this.setImageSource(this.image);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Image source setter.
   * @param {HTMLElement} newImageSource
   */
  setImageSource = newImageSource => {
    this.image.src = newImageSource;
  };

  /**
   * Position setter.
   * @param {{x: number, y: number}} newPosition
   */
  setPosition = newPosition => {
    this.position = { ...newPosition };
  };

  /**
   * Size setter.
   * @param {{width: number, height: number}} newSize
   */
  setSize = newSize => {
    this.size = { ...newSize };
  };

  /**
   * Speed setter.
   * @param {number} newSpeed
   */
  setSpeed = newSpeed => {
    this.speed = newSpeed;
  };

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  /**
   * Draw image.
   */
  drawImage = () => {
    this.game.gameCanvas.context.drawImage(
      this.image,
      this.position.x * this.game.gameCanvas.unit,
      this.position.y * this.game.gameCanvas.unit,
      this.size.width * this.game.gameCanvas.unit,
      this.size.height * this.game.gameCanvas.unit
    );
  };

  /**
   * Draw rotated image.
   * @param {number} degrees
   */
  drawRotatedImage = degrees => {
    this.game.gameCanvas.context.save();
    this.game.gameCanvas.context.rotate(degrees);
    this.game.gameCanvas.context.drawImage(
      this.image,
      -this.position.x * this.game.gameCanvas.unit,
      -this.position.y * this.game.gameCanvas.unit,
      -this.size.width * this.game.gameCanvas.unit,
      -this.size.height * this.game.gameCanvas.unit
    );
    this.game.gameCanvas.context.restore();
  };

  // ==========================================================================
  // Boundary collision detection methods
  // ==========================================================================

  /**
   * Left boundary collision detection.
   * @param {number=} dx
   * @returns {boolean}
   */
  hasCollidedLeftBoundary = dx => {
    return this.position.x + dx <= 0;
  };

  /**
   * Right boundary collision detection.
   * @param {number=} dx
   * @returns {boolean}
   */
  hasCollidedRightBoundary = dx => {
    return this.position.x + dx >= GameCanvas.size.width - this.size.width;
  };

  /**
   * Top boundary collision detection.
   * @param {number=} dy
   * @returns {boolean}
   */
  hasCollidedTopBoundary = dy => {
    return this.position.y + dy <= 0;
  };

  /**
   * Bottom boundary collision detection.
   * @param {number=} dy
   * @returns {boolean}
   */
  hasCollidedBottomBoundary = dy => {
    return this.position.y + dy >= GameCanvas.size.height - this.size.height;
  };

  // ==========================================================================
  // Point collision detection methods
  // ==========================================================================

  /**
   * Point collision if point is on the left of the entity.
   * @param {number} x
   * @returns {boolean}
   */
  hasCollidedLeftwardPoint = x => {
    // return x.toFixed(2) >= this.position.x.toFixed(2);
    // return x > this.position.x;
    return x > this.position.x - 0.1;
  };

  /**
   * Point collision if point is on the right of the entity.
   * @param {number} x
   * @returns {boolean}
   */
  hasCollidedRightwardPoint = x => {
    // return x.toFixed(2) <= this.position.x.toFixed(2);
    return x < this.position.x + 0.1;
  };

  /**
   * Point collision if point is above the entity.
   * @param {number} y
   * @returns {boolean}
   */
  hasCollidedUpwardPoint = y => {
    // return y.toFixed(2) >= this.position.y.toFixed(2);
    return y > this.position.y - 0.1;
  };

  /**
   * Point collision if point is below the entity.
   * @param {number} y
   * @returns {boolean}
   */
  hasCollidedDownwardPoint = y => {
    // return y.toFixed(2) <= this.position.y.toFixed(2);
    return y < this.position.y + 0.1;
  };

  // ==========================================================================
  // Entity collision detection methods
  // ==========================================================================

  /**
   * Actions to take on entity collision.
   * To be implemented by the extending class.
   * @param {*} entity
   * @return {*}
   */
  onEntityCollision = entity => {
    return entity;
  };

  /**
   * Entity collision detection.
   * @param {number} thisEntIdx
   * @returns {boolean}
   */
  hasCollidedEntity = thisEntIdx => {
    let hasCollided = false;
    // Cycle through entity collection.
    this.game.entities.forEach((entity, entIdx) => {
      // Skip if it references itself.
      if (thisEntIdx !== entIdx) {
        if (
          this.position.x < entity.position.x + entity.size.width &&
          this.position.x + this.size.width > entity.position.x &&
          this.position.y < entity.position.y + entity.size.height &&
          this.position.y + this.size.height > entity.position.y
        ) {
          // Take action on collision.
          this.onEntityCollision(entity);
          // Set collided flag.
          hasCollided = true;
        }
      }
    });
    return hasCollided;
  };

  // ==========================================================================
  // Move a speed unit step methods
  // ==========================================================================

  /**
   * Move a speed unit step left + change in x.
   * @param {number=} dxLeft
   */
  moveSpeedUnitLeft = (dxLeft = 0) => {
    this.position.x = this.position.x - this.speed - dxLeft;
  };

  /**
   * Move a speed unit step right + change in x.
   * @param {number=} dxRight
   */
  moveSpeedUnitRight = (dxRight = 0) => {
    this.position.x = this.position.x + this.speed + dxRight;
  };

  /**
   * Move a speed unit step up + change in y.
   * @param {number=} dyUp
   */
  moveSpeedUnitUp = (dyUp = 0) => {
    this.position.y = this.position.y - this.speed - dyUp;
  };

  /**
   * Move a speed unit step down + change in y.
   * @param {number=} dyDown
   */
  moveSpeedUnitDown = (dyDown = 0) => {
    this.position.y = this.position.y + this.speed + dyDown;
  };

  // ==========================================================================
  // Move in a direction methods
  // ==========================================================================

  /**
   * Move in a direction, modified by a speed unit step.
   * @param {number|*=} dxLeft
   * @param {number|*=} dxRight
   * @param {number|*=} dyUp
   * @param {number|*=} dyDown
   */
  moveDirection = ({ dxLeft = 0, dxRight = 0, dyUp = 0, dyDown = 0 }) => {
    // Start move setInterval.
    this.moveInterval = setInterval(() => {
      dxLeft && this.moveSpeedUnitLeft(dxLeft);
      dxRight && this.moveSpeedUnitRight(dxRight);
      dyUp && this.moveSpeedUnitUp(dyUp);
      dyDown && this.moveSpeedUnitDown(dyDown);
    }, this.moveIntervalDelay);
  };

  // ==========================================================================
  // Move to a point methods
  // ==========================================================================

  /**
   * Move to a point, modified by a speed unit step.
   * @param {number} x
   * @param {number} y
   * @param {number|*=} dxLeft
   * @param {number|*=} dxRight
   * @param {number|*=} dyUp
   * @param {number|*=} dyDown
   * @return {Promise<any>}
   */
  moveTo = (
    { x, y },
    { dxLeft = 0, dxRight = 0, dyUp = 0, dyDown = 0 } = {}
  ) => {
    let collidedLeft = false;
    let collidedRight = false;
    let collidedUp = false;
    let collidedDown = false;
    const startMoveTo = resolve => {
      this.moveInterval = setInterval(() => {
        if (!collidedLeft && !this.hasCollidedLeftwardPoint(x)) {
          this.moveSpeedUnitLeft(dxLeft);
        } else {
          collidedLeft = true;
        }
        if (!collidedRight && !this.hasCollidedRightwardPoint(x)) {
          this.moveSpeedUnitRight(dxRight);
        } else {
          collidedRight = true;
        }
        if (!collidedUp && !this.hasCollidedUpwardPoint(y)) {
          this.moveSpeedUnitUp(dyUp);
        } else {
          collidedUp = true;
        }
        if (!collidedDown && !this.hasCollidedDownwardPoint(y)) {
          this.moveSpeedUnitDown(dyDown);
        } else {
          collidedDown = true;
        }
        /*        console.log('------------------');
        console.log('collidedLeft: ', collidedLeft);
        console.log('collidedRight: ', collidedRight);
        console.log('collidedUp: ', collidedUp);
        console.log('collidedDown: ', collidedDown); */
        if (collidedLeft && collidedRight && collidedUp && collidedDown) {
          this.disposeMoveInterval();
          resolve();
        }
      });
    };
    return new Promise(resolve => {
      if (!this.moveInterval) {
        startMoveTo(resolve);
      }
    }).then(() => {
      this.disposeMoveInterval();
      return Promise.resolve();
    });
  };

  // ==========================================================================
  // Move through a path methods
  // ==========================================================================

  /**
   * Move through a path of coordinates in the order given.
   * @param {Array.<{x: number, y: number}>} path
   * @return {*}
   */
  movePath = path => {
    return path.reduce((previousPromise, currentPath) => {
      return previousPromise.then(() => {
        const { x, y } = currentPath;
        // console.log('x: ', x, ' y: ', y);
        return this.moveTo({ x, y });
      });
    }, Promise.resolve());
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * Actions taken on a game tick.
   * To be implemented by the extending class.
   * @param {number} entIdx
   * @return {number}
   */
  onTick = entIdx => {
    return entIdx;
  };

  // ==========================================================================
  // Dispose methods
  // ==========================================================================

  /**
   * Dispose move interval.
   */
  disposeMoveInterval = () => {
    clearInterval(this.moveInterval);
    this.moveInterval = 0;
  };

  /**
   * Dispose this entity instance.
   * @param {number} entIdx
   */
  disposeEntity = entIdx => {
    this.game.gameEntities.splice(entIdx, 1);
  };
}

export default Entity;
