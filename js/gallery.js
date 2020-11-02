'use strict';

const CommentsAmount = {
  MIN: 0,
  MAX: 5
};
const picturesItem = document.querySelector(`.pictures`);
const picturesTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
const commentsContainer = document.querySelector(`.social__comments`);
const commentsItem = document.querySelector(`.social__comment`);

// Копирует шаблон и добавляет в него данные
const createPicture = (picture) => {
  const pictureElement = picturesTemplate.cloneNode(true);
  pictureElement.querySelector(`.picture__img`).src = picture.url;
  pictureElement.querySelector(`.picture__comments`).textContent = picture.comments.length;
  pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
  return pictureElement;
};

// Создает и заполняет DOM-элементы
const createPicturesList = (pictures) => {
  const fragment = document.createDocumentFragment();
  for (let picture of pictures) {
    const createdPicture = createPicture(picture);
    fragment.appendChild(createdPicture);
    createdPicture.addEventListener(`click`, () => {
      window.preview.showBigPicture(picture);
    });
  }
  picturesItem.appendChild(fragment);
};

window.backend.load((photos) => {
  createPicturesList(photos);
  window.gallery.usersPhotos = photos;
}, window.backend.loadErrorHandler);

const createCommentItem = (commentData) => {
  const commentElement = commentsItem.cloneNode(true);

  commentElement.querySelector(`.social__picture`).src = commentData.avatar;
  commentElement.querySelector(`.social__picture`).alt = commentData.name;
  commentElement.querySelector(`.social__text`).textContent = commentData.message;

  return commentElement;
};

// Создает и заполняет DOM-элементы
const createCommentsFragment = (comments) => {
  const fragment = document.createDocumentFragment();

  for (let comment of comments) {
    fragment.appendChild(createCommentItem(comment));
  }

  return fragment;
};

const renderLimitedComments = (comments) => {
  commentsContainer.appendChild(createCommentsFragment(comments));
};

const removePhotos = () => {
  document.querySelectorAll(`.picture`).forEach((photo) => {
    photo.remove();
  });
};

window.gallery = {
  createCommentsFragment,
  createPicturesList,
  usersPhotos: [],
  renderLimitedComments,
  removePhotos,
  CommentsAmount
};
