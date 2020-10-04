'use strict';

const PICTURES_AMOUNT = 25;
const USER_NAMES = [
  `Человек-паук`,
  `Халк`,
  `Доктор Стрэндж`,
  `Сорвиголова`,
  `Локи`,
  `Дэдпул`
];
const COMMENTS = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];
const CommentsAmount = {
  MIN: 0,
  MAX: 6,
};
const AvatarsAmount = {
  MIN: 1,
  MAX: 6,
};
const LikesAmount = {
  MIN: 15,
  MAX: 200,
};
const ESC_KEY = `Escape`;
const ENTER_KEY = `Enter`;
const HashtagsLength = {
  MIN: 2,
  MAX: 20,
};
const HASHTAG_MAX_AMOUNT = 5;
const SCALE_STEP = 25;
const ScaleValue = {
  MIN: 25,
  MAX: 100,
};

// Возвращает результат, включая максимум и минимум
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Возвращает случайный элемент массива
const getRandomArrayElement = (array) => array[getRandomIntInclusive(0, array.length - 1)];

// Создает список комментариев
const createComments = (commentsAmount) => {
  const comments = [];
  for (let i = 0; i < commentsAmount; i++) {
    comments.push({
      avatar: `img/avatar-${getRandomIntInclusive(AvatarsAmount.MIN, AvatarsAmount.MAX)}.svg`,
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(USER_NAMES)
    });
  }
  return comments;
};

// Создает описание фото
const createPhotoDescription = (descriptions) => {
  const photoDescriptions = [];
  for (let i = 0; i < descriptions; i++) {
    photoDescriptions.push({
      url: `photos/${(i + 1)}.jpg`,
      description: `описание фотографии`,
      likes: getRandomIntInclusive(LikesAmount.MIN, LikesAmount.MAX),
      comments: createComments(getRandomIntInclusive(CommentsAmount.MIN, CommentsAmount.MAX))
    });
  }
  return photoDescriptions;
};

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
  for (let i = 0; i < pictures.length; i++) {
    fragment.appendChild(createPicture(pictures[i]));
  }
  picturesItem.appendChild(fragment);
};

// Отображает фото пользователей
const pictures = createPhotoDescription(PICTURES_AMOUNT);
createPicturesList(pictures);

const commentsContainer = document.querySelector(`.social__comments`);
const commentsItem = commentsContainer.querySelector(`.social__comment`);
const bigPictureItem = document.querySelector(`.big-picture`);

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

// Отрисовывает большое фото
const renderBigPictureItem = (pictureData) => {
  // bigPictureItem.classList.remove(`hidden`);

  bigPictureItem.querySelector(`.big-picture__img img`).src = pictureData.url;
  bigPictureItem.querySelector(`.likes-count`).textContent = pictureData.likes;
  bigPictureItem.querySelector(`.social__caption`).textContent = pictureData.description;
  bigPictureItem.querySelector(`.comments-count`).textContent = pictureData.comments.length;

  bigPictureItem.querySelector(`.social__comment-count `).classList.add(`hidden`);
  bigPictureItem.querySelector(`.comments-loader`).classList.add(`hidden`);

  createCommentsFragment(pictureData.comments);
};

// Показывает первую фотографию из массива объектов
renderBigPictureItem(pictures[0]);

// Загрузка изображения и показ формы редактирования
const uploadForm = document.querySelector(`.img-upload__form`);
const fileUploadStart = uploadForm.querySelector(`#upload-file`);
const editPhotoItem = uploadForm.querySelector(`.img-upload__overlay`);
const descriptionInput = uploadForm.querySelector(`.text__description`);
const viewPhotoItem = uploadForm.querySelector(`.img-upload__preview img`);
const closeButton = document.querySelector(`#upload-cancel`);

const editFormEscKeydownHandler = (evt) => {
  if (hashtagsInput !== document.activeElement && descriptionInput !== document.activeElement && evt.key === ESC_KEY) {
    closeEditForm();
  }
};

const openEditForm = () => {
  editPhotoItem.classList.remove(`hidden`);
  document.addEventListener(`keydown`, editFormEscKeydownHandler);
  document.querySelector(`body`).classList.add(`modal-open`);
  editPhotoItem.addEventListener(`change`, editPhotoItemChangeHandler);
  editPhotoItem.addEventListener(`change`, filterChangeHandler);
  effectBar.classList.add(`hidden`);
  scaleSmallerButton.addEventListener(`click`, smallerButtonClickHandler);
  scaleBiggerButton.addEventListener(`click`, biggerButtonClickHandler);
  // scaleSmallerButton.addEventListener(`click`, buttonClickHandler);
  hashtagsInput.addEventListener(`input`, hashtagInputHandler);
};

const closeEditForm = () => {
  editPhotoItem.classList.add(`hidden`);
  document.removeEventListener(`keydown`, editFormEscKeydownHandler);
  fileUploadStart.value = ``;
  viewPhotoItem.style.filter = ``;
  viewPhotoItem.style.transform = ``;
  editScaleValue.value = 100 + `%`;
  document.querySelector(`body`).classList.remove(`modal-open`);
  editPhotoItem.removeEventListener(`change`, editPhotoItemChangeHandler);
  scaleSmallerButton.removeEventListener(`click`, smallerButtonClickHandler);
  scaleBiggerButton.removeEventListener(`click`, biggerButtonClickHandler);
  // scaleSmallerButton.removeEventListener(`click`, buttonClickHandler);
  hashtagsInput.removeEventListener(`input`, hashtagInputHandler);
};

