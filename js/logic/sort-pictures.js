import { getRandomPositiveInteger } from '../utils/get-random-positive-integer.js';
import { createMinPictures } from './create-min-pictures.js';
const minPicturesFilter = document.querySelector('.img-filters');
let postsArray = [];

const showFilters = () => {
  minPicturesFilter.classList.remove('img-filters--inactive');
};

const setPostsArray = (array) => {
  postsArray = array;
};

const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
  const newArray = array.slice(0, 10);
  return newArray;
};

// Функция возвращает новый массив с 10 рандомными элементами передаваемого (функция отличная но не подходит)
const getRandomArray = (array) => {
  const setRandom = new Set();
  while (setRandom.size < 10) {
    const i = getRandomPositiveInteger(0, 24);
    if (!setRandom.has(i)) {
      setRandom.add(i);
    }
  }
  const newRandomArray = [];
  for (const i of setRandom) {
    newRandomArray.push(array[i]);
  }
  return newRandomArray;
};

// Функция очищает страницу от миниатюр фотографий
const removeMinPictures = () => {
  document.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
};

// Функция сортировки
const comparePosts = (postA, postB) => {
  const rankA = postA.comments.length;
  const rankB = postB.comments.length;
  return rankA - rankB;
};

const comparePostsArray = (array) => {
  const newArray = array.slice().sort(comparePosts);
  createMinPictures(newArray);
};

const sortMinPictures = () => {
  minPicturesFilter.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      const filterName = evt.target.id;
      switch (filterName) {
        case 'filter-default':
          removeMinPictures();
          createMinPictures(postsArray);
          break;
        case 'filter-random':
          removeMinPictures();
          createMinPictures(shuffleArray(postsArray));
          break;
        case 'filter-discussed':
          removeMinPictures();
          comparePostsArray(postsArray);
          break;
      }
    }

  });
};

export { showFilters, sortMinPictures, getRandomArray, setPostsArray, shuffleArray};


// 1) функции для сортировки 10 случайных. предаю массив объектов. ранодомлю копированный массив, вырезаю 10 элементов и передаю в функцию createMinPicture
// 2)
// document.querySelector('.pictures').innerHTML = '';

// document.querySelectorAll('.picture').forEach((element) => {element.remove()});
// const array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,23,24];

