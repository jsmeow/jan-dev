const mongoose = require('mongoose');

/**
 * The tetris schema defines the high score object collection shape.
 */
const tetrisSchema = new mongoose.Schema({
  highScores: [
    {
      date: String,
      name: String,
      score: Number
    }
  ]
});

/**
 * Reset the high score collection.
 */
tetrisSchema.methods.resetHighScores = function() {
  this.highScores = [...Array(10)].map(() => {
    return {
      date: new Date(),
      name: 'aaa',
      score: 0
    };
  });
};

/**
 * Send the high score collection back to the client.
 * @returns {{date: Date, score: number, name: string}}
 */
tetrisSchema.methods.getHighScores = function() {
  return this.highScores;
};

/**
 * Post the a new high score to the database.
 * @param {Date} date
 * @param {string} name
 * @param {number} score
 * @returns {{date: Date, score: number, name: string}}
 */
tetrisSchema.methods.postHighScore = function({ date, name, score }) {
  let rank = 0;
  this.highScores.forEach((highScore, hsIdx) => {
    if (score > highScore.score) {
      rank = hsIdx;
    }
  });
  if (rank) {
    this.highScores.splice(rank, 1, {
      date,
      name,
      score
    });
  }
  return this.highScores;
};

module.exports = tetrisSchema;
