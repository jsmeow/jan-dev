import Board from './Board';

/**
 * Shows the high score list retrieved from the db.
 * @param canvasRef - Reference to the game canvas DOM element.
 * @param getHighScores - Api call to get the list of player scores on the db.
 * @constructor
 */
function HighScoreboard({ canvas, getHighScores }) {
  this.canvas = canvas;
  this.getHighScores = getHighScores;
  this.init();
}

/**
 * The high scoreboard position in reference to the canvas grid.
 * @type {{column: number, row: number}}
 */
HighScoreboard.position = {
  row: 1,
  column: Board.size.columns + 2
};

/**
 * The high scoreboard size in reference to the canvas grid.
 * @type {{columns: number, rows: number}}
 */
HighScoreboard.size = {
  rows: 20,
  columns: 10
};

/**
 * Fills the high scoreboard with empty black spaces, creating the background.
 */
HighScoreboard.prototype.fill = function() {
  for (let rowIdx = 0; rowIdx < HighScoreboard.size.rows; rowIdx += 1) {
    for (let colIdx = 0; colIdx < HighScoreboard.size.columns; colIdx += 1) {
      this.canvas.fillEmptyCell({
        row: rowIdx + HighScoreboard.position.row,
        column: colIdx + HighScoreboard.position.column
      });
    }
  }
};

/**
 * '-High Scores-' text label.
 */
HighScoreboard.prototype.fillHighScoresLabel = function() {
  this.canvas.fillTextCell({
    row: 2.4,
    column: 12.5,
    size: this.canvas.unit * 0.7,
    text: '-High Scores-'
  });
};

/**
 * High scores value text label.
 * @param {Array.<number>} highScores
 */
HighScoreboard.prototype.fillHighScoresValue = function(highScores) {
  highScores.forEach(({ name, score }, hsIdx) => {
    this.canvas.fillTextCell({
      row: 20 - hsIdx * 1.7,
      column: 14.5,
      size: this.canvas.unit * 0.7,
      text: `${score} - ${name}`
    });
  });
};

/**
 * Initialize the high scoreboard by sending an api call to the db to
 * retrieve the high scores and drawing them.
 */
HighScoreboard.prototype.init = function() {
  this.fill();
  this.fillHighScoresLabel();
  this.getHighScores().then(highScores => {
    this.fillHighScoresValue(highScores);
  });
};

export default HighScoreboard;
