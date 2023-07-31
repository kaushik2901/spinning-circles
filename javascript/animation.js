import Circle from "./circle.js";
import Point from "./point.js";
import { randomColor, randomNumber, pickRandom } from "./util.js";

export default class Animation {
  /** @type {CanvasRenderingContext2D} */
  #context;

  /** @type {number} */
  #frameWidth;

  /** @type {number} */
  #frameHeight;

  /** @type {Circle[]} */
  #circles;

  /** @type {string} */
  #backgroundColor = "rgba(0, 0, 0, 0.08)";

  constructor(context, frameWidth, frameHeight) {
    this.#context = context;
    this.#frameWidth = frameWidth;
    this.#frameHeight = frameHeight;

    this.#circles = Array.from({ length: 50 }).map(
      (_, i) =>
        new Circle(
          context,
          new Point(frameWidth / 2, frameHeight / 2),
          i * 3 + 10,
          randomNumber(0, 1000),
          randomNumber(0.01, 0.02),
          randomColor()
        )
    );
  }

  animate() {
    this.#context.fillStyle = this.#backgroundColor;
    this.#context.fillRect(0, 0, this.#frameWidth, this.#frameHeight);
    this.#circles.forEach((circle) => {
      circle.draw();
      circle.update();
    });
  }

  updateCenter(centers) {
    this.#circles.forEach((circle) => {
      const center = pickRandom(centers);
      circle.updateCenter(center);
    });
  }
}
