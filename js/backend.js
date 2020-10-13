'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;
  const StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    ETERNAL_SERVER_ERROR: 500
  };
  const TIMEOUT = 10000;

  const load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          error = `Неверный запрос`;
          break;
        case StatusCode.NOT_FOUND:
          error = `Пользователь не авторизован`;
          break;
        case StatusCode.ETERNAL_SERVER_ERROR:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Статус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.TIMEOUT + `мс`);
    });

    xhr.TIMEOUT = TIMEOUT;

    xhr.open(`GET`, URL);
    xhr.send();
  };

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend = {
    load,
    errorHandler
  };
})();
