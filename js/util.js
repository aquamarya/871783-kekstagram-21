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

  // Тасование Фишера — Йетса:
  // проходить по массиву в обратном порядке
  // и менять местами каждый элемент со случайным элементом, который находится перед ним
  const shufflePhotos = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

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
    shufflePhotos,
    debounce
  };
})();
