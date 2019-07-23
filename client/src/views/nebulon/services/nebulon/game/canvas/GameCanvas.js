import { grey } from '../../../../../../services/color/muiColors';

class GameCanvas {
  // ==========================================================================
  // Static properties
  // ==========================================================================

  /**
   * GameCanvas size.
   * @type {Object}
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
   * @param {HTMLElement} canvasRef
   * @constructor
   */
  constructor(canvasRef) {
    /**
     * Html5 canvas element parent div.
     * @type {HTMLElement}
     */
    this.parentDiv = document.getElementById('router--route-section--section');
    /**
     * Unit represents the width and height of a cell in the canvas.
     * @type {number}
     */
    this.unit =
      window
        .getComputedStyle(this.parentDiv)
        .getPropertyValue('height')
        .split('px')[0] / GameCanvas.size.height;
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/GameCanvasRenderingContext2D
     */
    this.context = canvasRef.getContext('2d');
    this.init(canvasRef);
  }

  init(canvasRef) {
    // Set the canvas width, height.
    canvasRef.width = GameCanvas.size.width * this.unit;
    canvasRef.height = GameCanvas.size.height * this.unit;
  }

  // ==========================================================================
  // Draw methods
  // ==========================================================================

  /**
   * Draw a canvas rectangle.
   * @param {string=} fillStyle
   * @param {string=} strokeStyle
   * @param {number=} lineWidth
   * @param {number} height
   * @param {number} width
   * @param {number} x
   * @param {number} y
   */
  drawRect = ({ fillStyle, strokeStyle, lineWidth, width, height, x, y }) => {
    const dimensions = [x, y, width, height].map(value => value * this.unit);
    this.context.fillStyle = fillStyle || grey[50].light;
    this.context.fillRect(
      dimensions[0],
      dimensions[1],
      dimensions[2],
      dimensions[3]
    );
    if (strokeStyle) {
      this.context.strokeStyle = strokeStyle;
      this.context.lineWidth = lineWidth || 5;
      this.context.strokeRect(
        dimensions[0],
        dimensions[1],
        dimensions[2],
        dimensions[3]
      );
    }
  };

  /**
   * Draw a canvas triangle.
   * @param {string=} fillStyle
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {number} x3
   * @param {number} y3
   */
  drawTriangle = ({ fillStyle, x1, y1, x2, y2, x3, y3 }) => {
    const points = [x1, y1, x2, y2, x3, y3].map(value => value * this.unit);
    this.context.fillStyle = fillStyle || grey[50].light;
    this.context.fill();
    this.context.beginPath();
    this.context.moveTo(points[0], points[1]);
    this.context.lineTo(points[2], points[3]);
    this.context.lineTo(points[4], points[5]);
    this.context.fill();
  };

  /**
   * Draw canvas text.
   * @param {string=} fillStyle
   * @param {string} text
   * @param {number=} size
   * @param {number} x
   * @param {number} y
   */
  drawText = ({ fillStyle, text, size, x, y }) => {
    x *= this.unit;
    y *= this.unit;
    size *= this.unit;
    this.context.fillStyle = fillStyle || grey[50].light;
    this.context.font = `${size || this.unit}px "${GameCanvas.font}"`;
    this.context.fillText(text, x, y);
  };

  /**
   * Draw canvas image.
   * @param {string} image
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  drawImage = (image, { x, y }, { width, height }) => {
    this.context.drawImage(
      image,
      x * this.unit,
      y * this.unit,
      width * this.unit,
      height * this.unit
    );
  };

  /**
   * Draw canvas rotated image.
   * @param {string} image
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {number} degrees
   */
  drawRotatedImage = (image, { x, y }, { width, height }, degrees) => {
    this.context.save();
    this.context.rotate(degrees);
    this.context.drawImage(
      image,
      -x * this.unit,
      -y * this.unit,
      -width * this.unit,
      -height * this.unit
    );
    this.context.restore();
  };
}

export default GameCanvas;
