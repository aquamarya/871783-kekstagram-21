'use strict';

const PICTURES_AMOUNT = 25;
const USER_NAMES = [
  'Человек-паук',
  'Халк',
  'Доктор Стрэндж',
  'Сорвиголова',
  'Локи',
  'Дэдпул'
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
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
      description: 'описание фотографии',
      likes: getRandomIntInclusive(LikesAmount.MIN, LikesAmount.MAX),
      comments: createComments(getRandomIntInclusive(CommentsAmount.MIN, CommentsAmount.MAX))
    });
  }
  return photoDescriptions;
};

const picturesItem = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Копирует шаблон и добавляет в него данные
const createPicture = (picture) => {
  const pictureElement = picturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
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

const commentsAmount = document.querySelector('.social__comments');
const commentsItem = commentsAmount.querySelector('.social__comment');
const bigPictureItem = document.querySelector('.big-picture');

// Создает один комментарий
const createCommentItem = (data) => {
  const commentElement = commentsItem.cloneNode(true);

  commentElement.querySelector('.social__picture').src = data.avatar;
  commentElement.querySelector('.social__picture').alt = data.name;
  commentElement.querySelector('.social__text').textContent = data.message;

  return commentElement;
};

// Cоздает и заполняет DOM-элементы
const createCommentsAmount = (data) => {
  commentsAmount.innerHTML = '';
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    fragment.appendChild(createCommentItem(data[i]));
  }
  commentsAmount.appendChild(fragment);
};

// Отрисовывает большое фото
const renderBigPictureItem = (data) => {
  bigPictureItem.classList.remove('hidden');

  bigPictureItem.querySelector('.big-picture__img img').src = data.url;
  bigPictureItem.querySelector('.likes-count').textContent = data.likes;
  bigPictureItem.querySelector('.social__caption').textContent = data.description;
  bigPictureItem.querySelector('.comments-count').textContent = data.comments.length;

  bigPictureItem.querySelector('.social__comment-count ').classList.add('hidden');
  bigPictureItem.querySelector('.comments-loader').classList.add('hidden');

  createCommentsAmount(data.comments);
};

// Показывает первую фотографию из массива объектов
renderBigPictureItem(pictures[0]);

const bodyTag = document.querySelector('body');
bodyTag.classList.add('modal-open');
