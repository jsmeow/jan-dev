import Board from './Board';

/**
 * Shows the next piece and the player score, level and lines cleared.
 * @param canvasRef - Reference to the game canvas DOM element.
 * @param properties - The game properties.
 * @constructor
 */
function Sideboard({ canvas, properties }) {
  this.properties = properties;
  this.canvas = canvas;
}

/**
 * Sideboard position in reference to the canvas grid.
 * @type {{column: number, row: number}}
 */
Sideboard.position = {
  row: 1,
  column: Board.size.columns + 2
};

/**
 * Sideboard size in reference to the canvas grid.
 * @type {{columns: number, rows: number}}
 */
Sideboard.size = {
  rows: 20,
  columns: 10
};

/**
 * Fills the sideboard with empty black spaces, creating the background.
 */
Sideboard.prototype.fill = function() {
  for (let rowIdx = 0; rowIdx < Sideboard.size.rows; rowIdx += 1) {
    for (let colIdx = 0; colIdx < Sideboard.size.columns; colIdx += 1) {
      this.canvas.fillEmptyCell({
        row: rowIdx + Sideboard.position.row,
        column: colIdx + Sideboard.position.column
      });
    }
  }
};

/**
 * 'Next' text label.
 */
Sideboard.prototype.fillNextLabel = function() {
  this.canvas.fillTextCell({ row: 3, column: 15, text: 'Next' });
};

/**
 * Fills the next tetromino to be played on the sideboard based on the game
 * properties 'next' tetromino.
 */
Sideboard.prototype.fillNextTetromino = function() {
  const nextTetromino = this.properties.tetromino.next;
  let emptyRowCount = 0;
  if (nextTetromino) {
    nextTetromino.shapes[0].forEach((row, rowIdx) => {
      !row.includes(1) && emptyRowCount++;
      row.forEach((column, colIdx) => {
        if (column) {
          this.canvas.fillTetrominoCell({
            row: 4 - emptyRowCount + rowIdx,
            column: (row.length % 2 === 0 ? 15 : 15.5) + colIdx,
            fillStyle: nextTetromino.fillStyle
          });
        }
      });
    });
  }
};

/**
 * 'Score' text label.
 */
Sideboard.prototype.fillScoreLabel = function() {
  this.canvas.fillTextCell({ row: 8, column: 14.5, text: 'Score' });
};

/**
 * Pad the score with zeroes, like in the arcades.
 * @param {number} score
 * @returns {string} Padded score.
 */
Sideboard.prototype.padScore = function(score) {
  score = score.toString();
  const scoreLength = score.length;
  const pad = maxLength => {
    return score.padStart(maxLength, '0');
  };
  if (scoreLength < 10) {
    return pad(6);
  }
  if (scoreLength < 100) {
    return pad(5);
  }
  if (scoreLength < 10000) {
    return pad(4);
  }
  if (scoreLength < 10000) {
    return pad(3);
  }
  if (scoreLength < 100000) {
    return pad(2);
  }
  return score;
};

/**
 * GamePlayerEntity score value text label.
 */
Sideboard.prototype.fillScoreValue = function() {
  this.canvas.fillTextCell({
    row: 10,
    column: 14,
    text: this.padScore(this.properties.scoring.score)
  });
};

/**
 * 'Lines' text label.
 */
Sideboard.prototype.fillLinesLabel = function() {
  this.canvas.fillTextCell({ row: 13, column: 14.5, text: 'Lines' });
};

/**
 * GamePlayerEntity lines scored value text label.
 */
Sideboard.prototype.fillLinesValue = function() {
  this.canvas.fillTextCell({
    row: 15,
    column: 14,
    text: this.padScore(this.properties.scoring.lines)
  });
};

/**
 * 'Level' text label.
 */
Sideboard.prototype.fillLevelLabel = function() {
  this.canvas.fillTextCell({ row: 18, column: 14.5, text: 'Level' });
};

/**
 * GamePlayerEntity level value text label.
 */
Sideboard.prototype.fillLevelValue = function() {
  this.canvas.fillTextCell({
    row: 20,
    column: 14,
    text: this.padScore(this.properties.scoring.level)
  });
};

/**
 * Reset the sideboard element by redrawing them. This occurs on player score.
 */
Sideboard.prototype.reset = function() {
  this.fill();
  this.fillNextLabel();
  this.fillNextTetromino();
  this.fillScoreLabel();
  this.fillScoreValue();
  this.fillLevelLabel();
  this.fillLevelValue();
  this.fillLinesLabel();
  this.fillLinesValue();
};

/**
 * 'Paused' text label.
 */
Sideboard.prototype.fillPausedLabel = function() {
  this.canvas.fillTextCell({ row: 7, column: 14, text: 'Paused' });
};

/**
 * '1-Resume' text label.
 */
Sideboard.prototype.fillResumeLabel = function() {
  this.canvas.fillTextCell({ row: 11, column: 13, text: '1-Resume' });
};

/**
 * '2-Retry' text label.
 */
Sideboard.prototype.fillRetryLabel = function() {
  this.canvas.fillTextCell({ row: 13, column: 13, text: '2-Retry' });
};

/**
 * '3-Quit' text label.
 */
Sideboard.prototype.fillQuitLabel = function() {
  this.canvas.fillTextCell({ row: 15, column: 13, text: '3-Quit' });
};

/**
 * Clears the sideboard by resetting it and then drawing the pause menu.
 */
Sideboard.prototype.pause = function() {
  this.fill();
  this.fillPausedLabel();
  this.fillResumeLabel();
  this.fillRetryLabel();
  this.fillQuitLabel();
};

export default Sideboard;
