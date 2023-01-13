/* ДЗ 1 - Функции */

/*
 Задание 1:

 1.1: Добавьте к функции параметр с любым именем
 1.2: Функция должна возвращать аргумент, переданный ей в качестве параметра

 Пример:
   returnFirstArgument(10) вернет 10
   returnFirstArgument('привет') вернет `привет`

 Другими словами: функция должна возвращать в неизменном виде то, что поступает ей на вход
 */
var value = 'привет';
returnFirstArgument(value);

function returnFirstArgument(value, randomArg) {
  console.log('Задание 1  : ' + value);
  return value;
}

/*
 Задание 2:

 2.1: Функция должна возвращать сумму переданных аргументов

 Пример:
   sumWithDefaults(10, 20) вернет 30
   sumWithDefaults(2, 4) вернет 6

 2.2 *: Значение по умолчанию для второго аргумента должно быть равно 100

 Пример:
   sumWithDefaults(10) вернет 110
 */
var a = 10, b = 20;
sumWithDefaults(a, b);

function sumWithDefaults(a, b) {
  let sumArg = a + b; // чтобы аргументы не становились string в console.log
  console.log('Задание 2.1: ' + sumArg);
  return sumArg;
}

var c = 10;
sumWithDefaults100(c);

function sumWithDefaults100(c, sto = 100) {
  let sumArg = c + sto; // чтобы аргументы не становились string в console.log
  console.log('Задание 2.2: ' + sumArg);
  return sumArg;
}

/*
 Задание 3:

 Функция должна принимать другую функцию и возвращать результат вызова этой функции

 Пример:
   returnFnResult(() => 'привет') вернет 'привет'
 */

var fn = () => 'привет'; 

returnFnResult(fn());

function returnFnResult(fn) {
  console.log('Задание 3  : ' + fn);
  return fn;
}


/*
 Задание 4:

 Функция должна принимать число (если ничего не передано, то воспринимать как 0) и возвращать новую функцию (F)
 При вызове функции F, переданное ранее число должно быть увеличено на единицу и возвращено из F

 Пример:
   var f = returnCounter();
   console.log(f()); // выведет 1
   console.log(f()); // выведет 2
   
   f = returnCounter(10);
   console.log(f()); // выведет 11
   console.log(f()); // выведет 12
   console.log(f()); // выведет 13
 */

var f = returnCounter();  

function returnCounter(number = 0) {
  let counter = number + 1;
  console.log('Задание 4  : ' + counter);
  return counter;
}

console.log(f());
console.log(f());

// console.log('Задание 4  : ' + f());
// console.log('Задание 4  : ' + f());

/*
 Задание 5 *:

 Функция должна возвращать все переданные ей аргументы в виде массива
 Количество переданных аргументов заранее неизвестно

 Пример:
   returnArgumentsArray(1, 2, 3) вернет [1, 2, 3]
 */

returnArgumentsArray(1, 2, 3);

function returnArgumentsArray(array = []) {
  console.log('Задание 5  : ' + array);
  return array;
}

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию

 Пример:
   function sum(a, b) {
     return a + b;
   }

   var newSum = bindFunction(sum, 2, 4);

   console.log(newSum()) выведет 6
 */
// function bindFunction(fn, ...args) {}

// export {
//   returnFirstArgument,
//   sumWithDefaults,
//   returnArgumentsArray,
//   returnFnResult,
//   returnCounter,
//   bindFunction,
// };
