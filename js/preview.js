'use strict';

(() => {
  const COMMENTS_PER_CLICK = 5;
  const bigPictureItem = document.querySelector(`.big-picture`);
  const closeBigPictureButton = bigPictureItem.querySelector(`#picture-cancel`);
  const commentsLoader = document.querySelector(`.comments-loader`);
  const commentsContainer = document.querySelector(`.social__comments`);
  const commentsCount = document.querySelector(`.comments-count`);
  const commentsCountCurrent = document.querySelector(`.current-comments-count`);
  let shownCommentsCount = 0;
  let currentComments = [];

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

  const updateComments = () => {
    shownCommentsCount += COMMENTS_PER_CLICK;
    window.gallery.renderLimitedComments(currentComments.slice(shownCommentsCount - COMMENTS_PER_CLICK, shownCommentsCount));
    commentsCountCurrent.innerText = Math.min(shownCommentsCount, currentComments.length);

    if (shownCommentsCount >= currentComments.length) {
      commentsLoader.removeEventListener(`click`, loadButtonClickHandler);
      commentsLoader.classList.add(`hidden`);
    }
  };

  const loadButtonClickHandler = () => {
    updateComments();
  };

  const showBigPicture = (picture) => {
    renderBigPictureItem(picture);
    commentsContainer.innerHTML = ``;
    document.querySelector(`body`).classList.add(`modal-open`);
    bigPictureItem.classList.remove(`hidden`);
    document.addEventListener(`keydown`, bigPictureEscKeydownHandler);
    closeBigPictureButton.addEventListener(`click`, closeButtonClickHandler);

    if (picture.comments.length > window.gallery.CommentsAmount.MAX) {
      commentsLoader.classList.remove(`hidden`);
      commentsLoader.addEventListener(`click`, loadButtonClickHandler);
    }
    currentComments = picture.comments.slice();
    shownCommentsCount = 0;

    commentsCount.innerText = currentComments.length;
    updateComments();
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
