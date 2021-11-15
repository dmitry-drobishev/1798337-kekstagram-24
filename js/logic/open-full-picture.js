import { isEscKey } from '../utils/helpers.js';

const fullPicturePopup = document.querySelector('.big-picture'); // окна полноразмерного просмотра
const minPictureContainer = document.querySelector('.pictures'); // миниатюры
const closeFullPictureButton = document.querySelector('.big-picture__cancel'); // кнопка закрытия полноразмерного просмотра
const siteBody = document.querySelector('body');
const commentPattern = fullPicturePopup.querySelector('.social__comment'); // шаблон комментария
const commentsContainer = fullPicturePopup.querySelector('.social__comments'); // div с комментариями
const createCommentsButton = fullPicturePopup.querySelector('.comments-loader'); // кнопка «Загрузить ещё»
const commentsLoaded = fullPicturePopup.querySelector('.comments-loaded'); // счетчик заказанных комментариев
let lastCommentIndex = 0; // индекс последнего показанного комментрия
const COMMENTS_OFFSET = 5; // сколько комментариев загружать за раз
let currentPostCommentsArray = []; // комментарии к выбранному посту

// Функция загружает 5 комментариев в фрагмент
const createComments = (commentsArray) => {
  const comments = commentsArray.slice(lastCommentIndex, lastCommentIndex + COMMENTS_OFFSET);
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newComment = commentPattern.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(newComment);
  });

  lastCommentIndex = lastCommentIndex + commentsFragment.childElementCount;

  if (lastCommentIndex >= commentsArray.length) {
    createCommentsButton.classList.add('hidden');
  }
  commentsLoaded.textContent = lastCommentIndex;
  return commentsFragment;
};

// Функция добавляет фрагмент комментариев в пост
const addCommentsToPost = () => {
  commentsContainer.appendChild(createComments(currentPostCommentsArray));
};

// Функция открывает пост
const openFullPicture = (postId, postsArray) => {
  const post = postsArray[postId];
  currentPostCommentsArray = post.comments;
  lastCommentIndex = 0;

  fullPicturePopup.querySelector('.big-picture__img > img').src = post.url;
  fullPicturePopup.querySelector('.social__caption').textContent = post.description;
  fullPicturePopup.querySelector('.likes-count').textContent = post.likes;
  fullPicturePopup.querySelector('.comments-count').textContent = post.comments.length;

  commentsLoaded.textContent = lastCommentIndex;
  commentsContainer.innerHTML = '';
  addCommentsToPost(currentPostCommentsArray);
  fullPicturePopup.classList.remove('hidden');
  siteBody.classList.add('modal-open');
  createCommentsButton.addEventListener('click', addCommentsToPost);
};

// Функция закрывает окно поста
const closePost = () => {
  fullPicturePopup.classList.add('hidden');
  siteBody.classList.remove('modal-open');
  createCommentsButton.classList.remove('hidden');
  createCommentsButton.removeEventListener('click', addCommentsToPost);
};

// Функция закрытия окно при нажатии esc
const onPostEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    closePost();
    document.removeEventListener('keydown', onPostEscKeydown);
  }
};

// Функция закрытия поста
const closeFullPicture = () => {
  closePost();
  document.removeEventListener('keydown', onPostEscKeydown);
};

const initPostsPreviews = (postsArray) => {
  minPictureContainer.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture') && !evt.target.closest('.picture__info')) {
      const postId = evt.target.getAttribute('data-id');
      openFullPicture(postId, postsArray);
      document.addEventListener('keydown', onPostEscKeydown);
    }
  });

  closeFullPictureButton.addEventListener('click', closeFullPicture);
};

export { initPostsPreviews };
