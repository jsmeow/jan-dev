import Game from './Game';
import Board from './Board';
import Sideboard from './Sideboard';
import { randomizeTetromino } from './Tetrominoes';

/**
 * The game canvas that handles all drawing to the html5 canvas DOM element.
 * @param canvasRef - Reference to the game canvas DOM element.
 * @constructor
 */
function Canvas(canvasRef) {
  // The unit represent the width and height dimensions of a cell in the canvas
  // grid, determined by the dimensions of the parent DOM element container.
  // The height of the canvas grid will be top border + board rows + bottom
  // border.
  // The width of the canvas grid will be left border + board columns +
  // middle border + sideboard columns + right border.
  // 0.1 is added to accommodate the stroke.
  this.unit =
    window
      .getComputedStyle(
        document.getElementById('router--route-section--section'),
        null
      )
      .getPropertyValue('height')
      .split('px')[0] /
    (Board.size.rows + 2);
  this.context = canvasRef.getContext('2d');
  // Set the canvas width and height.
  Object.assign(canvasRef, {
    height: (Board.size.rows + 2.1) * this.unit,
    width: (Board.size.columns + Sideboard.size.columns + 3.1) * this.unit
  });
  this.fillBorder();
}

/**
 * Fills a canvas grid cell with dimensions equal to that of the canvas grid
 * unit.
 * @param {number} row - The row position on the canvas grid.
 * @param {number} column - The column position on the canvas grid.
 * @param {number} width - Cell width.
 * @param {number} height 0 Cell height.
 * @param {string || undefined} fillStyle - Fill color.
 * @param {string || undefined} stroke - Stroke color.
 */
Canvas.prototype.fillCell = function({
  row,
  column,
  width = 1,
  height = 1,
  fillStyle,
  stroke
}) {
  row *= this.unit;
  column *= this.unit;
  width *= this.unit;
  height *= this.unit;
  fillStyle && Object.assign(this.context, { fillStyle });
  fillStyle && this.context.fillRect(column, row, width + 1, height + 1);
  stroke && Object.assign(this.context, { lineWidth: 5, stroke });
  stroke && this.context.strokeRect(column, row, width + 1, height + 1);
};

/**
 * Fills a black empty cell on the canvas grid.
 * @param {number} row - The row position on the canvas grid.
 * @param {number} column - The column position on the canvas grid.
 */
Canvas.prototype.fillEmptyCell = function({ row, column }) {
  this.fillCell({ row, column, fillStyle: '#000000', stroke: '#000000' });
};

/**
 * Fills an empty board cell with a cell marker in the middle on the canvas
 * grid.
 * @param {number} row - The row position on the canvas grid.
 * @param {number} column - The column position on the canvas grid.
 */
Canvas.prototype.fillBoardCell = function({ row, column }) {
  this.fillEmptyCell({ row, column });
  this.fillCell({
    row: row + 0.4167,
    column: column + 0.4167,
    width: 0.1667,
    height: 0.1667,
    fillStyle: '#c2ffad50'
  });
};

/**
 * Fills a tetromino cell canvas grid.
 * @param {number} row - The row position on the canvas grid.
 * @param {number} column - The column position on the canvas grid.
 * @param {string} fillStyle - Fill color.
 */
Canvas.prototype.fillTetrominoCell = function({ row, column, fillStyle }) {
  this.fillCell({ row, column, fillStyle, stroke: '#000000' });
  this.fillCell({
    row: row + 0.2222,
    column: column + 0.2222,
    width: 0.5556,
    height: 0.1111,
    fillStyle: '#000000'
  });
  this.fillCell({
    row: row + 0.2222,
    column: column + 0.2222,
    width: 0.1111,
    height: 0.5556,
    fillStyle: '#000000'
  });
};

/**
 * Fills the game border made up of random tetromino piece cells on the canvas
 * grid.
 */
Canvas.prototype.fillBorder = function() {
  for (
    let colIdx = 0;
    colIdx < Board.size.columns + Sideboard.size.columns + 3;
    colIdx += 1
  ) {
    const { fillStyle } = randomizeTetromino();
    this.fillTetrominoCell({ row: 0, column: colIdx, fillStyle });
    this.fillTetrominoCell({
      row: Board.size.rows + 1,
      column: colIdx,
      fillStyle
    });
  }
  for (let rowIdx = 0; rowIdx < Board.size.rows + 2; rowIdx += 1) {
    const { fillStyle } = randomizeTetromino();
    this.fillTetrominoCell({ row: rowIdx, column: 0, fillStyle });
    this.fillTetrominoCell({
      row: rowIdx,
      column: Board.size.columns + 1,
      fillStyle
    });
    this.fillTetrominoCell({
      row: rowIdx,
      column: Board.size.columns + Sideboard.size.columns + 2,
      fillStyle
    });
  }
};

/**
 * Fills text on the canvas grid. Text size defaults to the canvas grid unit
 * size if not specified.
 * @param {number} row - The row position on the canvas grid.
 * @param {number} column - The column position on the canvas grid.
 * @param {string || undefined} text
 * @param {number} size - Text size.
 */
Canvas.prototype.fillTextCell = function({ row, column, text, size }) {
  row *= this.unit;
  column *= this.unit;
  text &&
    Object.assign(this.context, {
      fillStyle: '#fafafa',
      font: `${size || this.unit}px "${Game.font}"`
    });
  text && this.context.fillText(text, column, row);
};

export default Canvas;
