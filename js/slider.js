'use strict';

(() => {
  const effectBar = document.querySelector(`.effect-level`);
  const effectLevelValue = effectBar.querySelector(`.effect-level__value`);
  const effectToggleItem = effectBar.querySelector(`.effect-level__pin`);
  const effectLevelLine = effectBar.querySelector(`.effect-level__line`);
  const effectDepthItem = effectBar.querySelector(`.effect-level__depth`);

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
        window.editor.createNewDepthLevel(effectLevelValue.value);
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

})();
