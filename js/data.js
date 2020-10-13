'use strict';

(() => {
  const PICTURES_AMOUNT = 25;

  let elementsList = [];

  const createPhotoDescription = (descriptions, index) => {
    const photoDescriptions = {
      url: descriptions.url,
      description: descriptions.description,
      likes: descriptions.likes,
      comments: descriptions.comments,
      id: index
    };
    // }
    return photoDescriptions;
  };

  const createPictures = (elements) => {
    const pictures = [];
    for (let element of elements) {
      const newPicture = createPhotoDescription(element);
      pictures.push(newPicture);
    }
    return pictures;
  };

  const successHandler = (elements) => {
    elementsList = createPictures(elements);
    window.gallery.createCommentsFragment(elementsList);
  };

  window.backend.load(successHandler, window.backend.errorHandler);

  window.data = {
    createPhotoDescription,
    PICTURES_AMOUNT,
    successHandler
  };
})();
