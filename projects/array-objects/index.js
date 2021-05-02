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
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const newVal = fn(array[i], i, array);
    newArray.push(newVal);
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
  let current;
  let i;
  if (initial === undefined) {
    current = array[0];
    i = 1;
  } else {
    current = initial;
    i = 0;
  }
  for (i; i < array.length; i++) {
    current = fn(current, array[i], i, array);
  }
  return current;
}

/*
    Задание 4:
    Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива
    Пример:
      upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
    */
function upperProps(obj) {
  //    const props = [];
  //    for (const name in obj){
  //      props.push(name.toUpperCase())
  //    }
  //    return props;
  return Object.keys(obj).map((name) => name.toUpperCase());
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
      obj[key] = value ** 2;
      return true;
    },
  });
}

export { forEach, map, reduce, upperProps, createProxy };
