export const randomNumber = (min, max) => Math.random() * (max - min) + min;

export const randomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const pickRandom = (array) =>
  array.length > 0 && array[Math.floor(Math.random() * array.length)];
