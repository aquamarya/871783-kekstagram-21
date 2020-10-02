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
const MAX_HASHTAG_AMOUNT = 5;

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
  bigPictureItem.classList.remove(`hidden`);

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
// const fileUploadCancel = uploadForm.querySelector(`#upload-cancel`);
const hashtagsInput = uploadForm.querySelector(`.text__hashtags`);
const descriptionInput = uploadForm.querySelector(`.text__description`);
// const scaleControls = uploadForm.querySelector(`.scale`);
// const scaleSmallerButton = scaleControls.querySelector(`.scale__control--smaller`);
// const scaleBiggerButton = scaleControls.querySelector(`.scale__control--bigger`);
// const scaleValue = scaleControls.querySelector(`.scale__control--value`);
const viewPhotoItem = uploadForm.querySelector(`.img-upload__preview img`);
const effectBar = uploadForm.querySelector(`.effect-level`);
// const effectLevelValue = effectBar.querySelector(`.effect-level__value`);
// const effectLevelLine = effectBar.querySelector(`.effect-level__line`);
// const effectToggleItem = effectBar.querySelector(`.effect-level__pin`);
// const effectDepthItem = effectBar.querySelector(`.effect-level__depth`);
// const effectList = uploadForm.querySelector(`.effects`);

const editFormEscKeydownHandler = (evt) => {
  if (hashtagsInput !== document.activeElement && descriptionInput !== document.activeElement && evt.key === ESC_KEY) {
    closeEditForm();
  }
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

const openEditForm = () => {
  editPhotoItem.classList.remove(`hidden`);
  document.addEventListener(`keydown`, editFormEscKeydownHandler);
  document.querySelector(`body`).classList.add(`modal-open`);
  // editPhotoItem.addEventListener(`change`, editPhotoItemChangeHandler);
  // effectToggleItem.addEventListener(`mouseup`, mouseUpHandler);
  // scaleSmallerButton.addEventListener(`click`, smallerButtonClickHandler);
  // scaleBiggerButton.addEventListener(`click`, biggerButtonClickHandler);
  hashtagsInput.addEventListener(`input`, hashtagInputHandler);
};

const closeEditForm = () => {
  editPhotoItem.classList.add(`hidden`);
  document.removeEventListener(`keydown`, editFormEscKeydownHandler);
  document.querySelector(`body`).classList.remove(`modal-open`);
  // editPhotoItem.removeEventListener(`change`, editPhotoItemChangeHandler);
  // effectToggleItem.removeEventListener(`mouseup`, mouseUpHandler);
  // scaleSmallerButton.removeEventListener(`click`, smallerButtonClickHandler);
  // scaleBiggerButton.removeEventListener(`click`, biggerButtonClickHandler);
  hashtagsInput.removeEventListener(`input`, hashtagInputHandler);
};

// const editPhotoItemChangeHandler = (evt) => {
//   if () {
//
//   }
// };

// Уровень насыщенности фильтра

// const Chrome = {
//   MIN: 0,
//   MAX: 1
// };
// const Sepia = {
//   MIN: 0,
//   MAX: 1
// };
// const Marvin = {
//   MIN: 0,
//   MAX: 100
// };
// const Phobos = {
//   MIN: 0,
//   MAX: 3
// };
// const Heat = {
//   MIN: 1,
//   MAX: 3
// };

const renderEffectBar = () => {
  if (effectBar.classList.contains(`hidden`)) {
    effectBar.classList.remove(`hidden`);
  }
};

const removeEffect = () => {

};

const applyFilter = (effect) => {
  renderEffectBar();
  removeEffect();
  viewPhotoItem.classList.add(effect);
};

const filterChangeHandler = (evt) => {
  const currentFilter = evt.target.value;
  switch (currentFilter) {
    case `effect-none`:

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

effectBar.addEventListener(`change`, filterChangeHandler);
//
// const renderBar = (effect) => {
//
//   if (effect === `effect-none`) {
//     effectBarItem.classList.add(`hidden`);
//   } else {
//     effectBarItem.classList.remove(`hidden`);
//   }
// };

// const mouseUpHandler = (evt) => {
//   evt.preventDefault();
//   document.removeEventListener(`mousemove`, );
//   document.removeEventListener(`mouseup`, );
// };

// Масштабирование изображения
// const SCALE_STEP = 25;
// const SCALE_VALUE_MIN = 25;
// const SCALE_VALUE_MAX = 100;

// const getScaleValue = () => {
//   return parseInt(scaleValue.value, 10);
// }
//
// const smallerButtonClickHandler = (evt) => {
//   const currentScaleValue = getScaleValue();
// };
//
// const biggerButtonClickHandler = (evt) => {
//   const currentScaleValue = getScaleValue();
// };

// Валидация хеш-тегов
const hasSymbols = (symbol) => {
  return symbol.match(/^#[a-zA-Z0-9а-яА-Я]+$/);
};

const checkDoubleHashtags = (hashtags, hashtag) => {
  const index = hashtags.indexOf(hashtag) + 1;
  return hashtags.indexOf(hashtag, index);
};

const getValidityMessages = (hashtags) => {
  let message = ``;
  if (hashtags.length > MAX_HASHTAG_AMOUNT) {
    message = `нельзя указать больше ${(MAX_HASHTAG_AMOUNT)} хэш-тегов`;
  }
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (hashtag[0] !== `#`) {
      message = `хэш-тег начинается с символа # (решётка)`;
      return message;
    } else if (hashtags[i].length < HashtagsLength.MIN) {
      message = `хеш-тег не может состоять только из одной решётки`;
      return message;
    } else if (!hasSymbols(hashtags[i])) {
      message = `строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`;
      return message;
    } else if (hashtags[i].length < HashtagsLength.MAX) {
      message = `максимальная длина одного хэш-тега ${(HashtagsLength.MAX)} символов, включая решётку`;
      return message;
    } else if (checkDoubleHashtags(hashtags, hashtag)) {
      message = `один и тот же хэш-тег не может быть использован дважды`;
      return message;
    }
  }
  return message;
};

const hashtagInputHandler = (evt) => {
  const hashtags = hashtagsInput.value.toLowerCase().split(``);
  evt.target.setCustomValidity(getValidityMessages(hashtags));
};
