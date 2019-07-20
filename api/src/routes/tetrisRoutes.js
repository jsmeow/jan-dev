const express = require('express');
const tetrisController = require('../controllers/tetrisController');

const tetrisRoutes = express.Router();

// Reset the high score collection.
tetrisRoutes.get('/tetris/resetHighScores', tetrisController.resetHighScores);

// Send the high score collection back to the client.
tetrisRoutes.get('/tetris/getHighScores', tetrisController.getHighScores);

// Post the a new high score to the database.
tetrisRoutes.post('/tetris/postHighScore', tetrisController.postHighScore);

module.exports = tetrisRoutes;
