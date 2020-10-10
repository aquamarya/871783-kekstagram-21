'use strict';

(() => {
  const Scale = {
    MIN_VALUE: 25,
    MAX_VALUE: 100,
    STEP: 25
  };
  const Chrome = {
    MIN: 0,
    MAX: 1
  };
  const Sepia = {
    MIN: 0,
    MAX: 1
  };
  const Marvin = {
    MIN: 0,
    MAX: 100
  };
  const Phobos = {
    MIN: 0,
    MAX: 3
  };
  const Heat = {
    MIN: 1,
    MAX: 3
  };
  const MAX_EFFECT_LEVEL = 100;

  const viewPhotoItem = document.querySelector(`.img-upload__preview img`);
  const effectBar = document.querySelector(`.effect-level`);
  const effectLevelValue = effectBar.querySelector(`.effect-level__value`);
  const effectToggleItem = effectBar.querySelector(`.effect-level__pin`);
  const effectDepthItem = effectBar.querySelector(`.effect-level__depth`);

  const editPhotoItemChangeHandler = (evt) => {
    if (evt.target.matches(`input[type="radio"]`)) {
      viewPhotoItem.style.filter = ``;
      const currentFilter = evt.target.value;
      viewPhotoItem.classList.remove(`effects__preview--${currentFilter}`);
      if (evt.target.matches(`input[value="none"]`)) {
        effectBar.classList.add(`hidden`);
      } else {
        effectBar.classList.remove(`hidden`);
        viewPhotoItem.classList.add(`effects__preview--${currentFilter}`);
        viewPhotoItem.style.filter = ``;
      }
    }
  };

  const renderEffectBar = () => {
    if (effectBar.classList.contains(`hidden`)) {
      effectBar.classList.remove(`hidden`);
    }
  };

  const removeEffect = () => {
    const effects = Array.from(viewPhotoItem.classList);
    effects.forEach((effect) => {
      if (effect.match(`effects__preview--`)) {
        viewPhotoItem.classList.remove(effect);
      }
    });
  };

  const applyFilter = (effect, showEffectBar = true) => {
    if (showEffectBar) {
      renderEffectBar();
      setDefaultDepthLevel();
    } else {
      effectBar.classList.add(`hidden`);
    }
    removeEffect();
    viewPhotoItem.classList.add(effect);
  };

  const filterChangeHandler = (evt) => {
    switch (evt.target.id) {
      case `effect-none`:
        applyFilter(`effects__preview--none`);
        break;
      case `effect-chrome`:
        applyFilter(`effects__preview--chrome`);
        break;
      case `effect-sepia`:
        applyFilter(`effects__preview--sepia`);
        break;
      case `effect-marvin`:
        applyFilter(`effects__preview--marvin`);
        break;
      case `effect-phobos`:
        applyFilter(`effects__preview--phobos`);
        break;
      case `effect-heat`:
        applyFilter(`effects__preview--heat`);
        break;
    }
  };

  document.querySelectorAll(`.effects__radio`).forEach((effectsItem) => {
    effectsItem.addEventListener(`click`, filterChangeHandler);
  });

  const setDefaultDepthLevel = () => {
    effectToggleItem.style.left = `${MAX_EFFECT_LEVEL}%`;
    effectDepthItem.style.width = `${MAX_EFFECT_LEVEL}%`;
    effectLevelValue.value = `${MAX_EFFECT_LEVEL}`;
    viewPhotoItem.style.filter = ``;
  };

  const getEffectDepth = (depth) => ((effectLevelValue.value * (depth.max - depth.min)) / MAX_EFFECT_LEVEL) + depth.min;

  const createNewDepthLevel = () => {
    const effectsNames = Array.from(viewPhotoItem.classList);
    for (let effectsName of effectsNames) {
      if (effectsName.match(`effects__preview--`)) {
        switch (effectsName) {
          case `effects__preview--chrome`:
            viewPhotoItem.style.filter = `grayscale(${getEffectDepth}(${Chrome}))`;
            break;
          case `effects__preview--sepia`:
            viewPhotoItem.style.filter = `sepia(${getEffectDepth}(${Sepia}))`;
            break;
          case `effects__preview--marvin`:
            viewPhotoItem.style.filter = `invert(${getEffectDepth}(${Marvin})%)`;
            break;
          case `effects__preview--phobos`:
            viewPhotoItem.style.filter = `blur(${getEffectDepth}(${Phobos})px)`;
            break;
          case `effects__preview--heat`:
            viewPhotoItem.style.filter = `brightness(${getEffectDepth}(${Heat}))`;
            break;
          default:
            viewPhotoItem.style.filter = ``;
        }
      }
    }
  };

  // Масштабирование изображения
  const scaleControls = document.querySelector(`.scale`);
  const scaleSmallerButton = scaleControls.querySelector(`.scale__control--smaller`);
  const scaleBiggerButton = scaleControls.querySelector(`.scale__control--bigger`);
  const editScaleValue = scaleControls.querySelector(`.scale__control--value`);

  const getScaleValue = () => {
    return parseInt(editScaleValue.value, 10);
  };

  const getScaleRange = (value) => {
    return Math.min(Scale.MAX_VALUE, Math.max(Scale.MIN_VALUE, value));
  };

  const smallerButtonClickHandler = () => {
    calculateScale(getScaleValue() - Scale.STEP);
  };

  const calculateScale = (newValue) => {
    const newScaleValue = getScaleRange(newValue);
    editScaleValue.value = `${newScaleValue}%`;
    viewPhotoItem.style.transform = `scale(${newScaleValue / 100})`;
  };

  const biggerButtonClickHandler = () => {
    calculateScale(getScaleValue() + Scale.STEP);
  };

  window.editor = {
    editPhotoItemChangeHandler,
    setDefaultDepthLevel,
    createNewDepthLevel,
    removeEffect,
    scaleSmallerButton,
    scaleBiggerButton,
    biggerButtonClickHandler,
    smallerButtonClickHandler
  };
})();
