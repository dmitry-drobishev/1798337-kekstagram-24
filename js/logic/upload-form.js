import { isEscKey } from '../utils/helpers.js';
import { initSlider, handleRemoveSlider } from './slider.js';
import { initScalePicture, removeScalePicture } from './scale-picture.js';
import { sendData } from './api.js';

const MAX_HASHTAG_LENGTH = 5;

const photoModal = document.querySelector('.img-upload__overlay');
const formModal = document.querySelector('#upload-select-image');
const siteBody = document.querySelector('body');
const openModalButton = document.querySelector('#upload-file');
const closeModalButton = document.querySelector('#upload-cancel');
const userCommentInput = document.querySelector('.text__description');
const hashtagsRegexp =  /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const userHashtagInput = document.querySelector('.text__hashtags');

const closePopup = () => {
  photoModal.classList.add('hidden');
  siteBody.classList.remove('.modal-open');
  openModalButton.value = null;
  formModal.reset();
  handleRemoveSlider();
  removeScalePicture();
  document.removeEventListener('keydown', onModalEscKeydown);
};

function onModalEscKeydown (evt) {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}

const onOpenModalButtonClick = () => {
  photoModal.classList.remove('hidden');
  siteBody.classList.add('.modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
  initSlider();
  initScalePicture();
};

const onCloseModalButtonClick = () => {
  closePopup();
};

const stopEscEvent = (evt) => {
  if (isEscKey(evt)) {
    evt.stopPropagation();
  }
};

const testHashtagsArrayOnReg = (hashtags) => {
  for (let i = 0; i < hashtags.length; i++) {
    if (!hashtagsRegexp.test(hashtags[i])) {

      return false;
    }
  }
  return true;
};

const testHashtagsArrayOnUnique = (hashtags) => {
  const newHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = Array.from(new Set(newHashtags));
  return hashtags.length === uniqueHashtags.length;
};

const userHashtagInputHandler = () => {
  const hashtags = userHashtagInput.value.split(' ');
  if (!testHashtagsArrayOnReg(hashtags) && userHashtagInput.value !== '') {
    userHashtagInput.setCustomValidity(`- хэш-тег начинается с символа # (решётка);
    - строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
    - хеш-тег не может состоять только из одной решётки;
    - максимальная длина одного хэш-тега 20 символов, включая решётку;
    - хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
    - хэш-теги разделяются пробелами;`);
  } else if (hashtags.length > MAX_HASHTAG_LENGTH) {
    userHashtagInput.setCustomValidity('Нельзя указывать больше пяти хэш-тегов');
  } else if (!testHashtagsArrayOnUnique(hashtags)) {
    userHashtagInput.setCustomValidity('Хеш-теги не должны повторяться');
  } else {
    userHashtagInput.setCustomValidity('');
  }
  userHashtagInput.reportValidity();
};

// Функция убирает сообщение об успешной загрузке изображения
const closeSuccessPopup = () => {
  const successPopup = document.querySelector('.success');
  successPopup.remove();
  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
  document.removeEventListener('click', onOuterSuccessPopupClick);
};

function onSuccessPopupButtonClick () {
  closeSuccessPopup();
}

function onSuccessPopupEscKeydown (evt) {
  if (isEscKey(evt)) {
    closeSuccessPopup();
  }
}

function onOuterSuccessPopupClick (evt) {
  if (!evt.target.closest('.success__inner')) {
    closeSuccessPopup();
  }
}

// Функция показывает сообщение об успешной загрузке изображения
const showSuccessPopup = () => {
  const successTemplate = document.querySelector('#success').content;
  const successPattern = successTemplate.querySelector('.success');
  const successPopup = successPattern.cloneNode(true);

  successPopup.querySelector('.success__button').addEventListener('click', onSuccessPopupButtonClick);

  document.addEventListener('click', onOuterSuccessPopupClick);

  document.addEventListener('keydown', onSuccessPopupEscKeydown);

  siteBody.appendChild(successPopup);
};

// Функция убирает сообщение об ошибке при загрузке изображения
const closeFailPopup = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onFailPopupEscKeydown);
  document.removeEventListener('click', onOuterFailPopupClick);
};

function onFailPopupButtonClick () {
  closeFailPopup();
}

function onFailPopupEscKeydown (evt) {
  if (isEscKey(evt)) {
    closeFailPopup();
  }
}

function onOuterFailPopupClick (evt) {
  if (!evt.target.closest('.error__inner')) {
    closeFailPopup();
  }
}

// Функция показывает сообщение об ошибке при загрузке изображения
const showFailPopup = () => {
  const failTemplate = document.querySelector('#error').content;
  const failPattern = failTemplate.querySelector('.error');
  const failPopup = failPattern.cloneNode(true);

  failPopup.querySelector('.error__button').addEventListener('click', onFailPopupButtonClick);

  document.addEventListener('click', onOuterFailPopupClick);

  document.addEventListener('keydown', onFailPopupEscKeydown);

  siteBody.appendChild(failPopup);
};

// Функция отправки формы
const setUserFormSubmit = () => {
  formModal.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      new FormData(evt.target),
      showSuccessPopup,
      showFailPopup,
    );
    closePopup();
  });
};

// Функция для работы с формой загрузки изображения
const initUploadForm = () => {
  openModalButton.addEventListener('change', onOpenModalButtonClick);

  closeModalButton.addEventListener('click', onCloseModalButtonClick);

  userCommentInput.addEventListener('keydown', (evt) => {
    stopEscEvent(evt);
  });

  userHashtagInput.addEventListener('keydown', (evt) => {
    stopEscEvent(evt);
  });

  userHashtagInput.addEventListener('input', userHashtagInputHandler);

  setUserFormSubmit();
};

export { initUploadForm };
