//  Функция получает массив объектов с сервера reateMinPictures, initPostsPreview
const getData = (createPictures, initPreview, onFail) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((postsArray) => {
      createPictures(postsArray);
      initPreview(postsArray);
    })
    .catch(() => {
      onFail('Не удалось загрузить данные c сервера.');
    });
};

// Функция отправляет данные из формы на сервер
const sendData = (closeForm, successPopup, failPopup, body) => {
  fetch(
    'https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      closeForm();
      if (response.ok) {
        successPopup();
      } else {
        failPopup();
      }
    })
    .catch(() => {
      failPopup();
    });
};

export {getData, sendData};
