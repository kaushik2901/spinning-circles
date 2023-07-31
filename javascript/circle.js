import Point from "./point.js";

export default class Circle {
  /** @type {CanvasRenderingContext2D} */
  #context;

  /** @type {Point} */
  #center;

  /** @type {number} */
  #radius;

  /** @type {number} */
  #position;

  /** @type {number} */
  #speed;

  /** @type {string} */
  #color;

  /** @type {Point} */
  #targetCenter;

  constructor(context, center, radius, position, speed, color) {
    this.#context = context;
    this.#center = center;
    this.#radius = radius;
    this.#position = position;
    this.#speed = speed;
    this.#color = color;
    this.#targetCenter = this.#center.copy();
  }

  draw() {
    this.#context.fillStyle = this.#color;
    this.#context.fillRect(
      this.#center.x + this.#radius * Math.cos(this.#position),
      this.#center.y + this.#radius * Math.sin(this.#position),
      2,
      2
    );
  }

  update() {
    this.#position += this.#speed;

    const distance = this.#center.distance(this.#targetCenter);

    if (!Number.isNaN(distance) && distance > 0.01) {
      const xDifference = this.#targetCenter.x - this.#center.x;
      const yDifference = this.#targetCenter.y - this.#center.y;

      this.#center.x += xDifference / 60;
      this.#center.y += yDifference / 60;
    }
  }

  updateCenter(targetCenter) {
    this.#targetCenter = targetCenter;
  }
}
