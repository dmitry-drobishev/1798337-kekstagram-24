import { getRandomPositiveInteger } from './get-random-positive-integer.js';

// Функции для создания массива из 25 сгенерированных объектов.
const NAMES = [
  'Роман',
  'Рамзан',
  'Егор',
  'Лев',
  'Алексей',
  'Костантин',
  'Павел',
  'Сергей',
  'Дмитрий',
  'Василий',
  'Денис',
  'Александр',
  'Пеларгея',
  'Серафима',
  'Русальна',
  'Цветана',
  'Татьяна',
  'Нина',
  'Галя',
  'Ярослав',
  'Святополк',
  'Мария',
  'Ання',
  'Екатерина',
  'Дарья',
];

const DESCRIPTIONS = [
  'Цитата Джейсона Стейтема #1',
  'Цитата Джейсона Стейтема #2',
  'Цитата Джейсона Стейтема #3',
  'Цитата Джейсона Стейтема #4',
  'Цитата Джейсона Стейтема #5',
  'Цитата Джейсона Стейтема #6',
  'Цитата Джейсона Стейтема #7',
  'Цитата Джейсона Стейтема #8',
  'Цитата Джейсона Стейтема #9',
  'Цитата Джейсона Стейтема #10',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const MIN_LIKES_VALUE = 15;
const MAX_LIKES_VALUE = 200;
const POSTS_VALUE = 25;
const commentsId = [];
const tries = 10;

const createRandomId = (postId) => {
  for (let tryNumber = 0; tryNumber <= tries; tryNumber++) {
    const newId = parseInt(`${postId}${getRandomPositiveInteger(0, 1000)}`,10);
    if (!commentsId.includes(newId)) {
      commentsId.push(commentsId);
      return newId;
    }
  }
};

const createComments = (postId, commentsValue = 1) => {
  const commentsArray = [];
  for (let commentsCounter = 0; commentsCounter < commentsValue; commentsCounter++) {
    commentsArray.push({
      id: createRandomId(postId),
      avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
      message: COMMENTS[getRandomPositiveInteger(0, COMMENTS.length - 1)],
      name: NAMES[getRandomPositiveInteger(0, NAMES.length - 1)],
    });
  }
  return commentsArray;
};

const createPost = (postId) => ({
  id: postId,
  url: `photos${postId}.jpg`,
  description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length - 1)],
  like: getRandomPositiveInteger(MIN_LIKES_VALUE, MAX_LIKES_VALUE),
  comments: createComments(postId, 3),
});

const createPosts = (postValue = POSTS_VALUE) => {
  const postArray = [];
  for (let postId = 1; postId <= postValue; postId++) {
    postArray.push(createPost(postId));
  }
  return postArray;
};

export {createPosts};
