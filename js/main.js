// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// Учтите, что диапазон может быть только положительный, включая ноль.
// А также придумайте, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.
function getRandomIntInclusive(min, max) {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  if (minValue >= 0 && maxValue > minValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  }
  throw new Error('Некорректное значение аргумента');
}

// getRandomIntInclusive(-100, 101);

// Функция для проверки максимальной длины строки.
// function stringLengthCheck(myString, maxLength) {
//   return myString.length <= maxLength;
// }

// stringLengthCheck();

// Функции для создания массива из 25 сгенерированных объектов.
// Структура каждого объекта должна быть следующей:
// id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
// description, строка — описание фотографии. Описание придумайте самостоятельно.
// likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:

// У каждого комментария есть идентификатор — id — случайное число. Идентификаторы не должны повторяться.

// Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

// Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения/


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
const POSTS_VALUE = 5; // 25
const myArray = [];
let commentsId = [];
const tries = 10;

const createRandomId = (postId) => {
  for (let j = 0; j <= tries; j++) {
    let newId = parseInt(`${postId}${getRandomIntInclusive(0, 1000)}`,10);
    if (commentsId.includes(newId)) {
      continue;
    } else {
      commentsId.push(commentsId);
      return newId;
    }
  }

//   commentsId.forEach(

//   )
//     if (newId != commentsId[j]) {
//       commentsId.push
//     }
//   }
};

const createComments = (postId) => ({
  id: createRandomId(postId),
  avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
  message: COMMENTS[getRandomIntInclusive(0, COMMENTS.length - 1)],
  name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)],
});

const createPost = (i) => ({
  id: i,
  url: `photos${i}.jpg`,
  description: DESCRIPTIONS[getRandomIntInclusive(0, DESCRIPTIONS.length - 1)],
  like: getRandomIntInclusive(MIN_LIKES_VALUE, MAX_LIKES_VALUE),
  comments: Array.from({length: 2}, createComments),
});


for (let i = 1; i <= POSTS_VALUE; i++) {
  myArray.push(createComments(i));
  // myArray = Array.from({length: 3}, createComments);
}

// console.log(myArray);

console.log(Array.from({length: 3}, createComments));
