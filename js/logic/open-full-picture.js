import { isEscKey } from '../utils/helper.js';

const fullPicturePopup = document.querySelector('.big-picture'); // окна полноразмерного просмотра
const minPictureContainer = document.querySelector('.pictures'); // миниатюры
const closeFullPictureButton = document.querySelector('.big-picture__cancel'); // кнопка закрытия полноразмерного просмотра
const siteBody = document.querySelector('body');
const commentPattern = fullPicturePopup.querySelector('.social__comment'); // шаблон комментария
const commentsContainer = fullPicturePopup.querySelector('.social__comments'); // div с комментариями
const loadingCommentsButton = fullPicturePopup.querySelector('.comments-loader'); // кнопка «Загрузить ещё»
const commentsLoaded = fullPicturePopup.querySelector('.comments-loaded'); // счетчик заказанных комментариев
let lastCommentIndex = 0; // индекс последнего показанного комментрия
const offsetComments = 5; // сколько комментариев загружать за раз
let currentPostCommentsArray = []; // комментарии к выбранному посту

// Функция загружает 5 комментариев в фрагмент
const loadingComments = (commentsArray) => {
  const comments = commentsArray.slice(lastCommentIndex, lastCommentIndex + offsetComments);
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
    loadingCommentsButton.classList.add('hidden');
  }
  commentsLoaded.textContent = lastCommentIndex;
  return commentsFragment;
};

// Функция добавляет фрагмент комментариев в пост
const addingCommentsToPost = () => {
  commentsContainer.appendChild(loadingComments(currentPostCommentsArray));
};

// Функция открывает пост
const openFullPicture = (evt, postsArray) => {
  const postId = evt.target.getAttribute('data-id');
  const post = postsArray[postId];
  currentPostCommentsArray = post.comments;
  lastCommentIndex = 0;

  fullPicturePopup.querySelector('.big-picture__img > img').src = post.url;
  fullPicturePopup.querySelector('.social__caption').textContent = post.description;
  fullPicturePopup.querySelector('.likes-count').textContent = post.like;
  fullPicturePopup.querySelector('.comments-count').textContent = post.comments.length;

  commentsLoaded.textContent = lastCommentIndex;
  commentsContainer.innerHTML = '';
  addingCommentsToPost(currentPostCommentsArray);
  fullPicturePopup.classList.remove('hidden');
  siteBody.classList.add('modal-open');
  loadingCommentsButton.addEventListener('click', addingCommentsToPost);
};

// Функция закрывает окно поста
const closePost = () => {
  fullPicturePopup.classList.add('hidden');
  siteBody.classList.remove('modal-open');
  loadingCommentsButton.classList.remove('hidden');
  loadingCommentsButton.removeEventListener('click', addingCommentsToPost);
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

const initPostsPrewviews = (postsArray) => {
  minPictureContainer.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      openFullPicture(evt, postsArray);
      document.addEventListener('keydown', onPostEscKeydown);
    }
  });

  closeFullPictureButton.addEventListener('click', closeFullPicture);
};

export { initPostsPrewviews };
