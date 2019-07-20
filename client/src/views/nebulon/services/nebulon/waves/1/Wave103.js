import Wave from '../Wave';
import Hookneck from '../../entities/gameplay/ships/boss/hookneck/Hookneck';
import Sideroost from '../../entities/gameplay/ships/difficulty-easy/sideroost/Sideroost';

class Wave103 extends Wave {
  // ==========================================================================
  // Create enemies methods
  // ==========================================================================

  /**
   * @see Wave.createEnemies
   * @override
   */
  createEnemies = () => {
    this.hookneck1 = new Hookneck(
      this.game,
      this.centerX - 27 / 4,
      -this.entityHeight
    );
    this.sideroost1 = new Sideroost(
      this.game,
      this.entityWidth,
      -this.entityHeight * 2
    );
    this.sideroost2 = new Sideroost(
      this.game,
      this.canvasWidth - this.entityWidth * 2,
      -this.entityHeight * 2
    );
    this.sideroost3 = new Sideroost(
      this.game,
      this.entityWidth,
      -this.entityHeight * 2 - this.canvasHeight / 2
    );
    this.sideroost4 = new Sideroost(
      this.game,
      this.canvasWidth - this.entityWidth * 2,
      -this.entityHeight * 2 - this.canvasHeight / 2
    );
  };

  /**
   * @see Wave.addToEntities
   * @override
   */
  addToEntities = () => {
    this.addEntity(this.hookneck1);
    this.addEntity(this.sideroost1);
    this.addEntity(this.sideroost2);
    this.addEntity(this.sideroost3);
    this.addEntity(this.sideroost4);
  };

  // ==========================================================================
  // Wave enemy path methods
  // ==========================================================================

  /**
   * @see Wave.createEnemyPaths
   * @override
   */
  createEnemyPaths = () => {
    this.hookneck1Path = [
      {
        x: this.centerX - 27 / 4,
        y: this.centerY
      }
    ];
    this.sideroost1Path = [
      {
        x: this.entityWidth,
        y: this.canvasHeight + this.entityHeight * 2
      }
    ];
    this.sideroost2Path = [
      {
        x: this.canvasWidth - this.entityWidth * 2,
        y: this.canvasHeight + this.entityHeight * 2
      }
    ];
    this.sideroost3Path = [
      {
        x: this.entityWidth,
        y: this.canvasHeight + this.entityHeight * 2
      }
    ];
    this.sideroost4Path = [
      {
        x: this.canvasWidth - this.entityWidth * 2,
        y: this.canvasHeight + this.entityHeight * 2
      }
    ];
  };

  loopSideroost1Path = () => {
    this.sideroost1.movePath(this.sideroost1Path).then(() => {
      this.sideroost1.position.y = -this.entityHeight * 2;
      this.loopSideroost1Path();
    });
  };

  loopSideroost2Path = () => {
    this.sideroost2.movePath(this.sideroost2Path).then(() => {
      this.sideroost2.position.y = -this.entityHeight * 2;
      this.loopSideroost2Path();
    });
  };

  loopSideroost3Path = () => {
    this.sideroost3.movePath(this.sideroost3Path).then(() => {
      this.sideroost3.position.y = -this.entityHeight * 2;
      this.loopSideroost1Path();
    });
  };

  loopSideroost4Path = () => {
    this.sideroost4.movePath(this.sideroost4Path).then(() => {
      this.sideroost4.position.y = -this.entityHeight * 2;
      this.loopSideroost2Path();
    });
  };

  /**
   * @see Wave.doPaths
   * @override
   */
  doPaths = () => {
    this.hookneck1.movePath(this.hookneck1Path).then(() => {
      this.hookneck1.setRoamingStatus(true);
    });
    this.loopSideroost1Path();
    this.loopSideroost2Path();
    this.loopSideroost3Path();
    this.loopSideroost4Path();
  };
}

export default Wave103;
