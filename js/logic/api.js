// import { addSuccessPopup } from "./upload-form";

const getData = (onSuccessPicture, onSuccessPreviews, onFail) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((postsArray) => {
      onSuccessPicture(postsArray);
      onSuccessPreviews(postsArray);
    })
    .catch(() => {
      onFail('Не удалось загрузить данные. Попробуйте ещё раз');
    });
};

const sendData = (onSuccess, successPopap, onFail, body) => {
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
        successPopap();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
