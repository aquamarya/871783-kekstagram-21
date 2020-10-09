'use strict';

(() => {
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

  // Создает список комментариев
  const createComments = (commentsAmount) => {
    const comments = [];
    for (let i = 0; i < commentsAmount; i++) {
      comments.push({
        avatar: `img/avatar-${window.util.getRandomIntInclusive(AvatarsAmount.MIN, AvatarsAmount.MAX)}.svg`,
        message: window.util.getRandomArrayElement(COMMENTS),
        name: window.util.getRandomArrayElement(USER_NAMES)
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
        likes: window.util.getRandomIntInclusive(LikesAmount.MIN, LikesAmount.MAX),
        comments: createComments(window.util.getRandomIntInclusive(CommentsAmount.MIN, CommentsAmount.MAX))
      });
    }
    return photoDescriptions;
  };

  window.data = {
    createPhotoDescription,
    PICTURES_AMOUNT
  };
})();
