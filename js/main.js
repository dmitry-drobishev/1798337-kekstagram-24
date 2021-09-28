// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// Учтите, что диапазон может быть только положительный, включая ноль.
// А также придумайте, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.

function getRandomIntInclusive(min, max) {

  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max <= min) {
    return false;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomIntInclusive(-100, 1000.2));

// Функция для проверки максимальной длины строки.

function stringLengthCheck(myString, maxLength) {
  return myString.length <= maxLength;
}

console.log(stringLengthCheck('строка', 10));
