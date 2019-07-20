/**
 * The main playing game board.
 * @param canvasRef - Reference to the game canvas DOM element.
 * @constructor
 */
function Board({ canvas }) {
  this.canvas = canvas;
  this.grid = null;
  this.reset();
  this.fillGameStartLabel();
}

/**
 * Board position in reference to the canvas grid.
 * @type {{column: number, row: number}}
 */
Board.position = {
  row: 1,
  column: 1
};

/**
 * Board size in reference to the canvas grid.
 * @type {{columns: number, rows: number}}
 */
Board.size = {
  rows: 20,
  columns: 10
};

/**
 * Board grid is created based on the board size. Each cell holds a value that
 * determines whether the cell is occupied by a tetromino cell, and if so, the
 * fill color of the cell.
 */
Board.prototype.createGrid = function() {
  this.grid = [...Array(Board.size.rows)].map(() => {
    return [...Array(Board.size.columns)].map(() => ({
      value: 0,
      fillStyle: null
    }));
  });
};

/**
 * Fills the board with either an empty board space to create the background,
 * or a tetromino cell based on that tetrominoes fillStyle.
 */
Board.prototype.fill = function() {
  this.grid.forEach((row, rowIdx) => {
    row.forEach(({ value, fillStyle }, colIdx) => {
      if (value && fillStyle) {
        this.canvas.fillTetrominoCell({
          row: rowIdx + Board.position.row,
          column: colIdx + Board.position.column,
          fillStyle
        });
      } else {
        this.canvas.fillBoardCell({
          row: rowIdx + Board.position.row,
          column: colIdx + Board.position.column
        });
      }
    });
  });
};

/**
 * Resets the board to the initialized state.
 */
Board.prototype.reset = function() {
  this.createGrid();
  this.fill();
};

/**
 * 'Press Enter To Play' text label.
 */
Board.prototype.fillGameStartLabel = function() {
  this.canvas.fillTextCell({ row: 9, column: 3.5, text: 'Press' });
  this.canvas.fillTextCell({ row: 11, column: 3.5, text: 'Enter' });
  this.canvas.fillTextCell({ row: 13, column: 2.5, text: 'To Play' });
};

/**
 * 'Game Over' text label.
 */
Board.prototype.fillGameOverLabel = function() {
  this.canvas.fillTextCell({ row: 10.5, column: 4, text: 'Game' });
  this.canvas.fillTextCell({ row: 12.5, column: 4, text: 'Over' });
};

/**
 * Iterates over the board grid to find rows full of tetromino cells.
 * @returns {Array.<number>} Indices of the full rows.
 */
Board.prototype.findFullRows = function() {
  const rowIndices = [];
  this.grid.forEach((row, rowIdx) => {
    let isRowFull = true;
    row.forEach(column => {
      if (!column.value) {
        isRowFull = false;
      }
    });
    if (isRowFull) {
      rowIndices.push(rowIdx);
    }
  });
  return rowIndices;
};

/**
 * Removes full of tetromino cells from the board grid. Note that the grid is
 * modified while splicing, and this is taken into account.
 * @param {Array.<number>} rowIndices Indices of the full rows.
 */
Board.prototype.removeFullRows = function(rowIndices) {
  rowIndices.forEach((rowIdx, indIdx) => {
    if (rowIdx <= indIdx) {
      this.grid.splice(rowIdx, 1);
    } else {
      this.grid.splice(rowIdx - indIdx, 1);
    }
  });
};

/**
 * For every full row, insert an empty row at the top of the grid.
 * @param {Array.<number>} rowIndices Indices of the full rows.
 */
Board.prototype.insertEmptyRows = function(rowIndices) {
  console.log(rowIndices);
  rowIndices.forEach(() => {
    this.grid.length < 20 &&
      this.grid.unshift(
        [...Array(Board.size.columns)].map(() => ({
          value: 0,
          fillStyle: null
        }))
      );
  });
};

/**
 * Score event handler.
 */
Board.prototype.handleOnScore = function() {
  const rowIndices = this.findFullRows();
  if (rowIndices.length > 0) {
    this.removeFullRows(rowIndices);
    this.insertEmptyRows(rowIndices);
    this.fill();
  }
};

export default Board;
