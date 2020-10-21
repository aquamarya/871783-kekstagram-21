// 'use strict';
//
// (() => {
//   const RANDOM_PHOTOS_AMOUNT = 10;
//   const imgFiltersElement = document.querySelector(`.img-filters`);
//   const imgFiltersDefaultElement = imgFiltersElement.querySelector(`#filter-default`);
//   const imgFiltersRandomElement = imgFiltersElement.querySelector(`#filter-random`);
//   const imgFiltersDiscussedElement = imgFiltersElement.querySelector(`#filter-discussed`);
//   const pictureItem = document.querySelector(`.picture`);
//   const usersPhotos = [];
//   const randomPhotos = [];
//   const discussedPhotos = [];
//
//   imgFiltersElement.classList.remove(`img-filters--inactive`);
//
//   imgFiltersElement.addEventListener(`mousedown`, (evt) => {
//     window.util.debounce((evt));
//   });
//
//   const changeActiveFilters = (filterButton) => {
//     const activeFiltersElement = imgFiltersElement.querySelector(`.img-filters__button--active`);
//     activeFiltersElement.classList.remove(`img-filters__button--active`);
//     filterButton.classList.add(`img-filters__button--active`);
//   };
//
//   const removePhotos = () => {
//     const currentPhotos = document.querySelectorAll(`.picture`);
//     currentPhotos.forEach((photo) => {
//       pictureItem.removeChild(photo);
//     });
//   };
//
//   const getDefaultPhotos = () => {
//     createPicturesList(usersPhotos);
//   };
//
//   const getRandomPhotos = () => {
//
//   };
//
//   const sortPhotosByComments = (commentsArray) => {
//     commentsArray.sort((first, second) => {
//       if (first > second) {
//         return 1;
//       }
//       if (first < second) {
//         return -1;
//       }
//       return
//     });
//     return commentsArray;
//   };
//
//   const getDiscussedPhotos = () => {
//
//   };
//
//   const getSortedPhotos = window.util.debounce((evt) => {
//     changeActiveFilters(evt.target);
//     removePhotos();
//     switch (evt.target) {
//       case `filter-default`:
//         getDefaultPhotos();
//         break;
//       case `filter-random`:
//         getRandomPhotos();
//         break;
//       case `filter-discussed`:
//         getDiscussedPhotos();
//         break;
//       default:
//         getDefaultPhotos();
//     }
//
//   });
//
//   imgFiltersElement.addEventListener(`click`, getSortedPhotos)
// })();
