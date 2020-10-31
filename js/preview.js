'use strict';

(() => {
  const bigPictureItem = document.querySelector(`.big-picture`);
  const closeBigPictureButton = bigPictureItem.querySelector(`#picture-cancel`);
  const commentsLoader = document.querySelector(`.comments-loader`);
  const commentsContainer = document.querySelector(`.social__comments`);
  const socialCommentsCount = document.querySelector(`.social__comment-count`);
  const commentsCount = document.querySelector(`.comments-count`);
  let limitComments = [];

  // Отрисовывает большое фото
  const renderBigPictureItem = (pictureData) => {
    bigPictureItem.querySelector(`.big-picture__img img`).src = pictureData.url;
    bigPictureItem.querySelector(`.likes-count`).textContent = pictureData.likes;
    bigPictureItem.querySelector(`.social__caption`).textContent = pictureData.description;
    bigPictureItem.querySelector(`.comments-count`).textContent = pictureData.comments.length;

    bigPictureItem.querySelector(`.social__comment-count `).classList.remove(`hidden`);
    bigPictureItem.querySelector(`.comments-loader`).classList.add(`hidden`);
  };

  // Переключает фотографии из массива объектов
  const closeButtonClickHandler = () => closeBigPicture();

  const bigPictureEscKeydownHandler = (evt) => {
    if (evt.key === window.util.ESC_KEY) {
      closeBigPicture();
    }
  };

  const loadButtonClickHandler = () => {
    window.gallery.renderLimitComments(limitComments);
    socialCommentsCount.innerHTML = `${commentsContainer.children.length} из ``<span>${commentsCount.innerHTML}</span>`` комментариев`;
    // socialCommentsCount.textContent = `${commentsContainer.children.length} из ${commentsCount.innerHTML} комментариев`;
    if (limitComments.length === 0) {
      commentsLoader.removeEventListener(`click`, loadButtonClickHandler);
      commentsLoader.classList.add(`hidden`);
    }
  };

  const showBigPicture = (picture) => {
    renderBigPictureItem(picture);
    commentsContainer.innerHTML = ``;
    document.querySelector(`body`).classList.add(`modal-open`);
    bigPictureItem.classList.remove(`hidden`);
    document.addEventListener(`keydown`, bigPictureEscKeydownHandler);
    closeBigPictureButton.addEventListener(`click`, closeButtonClickHandler);

    limitComments = picture.comments.slice();

    if (picture.comments.length > window.gallery.CommentsAmount.MAX) {
      commentsLoader.classList.remove(`hidden`);
      commentsLoader.addEventListener(`click`, loadButtonClickHandler);
    }
    window.gallery.renderLimitComments(limitComments);
  };

  const closeBigPicture = () => {
    document.querySelector(`body`).classList.remove(`modal-open`);
    bigPictureItem.classList.add(`hidden`);
    document.removeEventListener(`keydown`, bigPictureEscKeydownHandler);
    closeBigPictureButton.removeEventListener(`click`, closeButtonClickHandler);
  };

  window.preview = {
    showBigPicture,
  };
})();
