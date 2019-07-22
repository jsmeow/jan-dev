import Level from '../../levels/Level';
import GamePlayerEntity from '../../entities/gameplay/player/GamePlayerEntity';
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
    handleLevel: 1,
    running: 2
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
    /**
     * GamePlay timeout before moving to the ready state.
     */
    this.readyStateTimeoutDelay = 3000;
    this.init();
  }

  init = () => {
    // Create the game player entity.
    this.game.createNewGamePlayer(this.game);
    // Set the level to be created to level 1.
    this.game.setGameLevelAction(Level.levels.createLevel1);
    // Begin gameplay.
    this.setGamePlayState(GamePlay.gamePlayStates.ready);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * GamePlay state setter.
   * State 0 = Ready screen
   * State 1 = Create the current level
   * State 2 = Running the current level
   * @param {number} newGamePlayState
   */
  setGamePlayState = newGamePlayState => {
    switch (newGamePlayState) {
      // Ready screen state.
      case GamePlay.gamePlayStates.ready:
        this.onReadyGameState();
        break;
      // Handle the current level state.
      case GamePlay.gamePlayStates.handleLevel:
        this.onHandleLevelGameState();
        break;
      // Run the current level state.
      case GamePlay.gamePlayStates.running:
        this.onRunningGameState();
        break;
      default:
    }
    this.gamePlayState = newGamePlayState;
  };

  // ==========================================================================
  // On state methods
  // ==========================================================================

  onReadyGameState = () => {
    this.gamePlayReadyScreen.blinkTextLabel();
  };

  onHandleLevelGameState = () => {
    switch (this.game.gameLevelAction) {
      case Level.levels.unset:
        this.setGamePlayState(GamePlay.gamePlayStates.running);
        break;
      case Level.levels.createLevel1:
        this.game.createNewGameLevel(Level.levels.createLevel1);
        break;
      case Level.levels.createLevel2:
        this.game.createNewGameLevel(Level.levels.createLevel2);
        break;
      case Level.levels.createLevel3:
        this.game.createNewGameLevel(Level.levels.createLevel3);
        break;
      default:
    }
    // Unset the game level action to take.
    this.game.setGameLevelAction(Level.levels.unset);
  };

  onRunningGameState = () => {
    this.game.gamePlayer.respawn();
    this.game.setGameEntitiesIdleStatus(false);
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
   * GameEntity actions taken on game tick.
   */
  onEntityTick = () => {
    this.game.gameEntities.forEach((entity, entIdx) => {
      entity.onTick(entIdx);
    });
    if (
      !this.game.gamePlayer.aliveStatus &&
      !this.game.gamePlayer.respawnStatus
    ) {
      this.game.setGameEntitiesIdleStatus(true);
      setTimeout(() => {
        if (this.game.gamePlayer.lifePoints === 0) {
          this.game.resetGame();
          this.game.setGameState(0);
        } else {
          this.setGamePlayState(GamePlay.gamePlayStates.ready);
        }
      }, this.readyStateTimeoutDelay);
    }
  };

  /**
   * Playing actions taken on game tick.
   */
  onTick = () => {
    this.onGamePlayHitPointScoreTick();
    this.onGamePlayShieldScoreTick();
    this.onGamePlayBombScoreTick();
    this.onGamePlayPowerScoreTick();
    this.onGamePlayLifeScoreTick();
    this.onGamePlayPointScoreTick();
    this.onEntityTick();
    switch (this.gamePlayState) {
      case GamePlay.gamePlayStates.ready:
        this.onGamePlayReadyScreenTick();
        break;
      case GamePlay.gamePlayStates.handleLevel:
        break;
      case GamePlay.gamePlayStates.running:
        this.onLevelTick();
        break;
      default:
    }
  };
}

export default GamePlay;
