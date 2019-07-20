import Canvas from './Canvas';
import Board from './Board';
import HighScoreboard from './HighScoreboard';
import Sideboard from './Sideboard';
import Tetromino from './Tetromino';
import NewHighScore from './NewHighScore';

/**
 * Handles the game logic including scoring and game state.
 * @param canvasRef - Reference to the game canvas DOM element.
 * @param setPlayerScore - Api call to set the player score on the db.
 * @param setShowScoreForm - React state function to set score form visibility.
 * @param getHighScores - Api call to get the list of player scores on the db.
 * @constructor
 */
function Game(canvasRef, setPlayerScore, setShowScoreForm, getHighScores) {
  this.properties = {
    animationFrame: null,
    dropStart: null,
    state: Game.state.init,
    scoring: {
      level: 0,
      lines: 0,
      score: 0
    },
    speed: Game.speed.initial,
    tetromino: {
      current: null,
      next: null
    }
  };
  // Only initialize after fonts are loaded.
  document.fonts.load(`0 "${Game.font}"`).then(() => {
    this.setPlayerScore = setPlayerScore;
    this.setShowScoreForm = setShowScoreForm;
    this.getHighScores = getHighScores;
    this.canvas = new Canvas(canvasRef);
    this.board = new Board(this);
    this.highScoreboard = new HighScoreboard(this);
    this.sideboard = new Sideboard(this);
    this.newHighScore = new NewHighScore(this);
    this.addEventListener();
  });
}

/**
 * Obtained from https://fonts.google.com/specimen/Press+Start+2P
 * @type {string}
 */
Game.font = 'Press Start 2P';

/**
 * Initial game drop speed and game drop speed change on player score.
 * @type {{initial: number, change: number}}
 */
Game.speed = {
  change: 50,
  initial: 500
};

/**
 * Lines required to level up and score multiplier depending on how many lines
 * are scored with one tetromino.
 * @type {{linesToLevelUp: number, multiplier: number[]}}
 */
Game.scoring = {
  linesToLevelUp: 5,
  multiplier: [40, 100, 300, 1200]
};

/**
 * Game keys.
 */
Game.keys = {
  start: 'Enter',
  resume: '1',
  retry: '2',
  quit: '3',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  down: 'ArrowDown',
  up: 'ArrowUp',
  action: ' '
};

/**
 * Game states.
 */
Game.state = {
  init: 1,
  playing: 2,
  paused: 3,
  over: 4,
  newHighScore: 5
};

/**
 * Key down event handler.
 * @param {string} key
 * @returns {boolean|void|boolean|*|*}
 */
Game.prototype.handleOnKeyDown = function({ key }) {
  const keyEvents = {
    // Begin game.
    [Game.keys.start]() {
      console.log(this.properties.state);
      if (this.properties.state === Game.state.init) {
        return this.start();
      }
      if (this.properties.state === Game.state.playing) {
        return this.pause();
      }
      if (this.properties.state === Game.state.paused) {
        return this.resume();
      }
      if (this.properties.state === Game.state.over) {
        return this.quit();
      }
    },
    // Resume game.
    [Game.keys.resume]() {
      return this.properties.state === Game.state.paused && this.resume();
    },
    // Retry game.
    [Game.keys.retry]() {
      return this.properties.state === Game.state.paused && this.start();
    },
    // Quit game back to the initialized state.
    [Game.keys.quit]() {
      return this.properties.state === Game.state.paused && this.quit();
    },
    // Move tetromino left while the current tetromino is in play.
    [Game.keys.left]() {
      return (
        this.properties.state === Game.state.playing &&
        this.properties.tetromino.current.moveLeft()
      );
    },
    // Move tetromino right while the current tetromino is in play.
    [Game.keys.right]() {
      return (
        this.properties.state === Game.state.playing &&
        this.properties.tetromino.current.moveRight()
      );
    },
    // Move tetromino down while the current tetromino is in play.
    [Game.keys.down]() {
      return (
        this.properties.state === Game.state.playing &&
        this.properties.tetromino.current.moveDown()
      );
    },
    // Rotate tetromino while the current tetromino is in play.
    [Game.keys.up]() {
      return (
        this.properties.state === Game.state.playing &&
        this.properties.tetromino.current.rotate()
      );
    },
    // Hard drop tetromino while the current tetromino is in play.
    [Game.keys.action]() {
      return (
        this.properties.state === Game.state.playing &&
        this.properties.tetromino.current.hardDrop()
      );
    }
  };
  return keyEvents.hasOwnProperty(key) && keyEvents[key].call(this);
};

/**
 * Add keydown event listener.
 */
Game.prototype.addEventListener = function() {
  return document.body.addEventListener(
    'keydown',
    this.handleOnKeyDown.bind(this)
  );
};

/**
 * Remove keydown event listener.
 */
Game.prototype.removeEventListener = function() {
  return document.body.removeEventListener(
    'keydown',
    this.handleOnKeyDown.bind(this)
  );
};

/**
 * Reset the game score.
 */
