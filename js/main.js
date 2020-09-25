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
const commentsAmount = {
  MIN_COMMENTS_AMOUNT: 0,
  MAX_COMMENTS_AMOUNT: 6,
};
const avatarsAmount = {
  MIN_AVATAR_AMOUNT: 1,
  MAX_AVATAR_AMOUNT: 6,
};
const likesAmount = {
  MIN_LIKES: 15,
  MAX_LIKES: 200,
};

// Возвращает результат, включая максимум и минимум
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Возвращает случайный элемент массива
const getRandomArrayElement = (array) => array[getRandomIntInclusive(0, array.length - 1)];

// Создает массив комментариев
const createComments = (commentsArray) => {
  const comments = [];
  for (let i = 0; i < commentsArray.length; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomIntInclusive(avatarsAmount) + '.svg',
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(USER_NAMES)
    });
  }
  return comments;
};

// Создает массив описаний фото
const createPhotoDescription = (descriptionsArray) => {
  const photoDescriptions = [];
  for (let i = 0; i < descriptionsArray; i++) {
    photoDescriptions.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'описание фотографии',
      likes: getRandomIntInclusive(likesAmount.MIN_LIKES, likesAmount.MAX_LIKES),
      comments: createComments(getRandomIntInclusive(commentsAmount.MIN_COMMENTS_AMOUNT, commentsAmount.MAX_COMMENTS_AMOUNT))
    });
  }
  return photoDescriptions;
};

const picturesItem = document.querySelector('.pictures');
const picturesTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

// Копирует шаблон и добавляет в него данные
const createPicture = (picture) => {
  const pictureElement = picturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  return pictureElement;
};

// Cоздает и заполняет DOM-элементы
const createPicturesList = (pictures) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pictures.length; i++) {
    fragment.appendChild(createPicture(pictures[i]));
  }
  picturesItem.appendChild(fragment);
};

// Отображает фото пользователей
createPicturesList((createPhotoDescription(PICTURES_AMOUNT)));
