const photoModal = document.querySelector('.img-upload__overlay');
const siteBody = document.querySelector('body');
const openModalButton = document.querySelector('#upload-file');
const closeModalButton = document.querySelector('#upload-cancel');
const userComment = document.querySelector('.text__description');

const isEscKey = (evt) => evt.key === 'Escape';

const onModalEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closePhotoModal ();
  }
};

function openPhotoModal () {
  photoModal.classList.remove('hidden');
  siteBody.classList.add('.modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
}

function closePhotoModal () {
  photoModal.classList.add('hidden');
  siteBody.classList.remove('.modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
  openModalButton.value = null;
}

openModalButton.addEventListener('change', () => {
  openPhotoModal ();
});

closeModalButton.addEventListener('click', () => {
  closePhotoModal ();
});

const reHashtags =  /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const userHashtagInput = document.querySelector('.text__hashtags');

userHashtagInput.addEventListener('input', () => {

  const hashtagsArray = userHashtagInput.value.split(' ');
  for (let hashtag = 0; hashtag < hashtagsArray.length; hashtag++) {
    if (reHashtags.test(hashtagsArray[hashtag])) {
      userHashtagInput.setCustomValidity('');
    } else {
      userHashtagInput.setCustomValidity('Херню ввёл');
      break;
    }
  }
  userHashtagInput.reportValidity();
});

userComment.addEventListener('keydown', (evt) => {
  if (isEscKey(evt)) {
    evt.stopPropagation();
  }
});

// #upload-select-image
//reset form
