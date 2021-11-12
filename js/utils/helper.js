const isEscKey = (evt) => evt.key === 'Escape';

const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array;
};

export { isEscKey, shuffleArray };
