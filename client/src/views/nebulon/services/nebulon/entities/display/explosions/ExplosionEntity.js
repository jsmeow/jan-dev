import Game from '../../../game/Game';
import GameDisplayEntity from '../GameDisplayEntity';

class ExplosionEntity extends GameDisplayEntity {
  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param game
   * @param {number|*} x
   * @param {number|*} y
   * @param {number|*} width
   * @param {number|*} height
   * @constructor
   */
  constructor(game, { x, y }, { width, height } = {}) {
    super(game, { x, y });
    /**
     * ExplosionEntity images.
     * An explosion will always have a 4 image animation.
     * @type {HTMLElement}
     */
    this.explosionImage1 = new Image();
    this.explosionImage2 = new Image();
    this.explosionImage3 = new Image();
    this.explosionImage4 = new Image();
    /**
     * ExplosionEntity image sources.
     * To be implemented by the extending class.
     * @type {HTMLElement}
     */
    this.explosionImage1Src = null;
    this.explosionImage2Src = null;
    this.explosionImage3Src = null;
    this.explosionImage4Src = null;
    /**
     * ExplosionEntity status flag if currently exploding.
     * @type {boolean}
     */
    this.explodingStatus = false;
    /**
     * Current draw image function.
     * @type {function|*}
     */
    this.currentDrawFunction = null;
    /**
     * ExplosionEntity image timeout references.
     * @type {number}
     */
    this.drawExplosionTimeout1 = 0;
    this.drawExplosionTimeout2 = 0;
    this.drawExplosionTimeout3 = 0;
    this.drawExplosionTimeout4 = 0;
    /**
     * ExplosionEntity draw setTimeout delay relative to the game speed.
     * Defaults to game speed * 50ms.
     * @type {number}
     */
    this.drawExplosionTimeoutDelay = Game.speed * 75;
    this.init(width, height);
  }

  /**
   * @override
   */
  init = (width, height) => {
    this.setGameEntitySize({
      width: width || GameDisplayEntity.defaultSize.width,
      height: height || GameDisplayEntity.defaultSize.height
    });
    this.explosionImage1.src = this.explosionImage1Src;
    this.explosionImage2.src = this.explosionImage2Src;
    this.explosionImage3.src = this.explosionImage3Src;
    this.explosionImage4.src = this.explosionImage4Src;
  };

  // ==========================================================================
  // Setter methods
  // ==========================================================================

  /**
   * Explosion status setter.
   * @param {boolean} newExplosionStatus
   */
  setExplosionStatus = newExplosionStatus => {
    this.explodingStatus = newExplosionStatus;
  };

  /**
   * Current draw explosion function setter.
   * @param {function} newCurrentDrawFunction
   */
  setCurrentDrawFunction = newCurrentDrawFunction => {
    this.currentDrawFunction = newCurrentDrawFunction;
  };

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  drawExplosion1 = () => {
    this.game.gameCanvas.context.drawImage(
      this.explosionImage1,
      this.position.x * this.game.gameCanvas.unit,
      this.position.y * this.game.gameCanvas.unit,
      this.size.width * this.game.gameCanvas.unit,
      this.size.height * this.game.gameCanvas.unit
    );
  };

  drawExplosion2 = () => {
    this.game.gameCanvas.context.drawImage(
      this.explosionImage2,
      this.position.x * this.game.gameCanvas.unit,
      this.position.y * this.game.gameCanvas.unit,
      this.size.width * this.game.gameCanvas.unit,
      this.size.height * this.game.gameCanvas.unit
    );
  };

  drawExplosion3 = () => {
    this.game.gameCanvas.context.drawImage(
      this.explosionImage3,
      this.position.x * this.game.gameCanvas.unit,
      this.position.y * this.game.gameCanvas.unit,
      this.size.width * this.game.gameCanvas.unit,
      this.size.height * this.game.gameCanvas.unit
    );
  };

  drawExplosion4 = () => {
    this.game.gameCanvas.context.drawImage(
      this.explosionImage4,
      this.position.x * this.game.gameCanvas.unit,
      this.position.y * this.game.gameCanvas.unit,
      this.size.width * this.game.gameCanvas.unit,
      this.size.height * this.game.gameCanvas.unit
    );
  };

  // ==========================================================================
  // Animation methods
  // ==========================================================================

  /**
   * Start explosion 1.
   * @return {Promise<any>}
   */
  startExplosion1 = () => {
    this.setCurrentDrawFunction(this.drawExplosion1);
    return new Promise(resolve => {
      this.drawExplosionTimeout1 = setTimeout(() => {
        resolve();
      }, this.drawExplosionTimeoutDelay);
    });
  };

  /**
   * Start explosion 2.
   * @return {Promise<any>}
   */
  startExplosion2 = () => {
    this.setCurrentDrawFunction(this.drawExplosion2);
    return new Promise(resolve => {
      this.drawExplosionTimeout2 = setTimeout(() => {
        resolve();
      }, this.drawExplosionTimeoutDelay);
    });
  };

  /**
   * Start explosion 3.
   * @return {Promise<any>}
   */
  startExplosion3 = () => {
    this.setCurrentDrawFunction(this.drawExplosion3);
    return new Promise(resolve => {
      this.drawExplosionTimeout3 = setTimeout(() => {
        resolve();
      }, this.drawExplosionTimeoutDelay);
    });
  };

  /**
   * Start explosion 4.
   * @return {Promise<any>}
   */
  startExplosion4 = () => {
    this.setCurrentDrawFunction(this.drawExplosion4);
    return new Promise(resolve => {
      this.drawExplosionTimeout4 = setTimeout(() => {
        resolve();
      }, this.drawExplosionTimeoutDelay);
    });
  };

  // ==========================================================================
  // Tick methods
  // ==========================================================================

  /**
   * @override
   */
  onTick = entIdx => {
    if (!this.explodingStatus && !this.currentDrawFunction) {
      this.setExplosionStatus(true);
      this.startExplosion1()
        .then(() => this.startExplosion2())
        .then(() => this.startExplosion3())
        .then(() => this.startExplosion4())
        .then(() => {
          this.setCurrentDrawFunction(null);
          this.disposeDrawExplosionTimeout1();
          this.disposeDrawExplosionTimeout2();
          this.disposeDrawExplosionTimeout3();
          this.disposeDrawExplosionTimeout4();
          this.disposeEntity(entIdx);
        });
    } else {
      this.currentDrawFunction && this.currentDrawFunction();
    }
  };

  // ==========================================================================
  // Disposal methods
  // ==========================================================================

  /**
   * Dispose the draw explosion timeout 1.
   */
  disposeDrawExplosionTimeout1 = () => {
    clearTimeout(this.drawExplosionTimeout1);
    this.drawExplosionTimeout1 = 0;
  };

  /**
   * Dispose the draw explosion timeout 2.
   */
  disposeDrawExplosionTimeout2 = () => {
    clearTimeout(this.drawExplosionTimeout2);
    this.drawExplosionTimeout2 = 0;
  };

  /**
   * Dispose the draw explosion timeout 3.
   */
  disposeDrawExplosionTimeout3 = () => {
    clearTimeout(this.drawExplosionTimeout3);
    this.drawExplosionTimeout3 = 0;
  };

  /**
   * Dispose the draw explosion timeout 4.
   */
  disposeDrawExplosionTimeout4 = () => {
    clearTimeout(this.drawExplosionTimeout4);
    this.drawExplosionTimeout4 = 0;
  };
}

export default ExplosionEntity;
