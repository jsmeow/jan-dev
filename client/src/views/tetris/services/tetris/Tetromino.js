import { randomizeTetromino } from './Tetrominoes';
import Board from './Board';
import Game from './Game';

/**
 * Handles tetromino drawing, movement, collision detection, and whether the
 * current tetromino overflows the game board to trigger a game over.
 * @param board - The game board.
 * @param canvasRef - Reference to the game canvas DOM element.
 * @param properties - The game properties.
 * @param isPlayable - Flag whether the tetromino is in a playabale status.
 * @constructor
 */
function Tetromino({ board, canvas, properties }, isPlayable) {
  this.board = board;
  this.canvas = canvas;
  this.properties = properties;
  this.tetromino = randomizeTetromino();
  this.position = { ...Tetromino.spawnPosition };
  this.orientation = Tetromino.spawnOrientation;
  this.shapes = this.tetromino.shapes;
  this.fillStyle = this.tetromino.fillStyle;
  this.isPlayable = isPlayable;
  // Evaluates if the tetromino is locked in place at the game board floor,
  // or by other tetrominoes.
  this.isLocked = false;
}

/**
 * Tetromino spawn position in reference to the canvas grid.
 * @type {{column: number, row: number}}
 */
Tetromino.spawnPosition = {
  row: -2,
  column: 4
};

/**
 * Tetromino spawn orientation based on it's shape array.
 * @type {number}
 */
Tetromino.spawnOrientation = 0;

/**
 * Fills the tetromino with it's fill color value on the board.
 */
Tetromino.prototype.fill = function() {
  this.shapes[this.orientation].forEach((row, rowIdx) => {
    row.forEach((column, colIdx) => {
      if (column && this.position.row + rowIdx > 0) {
        this.canvas.fillTetrominoCell({
          row: this.position.row + rowIdx,
          column: this.position.column + colIdx,
          fillStyle: this.fillStyle
        });
      }
    });
  });
};

/**
 * Fills the board with either an empty board space to create the background.
 */
Tetromino.prototype.unFill = function() {
  this.shapes[this.orientation].forEach((row, rowIdx) => {
    row.forEach((column, colIdx) => {
      if (column && this.position.row + rowIdx > 0) {
        this.canvas.fillBoardCell({
          row: this.position.row + rowIdx,
          column: this.position.column + colIdx
        });
      }
    });
  });
};

/**
 * Evaluates if the tetromino is within the board grid.
 * @param {number} row
 * @param {number} column
 * @returns {boolean}
 */
Tetromino.prototype.isWithinBoard = function(row, column) {
  return (
    row > 0 &&
    row <= Board.size.rows &&
    column > 0 &&
    column <= Board.size.columns
  );
};

/**
 * Evaluates if the tetromino has collided with another tetromino.
 * @param {number} row
 * @param {number} column
 * @returns {boolean|*}
 */
Tetromino.prototype.collidesWithTetromino = function(row, column) {
  return row > 0 && column > 0 && this.board.grid[row - 1][column - 1].value;
};

/**
 * Evaluates if the tetromino has collided with a board grid column boundary.
 * @param {number} column
 * @returns {boolean}
 */
Tetromino.prototype.collidesWithColumn = function(column) {
  return column <= 0 || column > Board.size.columns;
};

/**
 * Evaluates if the tetromino has collided with a board grid floor boundary.
 * @param {number} row
 * @returns {boolean}
 */
Tetromino.prototype.collidesWithFloor = function(row) {
  return row > Board.size.rows;
};

/**
 * Logic that evaluates whether the tetromino has collided with a boundary or
 * another tetromino, and locks the tetromino in place if needed. This is based
 * on the next cell the tetromino will be moved to.
 * @param {number} dx - Next horizontal tetromino cell to be moved to.
 * @param {number} dy - Next vertical tetromino cell to be moved to.
 * @returns {boolean}
 */
Tetromino.prototype.findCollision = function(dx, dy) {
  let hasCollided = false;
  this.shapes[this.orientation].forEach((row, rowIdx) => {
    row.forEach((column, colIdx) => {
      if (column && !hasCollided) {
        const nextRow = this.position.row + rowIdx + dy;
        const nextColumn = this.position.column + colIdx + dx;
        if (
          this.isWithinBoard(nextRow, nextColumn) &&
          this.collidesWithTetromino(nextRow, nextColumn)
        ) {
          hasCollided = true;
          this.isLocked = dy !== 0;
        }
        if (dx && this.collidesWithColumn(nextColumn)) {
          hasCollided = true;
        }
        if (dy && this.collidesWithFloor(nextRow)) {
          hasCollided = true;
          this.isLocked = true;
        }
      }
    });
  });
  return hasCollided;
};

/**
 * Locks the tetromino in place. If the tetromino is locked at the top of the
 * board grid and overflows the grid, set the game state to over. Otherwise,
 * fill the board grid with a tetromino and it's fill color.
 */
Tetromino.prototype.lock = function() {
  if (this.isLocked) {
    this.shapes[this.orientation].forEach((row, rowIdx) => {
      row.forEach((column, colIdx) => {
        if (column) {
          if (this.position.row + rowIdx - 1 <= 0) {
            Object.assign(this.properties, { state: Game.state.over });
          } else {
            this.board.grid[this.position.row + rowIdx - 1][
              this.position.column + colIdx - 1
            ] = {
              value: 1,
              fillStyle: this.fillStyle
            };
          }
        }
      });
    });
    this.isPlayable = false;
  }
};

/**
 * Evaluates if the tetromino has collided and lock it in place. Otherwise,
 * move it.
 * @param {number} dx - Next horizontal tetromino cell to be moved to.
 * @param {number} dy - Next vertical tetromino cell to be moved to.
 * @param orientation - Current tetromino orientation.
 */
Tetromino.prototype.move = function(dx, dy, orientation = this.orientation) {
  if (!this.findCollision(dx, dy)) {
    this.unFill();
    Object.assign(this, { orientation });
    Object.assign(this.position, {
      row: this.position.row + dy,
      column: this.position.column + dx
    });
    this.fill();
  } else {
    this.lock();
  }
};

/**
 * Move the tetromino left.
 */
Tetromino.prototype.moveLeft = function() {
  this.isPlayable && this.move(-1, 0);
};

/**
 * Move the tetromino right.
 */
Tetromino.prototype.moveRight = function() {
  this.isPlayable && this.move(1, 0);
};

/**
 * Move the tetromino down.
 */
Tetromino.prototype.moveDown = function() {
  this.isPlayable && this.move(0, 1);
};

/**
 * Rotate the tetromino in place.
 */
Tetromino.prototype.rotate = function() {
  if (this.isPlayable) {
    const nextOrientation = 1 + this.orientation;
    const hasNextOrientation = nextOrientation < this.shapes.length;
    hasNextOrientation ? this.move(0, 0, nextOrientation) : this.move(0, 0, 0);
  }
};

/**
 * Hard drop the tetromino.
 */
Tetromino.prototype.hardDrop = function() {
  if (this.isPlayable) {
    for (
      let rowIdx = this.position.row;
      rowIdx < Board.size.rows;
      rowIdx += 1
    ) {
      this.move(0, 1);
    }
  }
};

export default Tetromino;
