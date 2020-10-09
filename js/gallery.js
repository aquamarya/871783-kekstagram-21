'use strict';

(() => {
  const picturesItem = document.querySelector(`.pictures`);
  const picturesTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

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

  const pictures = window.data.createPhotoDescription(window.data.PICTURES_AMOUNT);
  createPicturesList(pictures);

  const commentsContainer = document.querySelector(`.social__comments`);
  const commentsItem = document.querySelector(`.social__comment`);

  // Создает один комментарий
  const createCommentItem = (commentData) => {
    const commentElement = commentsItem.cloneNode(true);

    commentElement.querySelector(`.social__picture`).src = commentData.avatar;
    commentElement.querySelector(`.social__picture`).alt = commentData.name;
    commentElement.querySelector(`.social__text`).textContent = commentData.message;

    return commentElement;
  };

  // Создает и заполняет DOM-элементы
  const createCommentsFragment = (commentData) => {
    commentsContainer.innerHTML = ``;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < commentData.length; i++) {
      fragment.appendChild(createCommentItem(commentData[i]));
    }
    commentsContainer.appendChild(fragment);
  };

  window.gallery = {
    createCommentsFragment
  };
})();
