import { createMinPictures } from './create-min-pictures.js';
import { debounce } from '../utils/debounce.js';
import { getRandomPosts} from '../utils/helpers.js';
const minPicturesFilter = document.querySelector('.img-filters');

// Функция показывает блок с фильтром
const showFilters = () => {
  minPicturesFilter.classList.remove('img-filters--inactive');
};

// Функция очищает страницу от миниатюр фотографий
const removeMinPictures = () => {
  document.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
};

// Функция сортировки
const comparePosts = (postA, postB) => postB.comments.length - postA.comments.length;

// Функция сортировки по популярности
const sortByPopular = (posts) => posts.slice().sort(comparePosts);

// Функция выполняет сортировку миниатюр выбранным способом
const sortPictures = (filterName, posts) => {
  switch (filterName) {
    case 'filter-default':
      removeMinPictures();
      createMinPictures(posts);
      break;
    case 'filter-random':
      removeMinPictures();
      createMinPictures(getRandomPosts(posts));
      break;
    case 'filter-discussed':
      removeMinPictures();
      createMinPictures(sortByPopular(posts));
      break;
  }
};

// Функция убирает дребезг
const onSortButtonClick = debounce(sortPictures);

// Функция работы фильтра
const sortMinPictures = (posts) => {
  minPicturesFilter.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      const filterName = evt.target.id;
      onSortButtonClick(filterName, posts);
    }
  });
};

export { showFilters, sortMinPictures };
