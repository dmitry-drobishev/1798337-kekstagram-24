import { isEscKey } from './upload-form.js';

const bigPicture = document.querySelector('.big-picture');
const minPicture = document.querySelector('.pictures');
const closeFullPictureButton = document.querySelector('.big-picture__cancel');
const siteBody = document.querySelector('body');
const commentPattern = bigPicture.querySelector('.social__comment');
const commentsContainer = bigPicture.querySelector('.social__comments');

const closePost = () => {
  bigPicture.classList.add('hidden');
  siteBody.classList.remove('modal-open');
};

const onPostEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    closePost();
  }
};

const openFullPicture = () => {
  bigPicture.classList.remove('hidden');
  siteBody.classList.add('modal-open');
  document.addEventListener('keydown', onPostEscKeydown);
};

const closeFullPicture = () => {
  closePost();
  document.removeEventListener('keydown', onPostEscKeydown);
};

const completionPost = (evt, postsArray) => {
  const postId = evt.target.getAttribute('data-id') - 1;
  const commentsElements = document.createDocumentFragment();
  const comments = postsArray[postId].comments;

  bigPicture.querySelector('.big-picture__img > img').src = postsArray[postId].url;
  bigPicture.querySelector('.social__caption').textContent = postsArray[postId].description;
  bigPicture.querySelector('.likes-count').textContent = postsArray[postId].like;
  bigPicture.querySelector('.comments-count').textContent = postsArray[postId].comments.length;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  comments.forEach((comment) => {
    const newComment = commentPattern.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    commentsElements.appendChild(newComment);
  });
  commentsContainer.innerHTML = '';
  commentsContainer.appendChild(commentsElements);
};

const openPost = (postsArray) => {
  minPicture.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture') || evt.target.classList.contains('.picture')) {
      openFullPicture();
      completionPost(evt, postsArray);
    }
  });

  closeFullPictureButton.addEventListener('click', closeFullPicture);
};

export { openPost };
