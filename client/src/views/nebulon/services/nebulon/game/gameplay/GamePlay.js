import GamePlayHitPointScore from './hit-point-score/GamePlayHitPointScore';
import GamePlayShieldScore from './shield-score/GamePlayShieldScore';
import GamePlayPointScore from './point-score/GamePlayPointScore';
import GamePlayBombScore from './bomb-score/GamePlayBombScore';
import GamePlayPowerScore from './power-score/GamePlayPowerScore';
import GamePlayLifeScore from './life-score/GamePlayLifeScore';
import GamePlayReadyScreen from './ready-screen/GamePlayReadyScreen';

class GamePlay {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * GamePlay states.
   * @type {*}
   */
  static gamePlayStates = {
    ready: 0,
    level1: 1
  };

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
    /**
     * GamePlay current state.
     */
    this.gamePlayState = null;
    /**
     * @see GamePlayReadyScreen
     */
    this.gamePlayReadyScreen = new GamePlayReadyScreen(this.game);
    /**
     * @see GamePlayHitPointScore
     */
    this.gamePlayHitPointScore = new GamePlayHitPointScore(this.game);
    /**
     * @see GamePlayShieldScore
     */
    this.gamePlayShieldScore = new GamePlayShieldScore(this.game);
    /**
     * @see GamePlayBombScore
     */
    this.gamePlayBombScore = new GamePlayBombScore(this.game);
    /**
     * @see GamePlayPowerScore
     */
    this.gamePlayPowerScore = new GamePlayPowerScore(this.game);
    /**
     * @see GamePlayPowerScore
     */
    this.gamePlayLifeScore = new GamePlayLifeScore(this.game);
    /**
     * @see GamePlayPointScore
     */
    this.gamePlayPointScore = new GamePlayPointScore(this.game);
    this.init();
  }

  init = () => {
    this.game.createNewGamePlayer(this.game);
    this.setGamePlayState(0);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * GamePlay state setter.
   * State 0 = Ready screen
   * State 2 = Level 1
   * @param {number} newGamePlayState
   */
  setGamePlayState = newGamePlayState => {
    switch (newGamePlayState) {
      // Ready screen state
      case GamePlay.gamePlayStates.ready:
        this.gamePlayReadyScreen.blinkTextLabel();
        break;
      // Level 1 state
      case GamePlay.gamePlayStates.level1:
        this.game.createNewGameLevel(1);
        this.game.gamePlayer.setFiringStatus(true);
        break;
      default:
    }
    this.gamePlayState = newGamePlayState;
  };

  // ==========================================================================
  // Event action methods
  // ==========================================================================

  onGamePlayReadyScreenTick = () => {
    this.gamePlayReadyScreen.onTick();
  };

  onLevelTick = () => {
    this.game.gameLevel.onTick();
  };

  onGamePlayHitPointScoreTick = () => {
    this.gamePlayHitPointScore.onTick();
  };

  onGamePlayShieldScoreTick = () => {
    this.gamePlayShieldScore.onTick();
  };

  onGamePlayBombScoreTick = () => {
    this.gamePlayBombScore.onTick();
  };

  onGamePlayPowerScoreTick = () => {
    this.gamePlayPowerScore.onTick();
  };

  onGamePlayLifeScoreTick = () => {
    this.gamePlayLifeScore.onTick();
  };

  onGamePlayPointScoreTick = () => {
    this.gamePlayPointScore.onTick();
  };

  /**
   * Entity actions taken on game tick.
   */
  onEntityTick = () => {
    this.game.gameEntities.forEach((entity, entIdx) => {
      entity.onTick(entIdx);
    });
  };

  /**
   * Playing actions taken on game tick.
   */
  onTick = () => {
    switch (this.gamePlayState) {
      case 0:
        this.onGamePlayReadyScreenTick();
        break;
      case 1:
        this.onLevelTick();
        break;
      default:
    }
    this.onGamePlayHitPointScoreTick();
    this.onGamePlayShieldScoreTick();
    this.onGamePlayBombScoreTick();
    this.onGamePlayPowerScoreTick();
    this.onGamePlayLifeScoreTick();
    this.onGamePlayPointScoreTick();
    this.onEntityTick();
  };
}

export default GamePlay;
