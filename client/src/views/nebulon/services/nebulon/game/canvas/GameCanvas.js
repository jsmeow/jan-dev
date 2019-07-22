import { grey } from '../../../../../../services/color/muiColors';

class GameCanvas {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * GameCanvas size.
   * @type {{width: number, height: number}}
   */
  static size = {
    width: 189,
    height: 189
  };

  /**
   * GameCanvas font.
   * Obtained from https://fonts.google.com/specimen/Press+Start+2P
   * @type {string}
   */
  static font = 'Press Start 2P';

  // ==========================================================================
  // Constructor and init methods
  // ==========================================================================

  /**
   * @param {HTMLElement} canvasRef - The reference to the DOM element html5 canvas.
   * @constructor
   */
  constructor(canvasRef) {
    /**
     * GameCanvas DOM element parent div.
     * @type {HTMLElement}
     */
    this.gameCanvasContainer = document.getElementById(
      'router--route-section--section'
    );
    /**
     * GameCanvas unit represents the width and height of a cell in the canvas.
     * @type {number}
     */
    this.gameCanvasUnit =
      window
        .getComputedStyle(this.gameCanvasContainer)
        .getPropertyValue('height')
        .split('px')[0] / GameCanvas.size.height;
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/GameCanvasRenderingContext2D
     */
    this.gameCanvasContext = canvasRef.getContext('2d');
    this.init(canvasRef);
  }

  init(canvasRef) {
    // Set the canvas width, height.
    canvasRef.width = GameCanvas.size.width * this.gameCanvasUnit;
    canvasRef.height = GameCanvas.size.height * this.gameCanvasUnit;
  }

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  /**
   * GameCanvas draw a canvas rectangle.
   * @param {string=} fillStyle
   * @param {string=} strokeStyle
   * @param {number=} lineWidth
   * @param {number} height
   * @param {number} width
   * @param {number} x
   * @param {number} y
   */
  drawGameCanvasRect = ({
    fillStyle,
    strokeStyle,
    lineWidth,
    width,
    height,
    x,
    y
  }) => {
    const dimensions = [x, y, width, height].map(
      value => value * this.gameCanvasUnit
    );
    this.gameCanvasContext.fillStyle = fillStyle || grey[50].light;
    this.gameCanvasContext.fillRect(
      dimensions[0],
      dimensions[1],
      dimensions[2],
      dimensions[3]
    );
    if (strokeStyle) {
      this.gameCanvasContext.strokeStyle = strokeStyle;
      this.gameCanvasContext.lineWidth = lineWidth || 5;
      this.gameCanvasContext.strokeRect(
        dimensions[0],
        dimensions[1],
        dimensions[2],
        dimensions[3]
      );
    }
  };

  /**
   * GameCanvas draw a canvas triangle.
   * @param {string=} fillStyle
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {number} x3
   * @param {number} y3
   */
  drawGameCanvasTriangle = ({ fillStyle, x1, y1, x2, y2, x3, y3 }) => {
    const points = [x1, y1, x2, y2, x3, y3].map(
      value => value * this.gameCanvasUnit
    );
    this.gameCanvasContext.fillStyle = fillStyle || grey[50].light;
    this.gameCanvasContext.fill();
    this.gameCanvasContext.beginPath();
    this.gameCanvasContext.moveTo(points[0], points[1]);
    this.gameCanvasContext.lineTo(points[2], points[3]);
    this.gameCanvasContext.lineTo(points[4], points[5]);
    this.gameCanvasContext.fill();
  };

  /**
   * GameCanvas draw canvas text.
   * @param {string=} fillStyle
   * @param {string} text
   * @param {number=} size
   * @param {number} x
   * @param {number} y
   */
  drawGameCanvasText = ({ fillStyle, text, size, x, y }) => {
    x *= this.gameCanvasUnit;
    y *= this.gameCanvasUnit;
    size *= this.gameCanvasUnit;
    this.gameCanvasContext.fillStyle = fillStyle || grey[50].light;
    this.gameCanvasContext.font = `${size || this.gameCanvasUnit}px "${
      GameCanvas.font
    }"`;
    this.gameCanvasContext.fillText(text, x, y);
  };

  /**
   * GameCanvas draw canvas image.
   * @param {HTMLElement} image
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  drawGameCanvasImage = (image, { x, y }, { width, height }) => {
    this.gameCanvasContext.drawImage(
      image,
      x * this.gameCanvasUnit,
      y * this.gameCanvasUnit,
      width * this.gameCanvasUnit,
      height * this.gameCanvasUnit
    );
  };

  /**
   * GameCanvas draw canvas rotated image.
   * @param {HTMLElement} image
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} degrees
   */
  drawGameCanvasRotatedImage = (
    image,
    { x, y },
    { width, height },
    degrees
  ) => {
    this.game.gameCanvas.context.save();
    this.game.gameCanvas.context.rotate(degrees);
    this.gameCanvasContext.drawImage(
      image,
      -x * this.gameCanvasUnit,
      -y * this.gameCanvasUnit,
      -width * this.gameCanvasUnit,
      -height * this.gameCanvasUnit
    );
    this.game.gameCanvas.context.restore();
  };
}

export default GameCanvas;
