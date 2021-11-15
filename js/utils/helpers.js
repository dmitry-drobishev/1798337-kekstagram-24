const isEscKey = (evt) => evt.key === 'Escape';

const shuffleArray = (array) => array.slice().sort(() => Math.random() - 0.5);

export { isEscKey, shuffleArray };
