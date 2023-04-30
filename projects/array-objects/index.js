/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами.
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el)); // выведет каждый элемент массива
 */
   function forEach(arr,el) {
    for (let i = 0; i < arr.length; i++) {
      el(arr[i],i,arr)
    }
 }
 forEach([1, 2, 3],el=(item,index,array)=>{console.log(item,index,array)});

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами.
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   const newArray = map([1, 2, 3], (el) => el ** 2);
   console.log(newArray); // выведет [1, 4, 9]
 */
   function map (arr,callback) {
    let newArray = []
    for(let i = 0; i < arr.length ; i++){
      newArray[i] = callback(arr[i],i,arr)
    }
    return newArray
  }
  const newArray = map([10,20,30],function callback (item,index,array){return item ** 2 })

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами.
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   const sum = reduce([1, 2, 3], (all, current) => all + current);
   console.log(sum); // выведет 6
 */
   function reduce(arr,callback,initialValue) {
    let result = 0
    let i = 0
    if ( arguments.length > 2){
      result = initialValue
    }else{result = arr[0],i=1}

    for (; i < arr.length ; i++){
      result = callback(result,arr[i],i,arr)
  }
    return result
  }
  
  let result = reduce ([1,2,3], function callback (accumulator,currentValue,index,array){return accumulator + currentValue})

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   const keys = upperProps({ name: 'Сергей', lastName: 'Петров' });
   console.log(keys) // выведет ['NAME', 'LASTNAME']
 */
   function upperProps(obj) {
    let result = []
    for (let key in obj) {
       let upper =  key.toUpperCase()
       result.push(upper)
    }
    return result
  }
  const keys = upperProps ({name:'Сергей', lastName:'Петров'})

export { forEach, map, reduce, upperProps };
