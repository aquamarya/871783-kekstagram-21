'use strict';

(() => {
  const RANDOM_PHOTOS_AMOUNT = 10;
  const imgFiltersElement = document.querySelector(`.img-filters`);
  const filtersDefault = imgFiltersElement.querySelector(`#filter-default`);
  const filtersRandom = imgFiltersElement.querySelector(`#filter-random`);
  const filtersDiscussed = imgFiltersElement.querySelector(`#filter-discussed`);

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
    window.gallery.createPicturesList(window.gallery.usersPhotos);
  };

  const getRandomPhotos = () => {
    const randomPhotos = window.util.shufflePhotos(window.gallery.usersPhotos.slice());
    window.gallery.createPicturesList(randomPhotos.splice(0, RANDOM_PHOTOS_AMOUNT));
  };

  const sortPhotosByComments = (commentsArray) => {
    commentsArray.sort((first, second) => {
      if (first.comments.length > second.comments.length) {
        return -1;
      }
      if (first.comments.length < second.comments.length) {
        return 1;
      }
      return 0;
    });
    return commentsArray;
  };

  const getDiscussedPhotos = () => {
    const discussedPhotos = window.gallery.usersPhotos.slice();
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

  window.sorting = {
    filterClickHandler
  };
})();
