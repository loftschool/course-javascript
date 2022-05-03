/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */
function showItem(item) {
  console.log(item);
}

function forEach(array, fn) {
  array.forEach(fn);
}

forEach([1, 2, 3], showItem);

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */
function showItemMap(item) {
  return item ** 2;
}

function map(array, fn) {
  return array.map(fn);
}
map([1, 2, 3], showItemMap);
/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */
function reduce(array, fn, initial) {
  return array.reduce(fn, initial);
}

function sumArray(all, current) {
  return all + current;
}

reduce([1, 2, 3], sumArray, 0);

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
const people = {
  name: 'Сергей',
  lastName: 'Петров',
};

function upperProps(obj) {
  const property = Object.keys(obj).map((el) => el.toUpperCase());
  return property;
}

upperProps(people);
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
    set(target, prop, value) {
      target[prop] = value ** 2;
      return target[prop];
    },
  });
}

const obj = createProxy({});
obj.foo = 2;
console.log(obj.foo);

export { forEach, map, reduce, upperProps, createProxy };
