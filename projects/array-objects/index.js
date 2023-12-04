/* ДЗ 2 - работа с массивами и объектами */

/*
Задание 1:

Напишите аналог встроенного метода forEach для работы с массивами.
Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

Пример:
   forEach([1, 2, 3], (el) => console.log(el)); // выведет каждый элемент массива
 */
function forEach(arr, f) {
  for (let i = 0; i < arr.length; i++) {
    f(arr[i], i, arr);
  }
}
// forEach([1, 2, 3], (el) => console.log(el));

/*
Задание 2:

Напишите аналог встроенного метода map для работы с массивами.
Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

Пример:
   const newArray = map([1, 2, 3], (el) => el ** 2);
   console.log(newArray); // выведет [1, 4, 9]
 */
function map(arr, f) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res.push(f(arr[i], i, arr));
  }
  return res;
}
// const newArray = map([1, 2, 3], (el) => el ** 2);
// console.log(newArray);

/*
Задание 3:

Напишите аналог встроенного метода reduce для работы с массивами.
Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

Пример:
  const sum = reduce([1, 2, 3], (all, current) => all + current);
  console.log(sum); // выведет 6
 */
function reduce(arr, f, initial) {
  let currVal = initial || arr[0];
  const currIndex = initial ? 0 : 1;

  for (let i = currIndex; i < arr.length; i++) {
    currVal = f(currVal, arr[i], i, arr);
  }
  return currVal;
}
// const sum = reduce([1, 2, 3, 4, 5, 6], (all, current) => all + current);
// console.log(sum);

/*
Задание 4:

Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

Пример:
  const keys = upperProps({ name: 'Сергей', lastName: 'Петров' });
  console.log(keys) // выведет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  const arr = [];
  for (const keys in obj) {
    const res = keys.toUpperCase();
    arr.push(res);
  }
  return arr;
}
// const keys = upperProps({ name: 'Сергей', lastName: 'Петров' });
// console.log(keys);

export { forEach, map, reduce, upperProps };
