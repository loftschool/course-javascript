/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами.
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el)); // выведет каждый элемент массива
 */

function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

function forEach1(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
}

forEach1([1, 2, 3, 4]);

function forEach2(arr) {
  for (const el of arr.entries()) {
    console.log(el);
  }
}

forEach2([1, 2, 3, 4, 5, 56]);

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами.
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   const newArray = map([1, 2, 3], (el) => el ** 2);
   console.log(newArray); // выведет [1, 4, 9]
 */

function map(array, fn) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray[i] = fn(array[i], i, array);
  }
  return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами.
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   const sum = reduce([1, 2, 3], (all, current) => all + current);
   console.log(sum); // выведет 6 
 */

function reduce(array, fn, initial) {
  let start = 0;
  let sum = initial;

  if (initial === undefined) {
    start = 1;
    sum = array[0];
  }

  for (let i = start; i < array.length; i++) {
    sum = fn(sum, array[i], i, array);
  }

  return sum;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   const keys = upperProps({ name: 'Сергей', lastName: 'Петров' });
   console.log(keys) // выведет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  const keys = [];

  for (let key in obj) {
    key = key.toUpperCase();
    keys.push(key);
  }
  return keys;
}

export { forEach, map, reduce, upperProps };
