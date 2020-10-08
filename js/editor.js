'use strict';

(() => {
  const Scale = {
    MIN_VALUE: 25,
    MAX_VALUE: 100,
    STEP: 25
  };

  const viewPhotoItem = document.querySelector(`.img-upload__preview img`);
  const effectBar = document.querySelector(`.effect-level`);
  const effectLevelValue = effectBar.querySelector(`.effect-level__value`);
  const effectToggleItem = effectBar.querySelector(`.effect-level__pin`);
  const effectLevelLine = effectBar.querySelector(`.effect-level__line`);
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
      }
    }
  };

  // Уровень насыщенности фильтра
  effectBar.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    const lineWidth = effectLevelLine.offsetWidth;
    let startCoords = evt.clientX;
    const toggleMouseMoveHandler = (moveEvt) => {
      moveEvt.preventDefault();
      const shift = startCoords - moveEvt.clientX;
      const toggleCoordsX = effectToggleItem.offsetLeft - shift;
      startCoords = moveEvt.clientX;
      if (!(toggleCoordsX < 0 || toggleCoordsX > lineWidth)) {
        const togglePoint = toggleCoordsX / effectLevelLine.offsetWidth;
        effectToggleItem.style.left = toggleCoordsX + `px`;
        effectLevelValue.value = Math.round(togglePoint * 100);
        effectDepthItem.style.width = togglePoint * 100 + `%`;
      }
    };
    const toggleMouseUpHandler = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, toggleMouseMoveHandler);
      document.removeEventListener(`mouseup`, toggleMouseUpHandler);
    };
    document.addEventListener(`mousemove`, toggleMouseMoveHandler);
    document.addEventListener(`mouseup`, toggleMouseUpHandler);
  });

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
    editPhotoItemChangeHandler: editPhotoItemChangeHandler,
    scaleSmallerButton: scaleSmallerButton,
    scaleBiggerButton: scaleBiggerButton,
    biggerButtonClickHandler: biggerButtonClickHandler,
    smallerButtonClickHandler: smallerButtonClickHandler
  };
})();
