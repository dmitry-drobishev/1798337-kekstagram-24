const minPicturesFilter = document.querySelector('.img-filters');
// let postsArray = [];

const showFilters = () => {
  minPicturesFilter.classList.remove('img-filters--inactive');
};

// const setPostsArray = (array) => {
//   postsArray = array;
// };

// const shuffle = (array) => {
//   array.sort(() => Math.random() - 0.5);
// };

// const getRandomArray = (array) => shuffle(array.slice());

const sortMinPictures = () => {
  minPicturesFilter.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      const filterName = evt.target.id;
      switch (filterName) {
        case 'filter-default':
          break;
        case 'filter-random':
          break;
        case 'filter-discussed':
          break;
      }
    }
  });
};

export { showFilters, sortMinPictures };
// export { showFilters, sortMinPictures, setPostsArray };


// 1) функции для сортировки 10 случайных. предаю массив объектов. ранодомлю копированный массив, вырезаю 10 элементов и передаю в функцию createMinPicture
// 2)
// document.querySelector('.pictures').innerHTML = '';

// document.querySelectorAll('.picture').forEach((element) => {element.remove()});

