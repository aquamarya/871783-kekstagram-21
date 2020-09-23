'use strict';

const PHOTOS_AMOUNT = 25;
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
const MAX_COMMENTS_AMOUNT = 6;
const MIN_AVATAR_AMOUNT = 1;
const MAX_AVATAR_AMOUNT = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

let picturesElement = document.querySelector('.pictures');
const picturesTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

// Возвращает результат, включая максимум и минимум
let getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Возвращает случайный элемент массива
let getRandomArrayElement = function (array) {
  return array[getRandomIntInclusive(0, array.length - 1)];
};

let createComments = function (commentsArray) {
  let comments = [];
  for (let i = 0; i < commentsArray.length; i++) {
    comments[i] = {
      avatar: 'img/avatar-' + getRandomIntInclusive(MIN_AVATAR_AMOUNT, MAX_AVATAR_AMOUNT) + '.svg',
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(USER_NAMES)
    };
  }

  return comments;
};

let createPhotoDescription = function (descriptionsArray) {
  let photoDescriptions = [];
  for (let i = 0; i < descriptionsArray.length; i++) {
    photoDescriptions[i] = {
      url: 'photos/' + i + '.jpg',
      description: 'описание фотографии',
      likes: getRandomIntInclusive(MIN_LIKES, MAX_LIKES),
      comments: createComments(getRandomIntInclusive(0, MAX_COMMENTS_AMOUNT))
    };
  }
  return photoDescriptions;
};
