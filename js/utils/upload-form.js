const photoModal = document.querySelector('.img-upload__overlay');
const formModal = document.querySelector('#upload-select-image');
const siteBody = document.querySelector('body');
const openModalButton = document.querySelector('#upload-file');
const closeModalButton = document.querySelector('#upload-cancel');
const userCommentInput = document.querySelector('.text__description');
const hashtagsRegexp =  /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const userHashtagInput = document.querySelector('.text__hashtags');
const MAX_HASHTAG_LENGTH = 5;

const isEscKey = (evt) => evt.key === 'Escape';

const onModalEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const openPhotoModal = () => {
  photoModal.classList.remove('hidden');
  siteBody.classList.add('.modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
};

const closePhotoModal = () => {
  photoModal.classList.add('hidden');
  siteBody.classList.remove('.modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
  openModalButton.value = null;
  formModal.reset();
};

const stopEscEvent = (evt) => {
  if (isEscKey(evt)) {
    evt.stopPropagation();
  }
};

const testHashtagsArrayOnReg = (hashtagsArray) => {
  for (let hashtagIndex = 0; hashtagIndex < hashtagsArray.length; hashtagIndex++) {
    if (!hashtagsRegexp.test(hashtagsArray[hashtagIndex])) {
      return false;
    }
  }
  return true;
};

const testHashtagsArrayOnUnique = (hashtagsArray) => {
  const uniqueHashtags = Array.from(new Set(hashtagsArray));
  if (hashtagsArray.length !== uniqueHashtags.length) {
    return false;
  }
  return true;
};

const handleUserHashtagInput = () => {
  const hashtagsArray = userHashtagInput.value.split(' ');
  if (!testHashtagsArrayOnReg(hashtagsArray)) {
    userHashtagInput.setCustomValidity(`- хэш-тег начинается с символа # (решётка);
    - строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;
    - хеш-тег не может состоять только из одной решётки;
    - максимальная длина одного хэш-тега 20 символов, включая решётку;
    - хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
    - хэш-теги разделяются пробелами;`);
  } else if (hashtagsArray.length > MAX_HASHTAG_LENGTH) {
    userHashtagInput.setCustomValidity('Нельзя указывать больше пяти хэш-тегов');
  } else if (!testHashtagsArrayOnUnique(hashtagsArray)) {
    userHashtagInput.setCustomValidity('Хеш-теги не должны повторяться');
  } else {
    userHashtagInput.setCustomValidity('');
  }
  userHashtagInput.reportValidity();
};

const initUploadForm = () => {
  openModalButton.addEventListener('change', openPhotoModal);

  closeModalButton.addEventListener('click', closePhotoModal);

  userCommentInput.addEventListener('keydown', (evt) => {
    stopEscEvent(evt);
  });

  userHashtagInput.addEventListener('keydown', (evt) => {
    stopEscEvent(evt);
  });

  userHashtagInput.addEventListener('input', handleUserHashtagInput);
};

export { initUploadForm };
