import Game from '../Game';

class GamePaused {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @constructor
   */
  constructor(game) {
    /**
     * @see Game
     */
    this.game = game;
  }

  resumeGame = () => {
    this.game.setGameState(Game.gameStates.playing);
  };
}

export default GamePaused;
