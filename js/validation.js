'use strict';

(() => {
  const HashtagsLength = {
    MIN: 2,
    MAX: 20,
  };
  const HASHTAG_MAX_AMOUNT = 5;

  const hasSymbols = (symbol) => symbol.match(/^#[a-zA-Z0-9а-яА-Я]+$/);

  const checkDuplicateHashtags = (hashtags, hashtag) => {
    const index = hashtags.indexOf(hashtag) + 1;
    return hashtags.indexOf(hashtag, index);
  };

  const getValidityMessages = (hashtags) => {
    if (hashtags.length > HASHTAG_MAX_AMOUNT) {
      return `нельзя указать больше ${HASHTAG_MAX_AMOUNT} хэш-тегов`;
    }
    for (let hashtag of hashtags) {
      if (hashtag[0] !== `#`) {
        return `хэш-тег начинается с символа # (решётка)`;
      } else if (hashtag.length < HashtagsLength.MIN) {
        return `хеш-тег не может состоять только из одной решётки`;
      } else if (!hasSymbols(hashtag)) {
        return `строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`;
      } else if (hashtag.length > HashtagsLength.MAX) {
        return `максимальная длина одного хэш-тега ${HashtagsLength.MAX} символов, включая решётку`;
      } else if (checkDuplicateHashtags(hashtags, hashtag) !== -1) {
        return `один и тот же хэш-тег не может быть использован дважды`;
      }
    }
    return ``;
  };

  const hashtagInputHandler = (evt) => {
    const hashtags = evt.target.value.toLowerCase().split(` `);
    evt.target.setCustomValidity(getValidityMessages(hashtags));
    evt.target.style.border = `2px solid red`;
  };
  window.validation = {
    hashtagInputHandler
  };
})();
