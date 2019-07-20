import Board from './Board';

/**
 * Compares the player high score to that of the high score list retrieved from
 * the api. Handles high score form visibility status and input when the player
 * has made it to the high score list.
 * React handles the high score form DOM element, since text input does not
 * work on the html5 canvas DOM element.
 * @param canvasRef - Reference to the game canvas DOM element.
 * @param getHighScores - Api call to get the list of player scores on the db.
 * @param properties - The game properties.
 * @param setPlayerScore - Api call to set the player score on the db.
 * @param setShowScoreForm - React state function to set score form visibility.
 * @constructor
 */
function NewHighScore({
  canvas,
  getHighScores,
  properties,
  setPlayerScore,
  setShowScoreForm
}) {
  this.canvas = canvas;
  this.getHighScores = getHighScores;
  this.properties = properties;
  this.setPlayerScore = setPlayerScore;
  this.setShowScoreForm = setShowScoreForm;
}

/**
 * The new high score window position in reference to the canvas grid.
 * @type {{column: number, row: number}}
 */
NewHighScore.position = {
  row: 1,
  column: Board.size.columns + 2
};

/**
 * The new high score window size in reference to the canvas grid.
 * @type {{columns: number, rows: number}}
 */
NewHighScore.size = {
  rows: 20,
  columns: 10
};

/**
 * Fills the new high score window with empty black spaces, creating the
 * background.
 */
NewHighScore.prototype.fill = function() {
  for (let rowIdx = 0; rowIdx < NewHighScore.size.rows; rowIdx += 1) {
    for (let colIdx = 0; colIdx < NewHighScore.size.columns; colIdx += 1) {
      this.canvas.fillEmptyCell({
        row: rowIdx + NewHighScore.position.row,
        column: colIdx + NewHighScore.position.column
      });
    }
  }
};

/**
 * 'New High Score!' text label.
 */
NewHighScore.prototype.fillNewHighScoresLabel = function() {
  this.canvas.fillTextCell({ row: 3, column: 15.4, text: 'New' });
  this.canvas.fillTextCell({ row: 4.5, column: 15, text: 'High' });
  this.canvas.fillTextCell({ row: 6, column: 14.1, text: 'Score!' });
};

/**
 * 'Enter your name:' text label.
 */
NewHighScore.prototype.fillEnterYourNameLabel = function() {
  this.canvas.fillTextCell({ row: 10, column: 14.4, text: 'Enter' });
  this.canvas.fillTextCell({ row: 11.5, column: 14.8, text: 'your' });
  this.canvas.fillTextCell({ row: 13, column: 14.6, text: 'name:' });
};

/**
 * Send an api call to retrieve the high score list from the db, and compare
 * the score to that of the player. Promise returns boolean whether player has
 * a high score higher than that of the lowest score on the high score list.
 * @returns {Promise}
 */
NewHighScore.prototype.compareScores = function() {
  return new Promise(resolve => {
    let isScoreHigh = false;
    this.getHighScores().then(highScores => {
      highScores.forEach(({ score }) => {
        if (this.properties.scoring.score > score) {
          isScoreHigh = true;
        }
      });
      return resolve(isScoreHigh);
    });
  });
};

/**
 * Initialize the new high score window. React handles the high score form DOM
 * element.
 */
NewHighScore.prototype.init = function() {
  this.fill();
  this.fillNewHighScoresLabel();
  this.fillEnterYourNameLabel();
  this.setShowScoreForm(true);
  this.setPlayerScore(this.properties.scoring.score);
};

export default NewHighScore;
