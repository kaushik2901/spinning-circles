import Circle from "./circle.js";
import Point from "./point.js";
import { randomColor, randomNumber, randomInteger } from "./util.js";

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

  /** @type {Point[]} */
  #centerCollection;

  /** @type {Map<number, number>} */
  #circleToCenterMap = new Map();

  constructor(context, frameWidth, frameHeight) {
    this.#context = context;
    this.#frameWidth = frameWidth;
    this.#frameHeight = frameHeight;
    this.#centerCollection = [new Point(frameWidth / 2, frameHeight / 2)];

    this.#circles = Array.from({ length: 50 }).map(
      (_, i) =>
        new Circle(
          context,
          this.#centerCollection[0].copy(),
          i * 3 + 10,
          randomNumber(0, 1000),
          randomNumber(0.01, 0.02),
          randomColor()
        )
    );

    this.#circles.forEach((_, index) => this.#circleToCenterMap.set(index, 0));
  }

  animate() {
    this.#context.fillStyle = this.#backgroundColor;
    this.#context.fillRect(0, 0, this.#frameWidth, this.#frameHeight);
    this.#circles.forEach((circle) => {
      circle.draw();
      circle.update();
    });
  }

  setupCenters(centers) {
    this.#centerCollection = centers.map((x) => x.copy());
    this.#circles.forEach((_, index) => {
      this.#circleToCenterMap.set(
        index,
        randomInteger(0, this.#centerCollection.length)
      );
    });
    this.updateCircles();
  }

  updateCenters(centers) {
    this.#centerCollection = centers;
    this.updateCircles();
  }

  updateCircles() {
    this.#circles.forEach((circle, index) => {
      const centerIndex = this.#circleToCenterMap.get(index);
      circle.updateCenter(this.#centerCollection[centerIndex]);
    });
  }
}
