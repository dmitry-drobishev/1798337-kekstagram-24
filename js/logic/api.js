//  Функция получает массив объектов с сервера
const getData = (onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((postsArray) => {
      onSuccess(postsArray);
    })
    .catch(() => {
      onFail('Не удалось загрузить данные c сервера.');
    });
};

// Функция отправляет данные из формы на сервер
const sendData = (body, onSuccess, onFail) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
