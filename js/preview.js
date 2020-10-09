'use strict';

(() => {
  const bigPictureItem = document.querySelector(`.big-picture`);
  const closeBigPictureButton = bigPictureItem.querySelector(`#picture-cancel`);

  // Отрисовывает большое фото
  const renderBigPictureItem = (pictureData) => {
    bigPictureItem.querySelector(`.big-picture__img img`).src = pictureData.url;
    bigPictureItem.querySelector(`.likes-count`).textContent = pictureData.likes;
    bigPictureItem.querySelector(`.social__caption`).textContent = pictureData.description;
    bigPictureItem.querySelector(`.comments-count`).textContent = pictureData.comments.length;

    bigPictureItem.querySelector(`.social__comment-count `).classList.add(`hidden`);
    bigPictureItem.querySelector(`.comments-loader`).classList.add(`hidden`);

    window.gallery.createCommentsFragment(pictureData.comments);
  };

  // Переключает фотографии из массива объектов
  const closeButtonClickHandler = () => closeBigPicture();

  const bigPictureEscKeydownHandler = (evt) => {
    if (evt.key === window.util.ESC_KEY) {
      closeBigPicture();
    }
  };

  const showBigPicture = (picture) => {
    renderBigPictureItem(picture);
    document.querySelector(`body`).classList.add(`modal-open`);
    bigPictureItem.classList.remove(`hidden`);
    document.addEventListener(`keydown`, bigPictureEscKeydownHandler);
    closeBigPictureButton.addEventListener(`click`, closeButtonClickHandler);
  };

  const closeBigPicture = () => {
    document.querySelector(`body`).classList.remove(`modal-open`);
    bigPictureItem.classList.add(`hidden`);
    document.removeEventListener(`keydown`, bigPictureEscKeydownHandler);
    closeBigPictureButton.removeEventListener(`click`, closeButtonClickHandler);
  };

  window.preview = {
    showBigPicture
  };
})();