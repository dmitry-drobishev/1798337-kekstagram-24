const formModal = document.querySelector('#upload-select-image');
const getData = (onSuccessPicture, onSuccessPreviews, onFail) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        response.json();
      } else {
        onFail('Не удалось загрузить данные. Сервер недоступен');
      }
    })
    .then((postsArray) => {
      onSuccessPicture(postsArray);
      onSuccessPreviews(postsArray);
    })
    .catch(() => {
      onFail('Не удалось загрузить данные');
    });
};

const sendData = (onSuccess, onFail, body) => {
  formModal.addEventListener('submit', (evt) => {
    evt.preventDefault();

    // const formData = new FormData(evt.target);

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
          onFail('Не удалось отправить форму. Попробуйте ещё раз');
        }
      })
      .catch(() => {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      });
  });
};

export {getData, sendData};