Game.prototype.clearScore = function() {
  Object.assign(this.properties.scoring, {
    level: 0,
    lines: 0,
    score: 0
  });
};

/**
 * Increment the game score based on the score multiplier.
 */
Game.prototype.incrementScore = function(fullRows) {
  Object.assign(this.properties.scoring, {
    score: this.properties.scoring.score + Game.scoring.multiplier[fullRows - 1]
  });
};

/**
 * Increment the game lines cleared based on the amount of lines scored.
 */
Game.prototype.incrementLines = function(fullRows) {
  Object.assign(this.properties.scoring, {
    lines: this.properties.scoring.lines + fullRows
  });
};

/**
 * Increment the game level based on the amount of lines required to level up.
 */
Game.prototype.incrementLevel = function() {
  if (
    this.properties.scoring.lines >=
    Game.scoring.linesToLevelUp +
      this.properties.scoring.level * Game.scoring.linesToLevelUp
  ) {
    Object.assign(this.properties.scoring, {
      level: this.properties.scoring.level + 1
    });
    this.properties.speed -= Game.speed.change;
  }
};

/**
 * Score event handler.
 */
Game.prototype.handleOnScore = function() {
  const fullRows = this.board.findFullRows().length;
  if (fullRows > 0) {
    fullRows && this.incrementScore(fullRows);
    fullRows && this.incrementLines(fullRows);
    fullRows && this.incrementLevel();
  }
};

/**
 * Create the current and next tetromino pieces. The current tetromino is set
 * to playable status.
 */
Game.prototype.createTetrominoes = function() {
  Object.assign(this.properties.tetromino, {
    current: new Tetromino(this, true),
    next: new Tetromino(this, false)
  });
};

/**
 * Promotes the next tetromino to be the current tetromino. The former current
 * tetromino is garbage collected.
 */
Game.prototype.promoteTetrominoes = function() {
  Object.assign(this.properties.tetromino, {
    current: this.properties.tetromino.next,
    next: new Tetromino(this, false)
  });
  Object.assign(this.properties.tetromino.current, { isPlayable: true });
};

/**
 * Nulls the current and next tetrominoes to the garbage collected.
 */
Game.prototype.destroyTetrominoes = function() {
  Object.assign(this.properties.tetromino, {
    current: null,
    next: null
  });
};

/**
 * Sets the game to the paused state.
 */
Game.prototype.pause = function() {
  Object.assign(this.properties, {
    dropStart: new Date(),
    state: Game.state.paused
  });
  this.sideboard.pause();
};

/**
 * Sets the game from the paused state to the playing state.
 */
Game.prototype.resume = function() {
  Object.assign(this.properties, {
    dropStart: 0,
    state: Game.state.playing
  });
  this.sideboard.reset();
};

/**
 * Sets the game to the paused over. If the player made it to the high score
 * list, set the game to the newHighScore state.
 */
Game.prototype.over = function() {
  this.board.fillGameOverLabel();
  this.newHighScore.compareScores().then(isScoreHigh => {
    if (isScoreHigh) {
      this.newHighScore.init();
      Object.assign(this.properties, { state: Game.state.newHighScore });
    }
  });
};

/**
 * Actions to be taken on one game tick. Tick speed is determined by dropStart.
 */
Game.prototype.tick = function() {
  const tickStamp = new Date();
  if (
    this.properties.state === Game.state.playing &&
    tickStamp - this.properties.dropStart >= this.properties.speed
  ) {
    Object.assign(this.properties, { dropStart: tickStamp });
    if (this.properties.tetromino.current.isPlayable) {
      this.properties.tetromino.current.moveDown();
    } else {
      this.promoteTetrominoes();
      this.handleOnScore();
      this.board.handleOnScore();
      this.sideboard.reset();
    }
  }
};

/**
 * Main game loop.
 */
Game.prototype.loop = function() {
  this.properties.animationFrame = window.requestAnimationFrame(() => {
    if (this.properties.state === Game.state.over) {
      this.over();
    } else {
      this.tick();
      this.loop();
    }
  });
};

/**
 * Reset the game to the initialized state.
 */
Game.prototype.reset = function() {
  window.cancelAnimationFrame(this.properties.animationFrame);
  this.clearScore();
  this.destroyTetrominoes();
  this.board.reset();
};

/**
 * Sets the game from the initialized or paused state to the playing state.
 */
Game.prototype.start = function() {
  this.reset();
  this.board.reset();
  this.createTetrominoes();
  this.sideboard.reset();
  Object.assign(this.properties, {
    dropStart: new Date(),
    state: Game.state.playing
  });
  this.loop();
};

/**
 * Sets the game to the initialized state.
 */
Game.prototype.quit = function() {
  this.reset();
  this.board.fillGameStartLabel();
  this.highScoreboard.init();
  this.setShowScoreForm(false);
  Object.assign(this.properties, { state: Game.state.init });
};

/**
 * Garbage collects all game property references, and removes the keydown event
 * listener.
 */
Game.prototype.dispose = function() {
  this.reset();
  this.removeEventListener();
};

export default Game;
