import Animation from "./animation.js";
import Point from "./point.js";

const addEventListeners = (animation) => {
  window.mouseMoveEventSubscription = window.addEventListener(
    "mousemove",
    (event) => {
      animation.updateCenter([new Point(event.offsetX, event.offsetY)]);
    }
  );

  window.touchStartEventSubscription = window.addEventListener(
    "touchstart",
    (event) => {
      const centers = Array.from(event.touches).map(
        (touch) => new Point(touch.clientX, touch.clientY)
      );
      animation.updateCenter(centers);
    }
  );

  window.touchMoveEventSubscription = window.addEventListener(
    "touchmove",
    (event) => {
      const centers = Array.from(event.touches).map(
        (touch) => new Point(touch.clientX, touch.clientY)
      );
      animation.updateCenter(centers);
    }
  );
};

const removeEventListeners = () => {
  if (window.mouseMoveEventSubscription) {
    window.removeEventListener(window.mouseMoveEventSubscription);
  }

  if (window.touchMoveEventSubscription) {
    window.removeEventListener(window.touchMoveEventSubscription);
  }

  if (window.touchStartEventSubscription) {
    window.removeEventListener(window.touchStartEventSubscription);
  }
};

export const main = () => {
  if (window.currentAnimationFrame) {
    cancelAnimationFrame(window.currentAnimationFrame);
  }

  removeEventListeners();

  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const context = canvas.getContext("2d");

  const animation = new Animation(
    context,
    window.innerWidth,
    window.innerHeight
  );

  addEventListeners(animation);

  const animationLoop = () => {
    animation.animate();
    window.currentAnimationFrame = requestAnimationFrame(animationLoop);
  };

  animationLoop();
};
