export default class Point {
  x = 0;
  y = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Point(this.x, this.y);
  }

  distance(point) {
    const [x1, y1] = [this.x, this.y];
    const [x2, y2] = [point.x, point.y];

    return Math.sqrt(
      Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2)
    );
  }
}
