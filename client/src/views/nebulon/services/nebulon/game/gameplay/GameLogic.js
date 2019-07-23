import Game from '../Game';
import GamePlayReadyScreen from './ready-screen/GamePlayReadyScreen';
import GamePlayhealthcore from './hit-point-score/GamePlayhealthcore';
import GamePlayShieldScore from './shield-score/GamePlayShieldScore';
import GamePlayPointScore from './point-score/GamePlayPointScore';
import GamePlayBombScore from './bomb-score/GamePlayBombScore';
import GamePlayPowerScore from './power-score/GamePlayPowerScore';
import GamePlayLifeScore from './life-score/GamePlayLifeScore';

class GameLogic {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * GameLogic states.
   * @type {*}
   */
  static states = {
    READY_SCREEN: 0,
    HANDLE_LEVEL: 1,
    RUNNING: 2
  };

  /**
   * Actions to be taken on a handle level event.
   * @type {Object}
   */
  static handleLevelActions = {
    UNSET: -1,
    CREATE_LEVEL_1: 1,
    CREATE_LEVEL_2: 2,
    CREATE_LEVEL_3: 3
  };

  /**
   * @see GamePlayEntity.readyScreenState
   */
  static defaultReadyScreenState = {
    timeout: 0,
    timeoutDelay: 3000
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
     * GameLogic current state.
     */
    this.state = null;
    /**
     * @see GamePlayReadyScreen
     */
    this.readyScreen = new GamePlayReadyScreen(this.game);
    /**
     * @see GamePlayhealthcore
     */
    this.healthcore = new GamePlayhealthcore(this.game);
    /**
     * @see GamePlayShieldScore
     */
    this.shieldScore = new GamePlayShieldScore(this.game);
    /**
     * @see GamePlayBombScore
     */
    this.bombScore = new GamePlayBombScore(this.game);
    /**
     * @see GamePlayPowerScore
     */
    this.powerScore = new GamePlayPowerScore(this.game);
    /**
     * @see GamePlayLifeScore
     */
    this.lifeScore = new GamePlayLifeScore(this.game);
    /**
     * @see GamePlayPointScore
     */
    this.pointScore = new GamePlayPointScore(this.game);
    /**
     * @see GameLogic.handleLevelActions
     */
    this.handleLevelAction = GameLogic.handleLevelActions.UNSET;
    /**
     * Ready screen state delay duration timeout.
     * @type {Object}
     */
    this.readyScreenState = {
      timeout: GameLogic.defaultReadyScreenState.timeout,
      timeoutDelay: GameLogic.defaultReadyScreenState.timeoutDelay
    };
  }

  init = () => {
    // Create the game player entity.
    this.game.createNewPlayerEntity();
    // Set the handle level action create level 1.
    this.game.setHandleLevelAction(GameLogic.handleLevelActions.CREATE_LEVEL_1);
    // Begin game.
    this.setState(GameLogic.states.READY_SCREEN);
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * GameLogic state setter.
   * State 0 = Ready screen
   * State 1 = Create the current level
   * State 2 = Running the current level
   * @param {number} newState
   */
  setState = newState => {
    switch (newState) {
      // Ready screen state.
      case GameLogic.states.READY_SCREEN:
        this.onReadyState();
        break;
      // Handle the current level.
      case GameLogic.states.HANDLE_LEVEL:
        this.onHandleLevelState();
        break;
      // Run the current level.
      case GameLogic.states.RUNNING:
        this.onRunningState();
        break;
      default:
    }
    this.state = newState;
  };

  /**
   * Handle level action setter.
   * @param {number} newHandleLevelAction
   */
  setHandleLevelAction = newHandleLevelAction => {
    this.handleLevelAction = newHandleLevelAction;
  };

  // ==========================================================================
  // On state methods
  // ==========================================================================

  /**
   * On ready state action.
   */
  onReadyState = () => {
    this.readyScreen.blinkTextLabel();
  };

  /**
   * On handle level state action.
   */
  onHandleLevelState = () => {
    switch (this.handleLevelAction) {
      // Unset action.
      case GameLogic.handleLevelActions.UNSET:
        this.setState(GameLogic.states.RUNNING);
        break;
      // Create level 1 action.
      case GameLogic.handleLevelActions.CREATE_LEVEL_1:
        this.game.createNewLevel(GameLogic.handleLevelActions.CREATE_LEVEL_1);
        break;
      default:
    }
    // Unset the game level action to take since level has been handled.
    this.setHandleLevelAction(GameLogic.handleLevelActions.UNSET);
  };

  /**
   * On running state action.
   */
  onRunningState = () => {
    this.game.player.respawn();
    this.game.setEntitiesIdleStatus(false);
  };

  // ==========================================================================
  // Event action methods
  // ==========================================================================

  onReadyScreenTick = () => {
    this.readyScreen.onTick();
  };

  onLevelTick = () => {
    this.game.gameLevel.onTick();
  };

  onhealthcoreTick = () => {
    this.healthcore.onTick();
  };

  onShieldScoreTick = () => {
    this.shieldScore.onTick();
  };

  onBombScoreTick = () => {
    this.bombScore.onTick();
  };

  onPowerScoreTick = () => {
    this.powerScore.onTick();
  };

  onLifeScoreTick = () => {
    this.lifeScore.onTick();
  };

  onPointScoreTick = () => {
    this.pointScore.onTick();
  };

  /**
   * GameEntity actions taken on game tick.
   */
  onEntityTick = () => {
    // Do entity tick action.
    this.game.gameEntities.forEach((entity, entIdx) => {
      entity.onTick(entIdx);
    });
    // If player is dead and respawning, set entities to idle status.
    if (!this.game.player.status.alive && !this.game.player.status.respawing) {
      this.game.setEntitiesIdleStatus(true);
      // After a delay, take action.
      this.readyScreenState.timeout = setTimeout(() => {
        // Game is set to title state on if life score = 0.
        if (this.game.player.points.life === 0) {
          this.game.reset();
          this.game.setState(Game.states.TITLE);
        }
        // Otherwise, set to ready screen state.
        else {
          this.setState(GameLogic.states.READY_SCREEN);
        }
      }, this.readyScreenState.timeoutDelay);
    }
  };

  /**
   * Playing actions taken on game tick.
   */
  onTick = () => {
    this.onhealthcoreTick();
    this.onShieldScoreTick();
    this.onBombScoreTick();
    this.onPowerScoreTick();
    this.onLifeScoreTick();
    this.onShieldScoreTick();
    this.onPointScoreTick();
    this.onEntityTick();
    switch (this.state) {
      case GameLogic.states.READY_SCREEN:
        this.onReadyScreenTick();
        break;
      case GameLogic.states.HANDLE_LEVEL:
        break;
      case GameLogic.states.RUNNING:
        this.onLevelTick();
        break;
      default:
    }
  };

  // ==========================================================================
  // Dispose methods
  // ==========================================================================

  /**
   * Dispose the ready screen state timeout.
   */
  disposeReadyScreenStateTimeout = () => {
    clearTimeout(this.readyScreenState.timeout);
    this.readyScreenState.timeout = 0;
  };
}

export default GameLogic;
