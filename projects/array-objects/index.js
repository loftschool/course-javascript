/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */
   function forEach(array, fn) {
     for (i=0; i< array.length; i++)
     {
       fn(array[i],i,array)
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
     const newArr = [];
     for(i=0; i<array.length;i++)
     {
       newArr[i]=fn(array[i], i, array);
     }
     return newArr
   }
   
   /*
    Задание 3:
    Напишите аналог встроенного метода reduce для работы с массивами
    Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
    Пример:
      reduce([1, 2, 3], (all, current) => all + current) // 6
    */
   function reduce(array, fn, initial) {
     let isInitial = typeof initial !== 'undefined';
     let test = isInitial ? initial : array[0];
     for(i=isInitial ? 0:1; i<array.length; i++)
     {
       test = fn(test,array[i],i,array)
     }
     return test
   }
   
   /*
    Задание 4:
    Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива
    Пример:
      upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
    */
   function upperProps(obj) {
      let arr = [];
      for(const name in obj)
      {
        arr.push(name.toUpperCase());
      }
      return arr;
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
     const handler = {
       set: function(target, key, newValue, receiver){
         const doubled =newValue*newValue 
         target[key] = doubled;
         return true;
       }
     }
     return new Proxy(obj, handler);
   }
   
   export { forEach, map, reduce, upperProps, createProxy };
