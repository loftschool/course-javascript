/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
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
  const new_array = [];
  for (let i = 0; i < array.length; i++) {
    new_array[i] = fn(array[i], i, array);
  }
  return new_array;
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
  let prev = hasInitial ? initial : array[0];

  for (let i = hasInitial ? 0 : 1; i < array.length; i++) {
    prev = fn(prev, array[i], i, array);
  }

  return prev;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  const new_array = [];

  // eslint-disable-next-line no-undef
  for (const item in obj) {
    // new_array.push(obj.item.toUpperCase());
    // eslint-disable-next-line no-undef
    new_array.push(item.toUpperCase());
  }

  return new_array;
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
  // eslint-disable-next-line no-unused-vars
  return new Proxy(obj, {
    set(obj, prop, val) {
      obj[prop] = val ** 2;
      return true;
    },
  });
}

export { forEach, map, reduce, upperProps, createProxy };
