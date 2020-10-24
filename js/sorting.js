'use strict';

(() => {
  const RANDOM_PHOTOS_AMOUNT = 10;
  const imgFiltersElement = document.querySelector(`.img-filters`);
  const filtersDefault = imgFiltersElement.querySelector(`#filter-default`);
  const filtersRandom = imgFiltersElement.querySelector(`#filter-random`);
  const filtersDiscussed = imgFiltersElement.querySelector(`#filter-discussed`);

  imgFiltersElement.classList.remove(`img-filters--inactive`);

  const changeActiveFilters = (filterButton) => {
    imgFiltersElement
      .querySelector(`.img-filters__button--active`)
      .classList
      .remove(`img-filters__button--active`);
    filterButton.classList.add(`img-filters__button--active`);
  };

  const getDefaultPhotos = () => {
    return window.gallery.usersPhotos;
  };

  const getRandomPhotos = () => {
    return window.util.shufflePhotos(window.gallery.usersPhotos.slice().splice(0, RANDOM_PHOTOS_AMOUNT));
  };

  const getDiscussedPhotos = () => {
    return window.gallery.usersPhotos
      .slice()
      .sort((first, second) => second.comments.length - first.comments.length
      );
  };

  const filterClickHandler = window.util.debounce((evt) => {
    changeActiveFilters(evt.target);
    window.gallery.removePhotos();
    switch (evt.target) {
      case filtersDefault :
        window.gallery.createPicturesList(getDefaultPhotos());
        break;
      case filtersRandom:
        window.gallery.createPicturesList(getRandomPhotos());
        break;
      case filtersDiscussed:
        window.gallery.createPicturesList(getDiscussedPhotos());
        break;
      default:
        getDefaultPhotos();
    }
  });

  imgFiltersElement.addEventListener(`click`, filterClickHandler);

})();
