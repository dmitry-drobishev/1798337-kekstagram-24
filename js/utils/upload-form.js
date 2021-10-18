const photoModal = document.querySelector('.img-upload__overlay');
const siteBody = document.querySelector('body');
const openModalButton = document.querySelector('#upload-file');
const closeModalButton = document.querySelector('#upload-cancel');
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
}

openModalButton.addEventListener('change', () => {
  openPhotoModal ();
});

closeModalButton.addEventListener('click', () => {
  closePhotoModal ();
});
