const mongoose = require('mongoose');
const tetrisSchema = require('../schemas/tetrisSchema');

// Create a mongoose model object.
const Tetris = mongoose.model('Tetris', tetrisSchema);

// Instantiate a mongoose model object.
const tetrisModel = new Tetris();

// Reset the high score collection.
tetrisModel.resetHighScores();

module.exports = tetrisModel;
