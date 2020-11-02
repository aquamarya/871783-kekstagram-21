'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const fileUploadStart = document.querySelector(`#upload-file`);
const viewPhotoItem = document.querySelector(`.img-upload__preview img`);
const imagePreview = document.querySelectorAll(`.effects__preview`);

const fileUploadHandler = () => {
  const file = fileUploadStart.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, function () {
      viewPhotoItem.src = reader.result;

      imagePreview.forEach((previewItem) => {
        previewItem.style.backgroundImage = `url(" ${reader.result} ")`;
      });
    });

    reader.readAsDataURL(file);
  }
};

window.uploadPhoto = {
  fileUploadHandler
};
