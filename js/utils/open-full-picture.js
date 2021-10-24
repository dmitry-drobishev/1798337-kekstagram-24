import { isEscKey } from './upload-form.js';

const bigPicture = document.querySelector('.big-picture');
const minPicture = document.querySelector('.pictures');
const closeFullPictureButton = document.querySelector('.big-picture__cancel');
const siteBody = document.querySelector('body');
const commentPattern = bigPicture.querySelector('.social__comment');
const commentsContainer = bigPicture.querySelector('.social__comments');

const onPostEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    // closeFullPicture();
  }
};

const openFullPicture = () => {
  bigPicture.classList.remove('hidden');
  siteBody.classList.add('modal-open');
  document.addEventListener('keydown', onPostEscKeydown);
};

const closeFullPicture = () => {
  bigPicture.classList.add('hidden');
  siteBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onPostEscKeydown);
};

const openPost = (postsArray) => {

  minPicture.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture') || evt.target.classList.contains('.picture')) {
      openFullPicture();
    }

    const postId = evt.target.getAttribute('data-id') - 1;
    // console.log(postId);
    bigPicture.querySelector('.big-picture__img > img').src = postsArray[postId].url;
    bigPicture.querySelector('.social__caption').textContent = postsArray[postId].description;
    bigPicture.querySelector('.likes-count').textContent = postsArray[postId].like;
    bigPicture.querySelector('.comments-count').textContent = postsArray[postId].comments.length;
    // const comment = postsArray[postId].comments[1];
    // console.log(comment);

    const commentsElements = document.createDocumentFragment();
    const comments = postsArray[postId].comments;
    // console.log(comments);

    comments.forEach((c) => {
      const newComment = commentPattern.cloneNode(true);
      newComment.querySelector('.social__picture').src = c.avatar;
      commentsElements.appendChild(newComment);
      // console.log(newComment);
      // console.log(c);
    });

    commentsContainer.appendChild(commentsElements);
  });

  closeFullPictureButton.addEventListener('click', closeFullPicture);
};
export { openPost };

