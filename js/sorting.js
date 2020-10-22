'use strict';

(() => {
  const RANDOM_PHOTOS_AMOUNT = 10;
  const imgFiltersElement = document.querySelector(`.img-filters`);
  const filtersDefault = imgFiltersElement.querySelector(`#filter-default`);
  const filtersRandom = imgFiltersElement.querySelector(`#filter-random`);
  const filtersDiscussed = imgFiltersElement.querySelector(`#filter-discussed`);
  const usersPhotos = [];

  imgFiltersElement.classList.remove(`img-filters--inactive`);

  const changeActiveFilters = (filterButton) => {
    const activeFiltersElement = imgFiltersElement.querySelector(`.img-filters__button--active`);
    activeFiltersElement.classList.remove(`img-filters__button--active`);
    filterButton.classList.add(`img-filters__button--active`);
  };

  const removePhotos = () => {
    const currentPhotos = document.querySelectorAll(`.picture`);
    currentPhotos.forEach((photo) => {
      photo.remove();
    });
  };

  const getDefaultPhotos = () => {
    window.gallery.createPicturesList(usersPhotos);
  };

  const getRandomPhotos = () => {
    const randomPhotos = usersPhotos.slice();
    while (randomPhotos.length < RANDOM_PHOTOS_AMOUNT) {
      const randomPhoto = window.util.getRandomArrayElement(usersPhotos);
      if (randomPhotos.indexOf(randomPhoto) === -1) {
        randomPhotos.push(randomPhoto);
      }
    }

    window.gallery.createPicturesList(randomPhotos);
  };

  const sortPhotosByComments = (commentsArray) => {
    // return commentsArray.sort((a, b) => (a.comments.length > b.comments.length) ? 1 : -1);
    commentsArray.sort((first, second) => {
      if (first.comments.length > second.comments.length) {
        return 1;
      }
      if (first.comments.length < second.comments.length) {
        return -1;
      }
      return 0;
    });
    return commentsArray;
  };

  const getDiscussedPhotos = () => {
    const discussedPhotos = usersPhotos.slice();
    sortPhotosByComments(discussedPhotos);
    window.gallery.createPicturesList(discussedPhotos);
  };

  const filterClickHandler = window.util.debounce((evt) => {
    changeActiveFilters(evt.target);
    removePhotos();
    switch (evt.target) {
      case filtersDefault :
        getDefaultPhotos();
        break;
      case filtersRandom:
        getRandomPhotos();
        break;
      case filtersDiscussed:
        getDiscussedPhotos();
        break;
      default:
        getDefaultPhotos();
    }
  });

  imgFiltersElement.addEventListener(`click`, filterClickHandler);
})();
