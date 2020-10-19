'use strict';

(() => {
  const Url = {
    GET: `https://21.javascript.pages.academy/kekstagram/data`,
    POST: `https://21.javascript.pages.academy/kekstagram`
  };
  const StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    ETERNAL_SERVER_ERROR: 500
  };
  const TIMEOUT = 10000;
  const ZET_INDEX = 100;
  const mainBlock = document.querySelector(`main`);

  const createResponse = (xhr, onSuccess, onError) => {
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
          error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.TIMEOUT}мс`);
    });

    xhr.TIMEOUT = TIMEOUT;

    return xhr;
  };

  const load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.open(`GET`, Url.GET);
    createResponse(xhr, onSuccess, onError);
    xhr.send();
  };

  const send = function (data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.open(`POST`, Url.POST);
    createResponse(xhr, onSuccess, onError);
    xhr.send(data);
  };

  const renderMessage = (message, type) => {
    mainBlock.appendChild(message);

    const closeButton = mainBlock.querySelector(`.${type}__button`);
    const popup = mainBlock.querySelector(`.${type}`);
    popup.style.zIndex = ZET_INDEX;

    const removeMessage = () => {
      mainBlock.removeChild(message);
      document.removeEventListener(`keydown`, documentKeydownHandler);
      document.removeEventListener(`mouseup`, documentMouseUpHandler);
    };

    closeButton.addEventListener(`click`, () => {
      removeMessage();
    });

    const documentKeydownHandler = (evt) => {
      if (evt.key === window.util.ESC_KEY) {
        removeMessage();
      }
    };
    const documentMouseUpHandler = (evt) => {
      const target = evt.target.closest(`.${type}__inner`);
      if (!target) {
        removeMessage();
      }
    };
    document.addEventListener(`keydown`, documentKeydownHandler);
    document.addEventListener(`keydown`, documentMouseUpHandler);
  };

  const loadErrorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: #ff4e4e; border: 2px solid white;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `24px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const errorHandler = () => {
    const templateErrorMessage = document.querySelector(`#error`).content.querySelector(`.error`);
    const messageElement = templateErrorMessage.cloneNode(true);
    messageElement.querySelector(`h2`).textContent = `Ошибка загрузки файла`;
    messageElement.querySelector(`button`).textContent = `Загрузить другой файл`;
    renderMessage(messageElement, `error`);
  };

  const successHandler = () => {
    const templateSuccessMessage = document.querySelector(`#success`).content.querySelector(`.success`);
    const messageElement = templateSuccessMessage.cloneNode(true);

    messageElement.querySelector(`h2`).textContent = `Изображение успешно загружено`;
    messageElement.querySelector(`button`).textContent = `Круто!`;
    renderMessage(messageElement, `success`);
  };

  window.backend = {
    load,
    send,
    loadErrorHandler,
    errorHandler,
    successHandler
  };
})();
