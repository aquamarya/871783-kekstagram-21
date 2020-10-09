'use strict';

(() => {
  const uploadForm = document.querySelector(`.img-upload__form`);
  const fileUploadStart = uploadForm.querySelector(`#upload-file`);
  const editPhotoItem = uploadForm.querySelector(`.img-upload__overlay`);
  const descriptionInput = uploadForm.querySelector(`.text__description`);
  const effectBar = document.querySelector(`.effect-level`);
  const viewPhotoItem = uploadForm.querySelector(`.img-upload__preview img`);
  const closeButton = document.querySelector(`#upload-cancel`);
  const scaleControls = uploadForm.querySelector(`.scale`);
  const scaleSmallerButton = scaleControls.querySelector(`.scale__control--smaller`);
  const scaleBiggerButton = scaleControls.querySelector(`.scale__control--bigger`);
  const editScaleValue = scaleControls.querySelector(`.scale__control--value`);
  const hashtagsInput = uploadForm.querySelector(`.text__hashtags`);


  const editFormEscKeydownHandler = (evt) => {
    if (hashtagsInput !== document.activeElement && descriptionInput !== document.activeElement && evt.key === window.util.ESC_KEY) {
      closeEditForm();
    }
  };

  const openEditForm = () => {
    editPhotoItem.classList.remove(`hidden`);
    document.addEventListener(`keydown`, editFormEscKeydownHandler);
    document.querySelector(`body`).classList.add(`modal-open`);
    editPhotoItem.addEventListener(`change`, window.editor.editPhotoItemChangeHandler);
    effectBar.classList.add(`hidden`);
    scaleSmallerButton.addEventListener(`click`, window.editor.mallerButtonClickHandler);
    scaleBiggerButton.addEventListener(`click`, window.editor.biggerButtonClickHandler);
    hashtagsInput.addEventListener(`input`, window.validation.hashtagInputHandler);
  };

  const closeEditForm = () => {
    editPhotoItem.classList.add(`hidden`);
    document.removeEventListener(`keydown`, editFormEscKeydownHandler);
    fileUploadStart.value = ``;
    viewPhotoItem.style.filter = ``;
    viewPhotoItem.style.transform = ``;
    editScaleValue.value = 100 + `%`;
    document.querySelector(`body`).classList.remove(`modal-open`);
    editPhotoItem.removeEventListener(`change`, window.editor.editPhotoItemChangeHandler);
    scaleSmallerButton.removeEventListener(`click`, window.editor.smallerButtonClickHandler);
    scaleBiggerButton.removeEventListener(`click`, window.editor.biggerButtonClickHandler);
    hashtagsInput.removeEventListener(`input`, window.validation.hashtagInputHandler);
  };

  fileUploadStart.addEventListener(`change`, (evt) => {
    evt.preventDefault();
    openEditForm();
  });

  closeButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    closeEditForm();
  });
})();
