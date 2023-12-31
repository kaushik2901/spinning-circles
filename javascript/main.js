import Animation from "./animation.js";
import Point from "./point.js";

const addEventListeners = (animation) => {
  window.mouseMoveEventSubscription = window.addEventListener(
    "mousemove",
    (event) => {
      animation.setupCenters([new Point(event.offsetX, event.offsetY)]);
    }
  );

  window.touchStartEventSubscription = window.addEventListener(
    "touchstart",
    (event) => {
      const centers = Array.from(event.touches)
        .sort((a, b) => a - b)
        .map((touch) => new Point(touch.clientX, touch.clientY));
      animation.setupCenters(centers);
    }
  );

  window.touchMoveEventSubscription = window.addEventListener(
    "touchmove",
    (event) => {
      const centers = Array.from(event.touches)
        .sort((a, b) => a - b)
        .map((touch) => new Point(touch.clientX, touch.clientY));
      animation.updateCenters(centers);
    }
  );

  window.touchEndEventSubscription = window.addEventListener(
    "touchend",
    (event) => {
      console.log("touchEnd");
      const centers = Array.from(event.changedTouches)
        .sort((a, b) => a - b)
        .map((touch) => new Point(touch.clientX, touch.clientY));
      animation.setupCenters(centers);
    }
  );

  window.colorSchemeChangeEventSubscription = window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      const colorScheme = e.matches ? "dark" : "light";
      animation.updateColorScheme(colorScheme);
    });
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

  if (window.touchEndEventSubscription) {
    window.removeEventListener(window.touchEndEventSubscription);
  }

  if (window.colorSchemeChangeEventSubscription) {
    window.removeEventListener(window.colorSchemeChangeEventSubscription);
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

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const context = canvas.getContext("2d");

  const animation = new Animation(
    context,
    window.innerWidth,
    window.innerHeight,
    isDarkMode ? "dark" : "light"
  );

  addEventListeners(animation);

  const animationLoop = () => {
    animation.animate();
    window.currentAnimationFrame = requestAnimationFrame(animationLoop);
  };

  animationLoop();
};
