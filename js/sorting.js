'use strict';

const RANDOM_PHOTOS_AMOUNT = 10;
const imgFiltersElement = document.querySelector(`.img-filters`);

imgFiltersElement.classList.remove(`img-filters--inactive`);

const changeActiveFilters = (filterButton) => {
  imgFiltersElement
    .querySelector(`.img-filters__button--active`)
    .classList
    .remove(`img-filters__button--active`);
  filterButton.classList.add(`img-filters__button--active`);
};

const getDefaultPhotos = () => window.gallery.usersPhotos;

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
  let sortedPhotos = [];

  switch (evt.target.id) {
    case `filter-default`:
      sortedPhotos = getDefaultPhotos();
      break;
    case `filter-random`:
      sortedPhotos = getRandomPhotos();
      break;
    case `filter-discussed`:
      sortedPhotos = getDiscussedPhotos();
      break;
    default:
      sortedPhotos = getDefaultPhotos();
  }

  window.gallery.createPicturesList(sortedPhotos);
});

imgFiltersElement.addEventListener(`click`, filterClickHandler);
