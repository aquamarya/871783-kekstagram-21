'use strict';

(() => {
  const ESC_KEY = `Escape`;

  // Возвращает результат, включая максимум и минимум
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Возвращает случайный элемент массива
  const getRandomArrayElement = (array) => array[getRandomIntInclusive(0, array.length - 1)];

  window.util = {
    ESC_KEY,
    getRandomIntInclusive,
    getRandomArrayElement
  };
})();
