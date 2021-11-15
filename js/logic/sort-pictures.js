import { createMinPictures } from './create-min-pictures.js';
import { shuffleArray } from '../utils/helpers.js';
import { debounce } from '../utils/debounce.js';
const minPicturesFilter = document.querySelector('.img-filters');

// Функция показывает блок с фильтром
const showFilters = () => {
  minPicturesFilter.classList.remove('img-filters--inactive');
};

// Функция возвращает 10 рандомных элементов массива
const getRandomPosts = (array) => shuffleArray(array).slice(0, 10);

// Функция очищает страницу от миниатюр фотографий
const removeMinPictures = () => {
  document.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
};

// Функция сортировки
const comparePosts = (postA, postB) => postB.comments.length - postA.comments.length;

// Функция сортировки по популярности
const sortByPopular = (array) => array.slice().sort(comparePosts);

// Функция работы фильтра
const sortMinPictures = (array) => {
  minPicturesFilter.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      const filterName = evt.target.id;
      debounce(() => {
        switch (filterName) {
          case 'filter-default':
            removeMinPictures();
            createMinPictures(array);
            break;
          case 'filter-random':
            removeMinPictures();
            createMinPictures(getRandomPosts(array));
            break;
          case 'filter-discussed':
            removeMinPictures();
            createMinPictures(sortByPopular(array));
            break;
        }
      })(filterName);
    }
  });
};

export { showFilters, sortMinPictures };
