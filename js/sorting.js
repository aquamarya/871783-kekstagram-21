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
    window.gallery.createPicturesList(window.gallery.usersPhotos);
  };

  const getRandomPhotos = () => {
    const randomPhotos = window.util.shufflePhotos(window.gallery.usersPhotos.slice());
    window.gallery.createPicturesList(randomPhotos.splice(0, RANDOM_PHOTOS_AMOUNT));
    // return window.util.shufflePhotos(window.gallery.usersPhotos.slice().splice(0, RANDOM_PHOTOS_AMOUNT));
  };

  const getDiscussedPhotos = () => {
    const discussedPhotos = window.gallery.usersPhotos
      .slice()
      .sort((first, second) => second.comments.length - first.comments.length);
    window.gallery.createPicturesList(discussedPhotos);
    // return window.gallery.usersPhotos
    //   .slice()
    //   .sort((first, second) => second.comments.length - first.comments.length
    //   );
  };

  const filterClickHandler = window.util.debounce((evt) => {
    changeActiveFilters(evt.target);
    window.gallery.removePhotos();
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

  // const renderPhotos = window.util.debounce((target) => {
  //   filterClickHandler(target);
  //   window.gallery.removePhotos();
  //   window.gallery.createPicturesList(filterClickHandler);
  // });

  imgFiltersElement.addEventListener(`click`, filterClickHandler);

  window.sorting = {
    changeActiveFilters
  };
})();
