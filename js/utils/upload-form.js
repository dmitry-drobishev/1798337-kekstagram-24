// показывается форма редактирования изображения.
//  У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open

const userModalElement = document.querySelector('.img-upload__overlay');
const siteBody = document.querySelector('body');

function openNewPhotoModal () {
  userModalElement.classList.remove('hidden');
  siteBody.classList.add('.modal-open');
}
// openNewPhotoModal ();

function closeNewPhotoModal () {
  userModalElement.classList.add('hidden');
  siteBody.classList.remove('.modal-open');
}

const uploadFile = document.querySelector('#upload-file');
uploadFile.addEventListener('change', () => {
  openNewPhotoModal ();
});

const closeModalButton = document.querySelector('#upload-cancel');
closeModalButton.addEventListener('click', () => {
  closeNewPhotoModal();
});

const isEscKey = (evt) => evt.key === 'Escape';

document.addEventListener('keydown', (evt) => {
  if (isEscKey(evt)) {
    closeNewPhotoModal();
  }
});
