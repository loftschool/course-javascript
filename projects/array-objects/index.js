/* ДЗ 2 - работа с массивами и объектами */
export { forEach, map, reduce, upperProps, createProxy };

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))


function callback (item, index, array){
  console.log(item, index, array);
}

let massive =[1,2,3];

forEach(massive, callback);
 */

function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */

function map(array, fn) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray.push(fn(array[i], i, array));
  }
  return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */
function reduce(array, fn, initial) {
  const hasInitial = typeof initial !== 'undefined';
  let first = hasInitial ? initial : array[0];

  for (let i = hasInitial ? 0 : 1; i < array.length; i++) {
    first = fn(first, array[i], i, array);
    return first;
  }
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  const mas = [];
  for (const item in obj) {
    mas.push(obj[item].toUpperCase);
  }
  return mas;
}

/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4








*/
function createProxy(obj) {
  return new Proxy(obj, {
    set(obj, key, value) {
      // obj = {} key = foo value = 2
      obj[key] = value ** 2;
      return true;
    },
  });
}
