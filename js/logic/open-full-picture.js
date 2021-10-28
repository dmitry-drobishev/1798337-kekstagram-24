import { isEscKey } from '../utils/helper.js';
// import { postsArray } from '../main.js';

const bigPicture = document.querySelector('.big-picture');
const minPicture = document.querySelector('.pictures');
const closeFullPictureButton = document.querySelector('.big-picture__cancel');
const siteBody = document.querySelector('body');
const commentPattern = bigPicture.querySelector('.social__comment');
const commentsContainer = bigPicture.querySelector('.social__comments');
const loadingCommentsButton = bigPicture.querySelector('.comments-loader');
const commentsLoaded = bigPicture.querySelector('.comments-loaded');
let lastCommentIndex = 0;
const offsetComments = 5;
// комментарии к выбранному посту
let currentPostComments = [];

// Функция загружает 5 комментариев в фрагмент
const loadingComments = (startComment, commentsArray) => {
  const comments = commentsArray.slice(startComment, startComment + offsetComments);
  const commentsElements = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newComment = commentPattern.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    commentsElements.appendChild(newComment);
  });
  lastCommentIndex = lastCommentIndex + commentsElements.childElementCount;

  if (lastCommentIndex >= commentsArray.length) {
    loadingCommentsButton.classList.add('hidden');
  }
  commentsLoaded.textContent = lastCommentIndex;
  return commentsElements;
};

const addingCommentsToPost = (comments) => {
  commentsContainer.appendChild(loadingComments(lastCommentIndex, comments));
};

// Функция открывает пост
const openFullPicture = (evt, postsArray) => {
  const postId = evt.target.getAttribute('data-id');
  const post = postsArray[postId];
  // const comments = post.comments;
  currentPostComments = post.comments;
  lastCommentIndex = 0;

  bigPicture.querySelector('.big-picture__img > img').src = post.url;
  bigPicture.querySelector('.social__caption').textContent = post.description;
  bigPicture.querySelector('.likes-count').textContent = post.like;
  bigPicture.querySelector('.comments-count').textContent = post.comments.length;

  commentsLoaded.textContent = lastCommentIndex;
  commentsContainer.innerHTML = '';

  addingCommentsToPost(currentPostComments);
  bigPicture.classList.remove('hidden');
  siteBody.classList.add('modal-open');
  // document.addEventListener('keydown', onPostEscKeydown);
  loadingCommentsButton.addEventListener('click', addingCommentsToPost.bind(null, currentPostComments));
};

// Функция закрывает окно поста
const closePost = () => {
  bigPicture.classList.add('hidden');
  siteBody.classList.remove('modal-open');
  loadingCommentsButton.removeEventListener('click', addingCommentsToPost.bind(null, currentPostComments));
};

// Функция проверяет нажат ли esc
const onPostEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    closePost();
  }
};

// Функция закрытия поста, убирает обработчик события
const closeFullPicture = () => {
  closePost();
  document.removeEventListener('keydown', onPostEscKeydown);
};

const openPost = (postsArray) => {
  minPicture.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture')) {
      openFullPicture(evt, postsArray);
    }
  });

  closeFullPictureButton.addEventListener('click', closeFullPicture);
};

export { openPost };