fileUploadStart.addEventListener(`change`, (evt) => {
  evt.preventDefault();
  openEditForm();
});

fileUploadStart.addEventListener(`keydown`, (evt) => {
  if (evt.key === ENTER_KEY) {
    openEditForm();
  }
});

closeButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  closeEditForm();
});

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
const effectBar = uploadForm.querySelector(`.effect-level`);
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
  for (let i = 0; i < effects.length; i++) {
    if (effects[i].match(`effects__preview--`)) {
      viewPhotoItem.classList.remove(effects[i]);
    }
  }
};

const hideEffect = () => {
  effectBar.classList.add(`hidden`);
};

const applyFilter = (effect) => {
  renderEffectBar();
  removeEffect();
  viewPhotoItem.classList.add(effect);
};

const filterChangeHandler = (evt) => {
  const currentFilter = evt.target.value;
  switch (currentFilter.id) {
    case `effect-none`:
      removeEffect();
      hideEffect();
      viewPhotoItem.classList.add(`effects__preview--none`);
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
const effectsItems = document.querySelectorAll(`.effects__radio`);
effectsItems.forEach((effectsItem) => {
  effectsItem.addEventListener(`click`, filterChangeHandler);
});

// for (let i = 0; i < effectsItems.length; i++) {
//   effectsItems[i].addEventListener(`click`, filterChangeHandler);
// }

// Масштабирование изображения
const scaleControls = uploadForm.querySelector(`.scale`);
const scaleSmallerButton = scaleControls.querySelector(`.scale__control--smaller`);
const scaleBiggerButton = scaleControls.querySelector(`.scale__control--bigger`);
const editScaleValue = scaleControls.querySelector(`.scale__control--value`);

const getScaleValue = () => {
  return parseInt(editScaleValue.value, 10);
};

const getScaleRange = (value) => {
  return Math.min(ScaleValue.MAX, Math.max(ScaleValue.MIN, value));
};

const smallerButtonClickHandler = () => {
  const currentScaleValue = getScaleValue();
  const newValue = getScaleRange(currentScaleValue - SCALE_STEP);
  editScaleValue.value = `${newValue}%`;
  viewPhotoItem.style.transform = `scale(${newValue / 100})`;
};

// const buttonClickHandler = (evt) => {
//   const target = evt.target.closest(`button`);
//   if (!target) {
//     return;
//   }
//   const currentScaleValue = getScaleValue();
//   let newValue;
//   if (target === scaleSmallerButton) {
//     if (editScaleValue > ScaleValue.MIN) {
//       newValue = getScaleRange(currentScaleValue - SCALE_STEP);
//     }
//   }
//   if (target === scaleBiggerButton) {
//     if (editScaleValue < ScaleValue.MAX) {
//       newValue = getScaleRange(currentScaleValue + SCALE_STEP);
//     }
//   }
//   viewPhotoItem.style.transform = `scale(${newValue / 100})`;
//   editScaleValue.value = `${newValue}%`;
// };

const biggerButtonClickHandler = () => {
  const currentScaleValue = getScaleValue();
  const newValue = getScaleRange(currentScaleValue + SCALE_STEP);
  editScaleValue.value = `${newValue}%`;
  viewPhotoItem.style.transform = `scale(${newValue / 100})`;
};

// Валидация хеш-тегов
const hashtagsInput = uploadForm.querySelector(`.text__hashtags`);

const hasSymbols = (symbol) => symbol.match(/^#[a-zA-Z0-9а-яА-Я]+$/);

const checkDuplicateHashtags = (hashtags, hashtag) => {
  const index = hashtags.indexOf(hashtag) + 1;
  return hashtags.indexOf(hashtag, index);
};

// const setWarningBorder = (evt) => {
//   evt.target.style.border = `2px solid red`;
// };

const getValidityMessages = (hashtags) => {
  if (hashtags.length > HASHTAG_MAX_AMOUNT) {
    return `нельзя указать больше ${HASHTAG_MAX_AMOUNT} хэш-тегов`;
  }
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (hashtag[0] !== `#`) {
      return `хэш-тег начинается с символа # (решётка)`;
    } else if (hashtags[i].length < HashtagsLength.MIN) {
      return `хеш-тег не может состоять только из одной решётки`;
    } else if (!hasSymbols(hashtags[i])) {
      return `строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`;
    } else if (hashtags[i].length > HashtagsLength.MAX) {
      return `максимальная длина одного хэш-тега ${HashtagsLength.MAX} символов, включая решётку`;
    } else if (checkDuplicateHashtags(hashtags, hashtag) !== -1) {
      return `один и тот же хэш-тег не может быть использован дважды`;
    }
  }
  return ` `;
};

const hashtagInputHandler = (evt) => {
  const hashtags = evt.target.value.toLowerCase().split(` `);
  evt.target.setCustomValidity(getValidityMessages(hashtags));
};
