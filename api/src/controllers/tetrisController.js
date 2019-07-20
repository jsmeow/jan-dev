const tetrisModel = require('../models/tetrisModel');

/**
 * Reset the high score collection.
 */
module.exports.resetHighScores = () => {
  tetrisModel.resetHighScores();
  console.log('- tetris reset high scores - ');
  console.log(tetrisModel.getHighScores());
};

/**
 * Send the high score collection back to the client.
 * @param request
 * @param response
 */
module.exports.getHighScores = (request, response) => {
  const highScores = tetrisModel.getHighScores();
  console.log('- tetris get high scores -');
  console.log(highScores);
  response.send(highScores);
};

/**
 * Post the a new high score to the database.
 * @param request
 * @param response
 */
module.exports.postHighScore = (request, response) => {
  const highScores = tetrisModel.postHighScore(request.body);
  console.log('- tetris post high score -');
  console.log(highScores);
  response.send(highScores);
};
