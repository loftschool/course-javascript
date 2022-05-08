/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */

const array = ['a', 'b', 'c'];

function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i]);
  }
}

forEach(array, (el) => console.log(el));

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */

const array2 = [2, 4, 6];

function map(array2, fn) {
  const newArr = [];

  for (let i = 0; i < array2.length; i++) {
    const elem = fn(array2[i]);
    newArr.push(elem);
  }

  return newArr;
}

const newArray2 = map(array2, (el) => el ** 2);
console.log(newArray2);

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */

const array4 = [1, 2, 3, 4, 5];

function reduce(array4, fn, initial) {
  let prev = initial ? initial : array4[0];

  for (let i = initial ? 0 : 1; i < array4.length; i++) {
    prev = fn(prev, array4[i], i, array4);
  }

  return prev;
}

const reduceVar = reduce(array4, (all, current) => all + current);
console.log(reduceVar);

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */

const object = {
  name: 'Andrew',
  lastName: 'Melnichenko',
  old: 22,
};

function upperProps(object) {
  const arr = [];

  for (const key in object) {
    arr.push(key.toUpperCase());
  }

  return arr;
}

const upperPropsVar = upperProps(object);
console.log(upperPropsVar);

/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */

const obj = createProxy({
  age: 22,
  wasBorn: 1999,
});

function createProxy(obj) {
  return new Proxy(obj, {
    set(obj, key, value) {
      obj[key] = value ** 2;
      return true;
    },
  });
}

obj.age = 4;

console.log(obj.age);

export { forEach, map, reduce, upperProps, createProxy };
