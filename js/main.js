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

getRandomIntInclusive(-100, 101);

// Функция для проверки максимальной длины строки.
function stringLengthCheck(myString, maxLength) {
  return myString.length <= maxLength;
}

stringLengthCheck('строка', 10);
