'use strict';

(() => {
  const ESC_KEY = `Escape`;
  const DEBOUNCE_INTERVAL = 500; // ms

  // Возвращает результат, включая максимум и минимум
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Возвращает случайный элемент массива
  const getRandomArrayElement = (array) => array[getRandomIntInclusive(0, array.length - 1)];

  const debounce = (cb) => {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    ESC_KEY,
    getRandomIntInclusive,
    getRandomArrayElement,
    debounce
  };
})();
