/**
 * ДЗ 2 - работа с массивами и объектами
 */

/**
 * Задание 1:
 *
 * Напишите аналог встроенного метода forEach для работы с массивами.
 * Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 *
 * Пример:
 *   forEach([1, 2, 3], (el) => console.log(el)); // выведет каждый элемент массива
 */

function forEach(array, fn) {
  for (const [i, el] of array.entries()) {
    fn(el, i, array);
  }
}

/**
 * Задание 2:
 *
 * Напишите аналог встроенного метода map для работы с массивами.
 * Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 *
 * Пример:
 *   const newArray = map([1, 2, 3], (el) => el ** 2);
 *   console.log(newArray); // выведет [1, 4, 9]
 */
function map(array, callback) {
  const resultArray = [];

  for (let i = 0; i < array.length; i++) {
    resultArray.push(callback(array[i], i, array));
  }

  return resultArray;
}

/**
 * Задание 3:
 *
 * Напишите аналог встроенного метода reduce для работы с массивами.
 * Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 *
 * Пример:
 *   const sum = reduce([1, 2, 3], (all, current) => all + current);
 *   console.log(sum); // выведет 6
 */
function reduce(array, callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : array[0];
  const startingIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startingIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }

  return accumulator;
}

/**
 * Задание 4:
 *
 * Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива
 *
 * Пример:
 *   const keys = upperProps({ name: 'Сергей', lastName: 'Петров' });
 *   console.log(keys) // выведет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Параметр должен быть объектом');
  }

  const resultArray = [];

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      resultArray.push(key.toUpperCase());
    }
  }

  return resultArray;
}

export { forEach, map, reduce, upperProps };
