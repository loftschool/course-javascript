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
function returnFirstArgument(a) {
  const result = a;
  return result;
}
const resultFirstArgument = returnFirstArgument(232);
console.log(resultFirstArgument);

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
function sumWithDefaults(a, b = 100) {
  const result = a + b;
  return result;
}
const resultSumWithDefaults = sumWithDefaults(14);
console.log(resultSumWithDefaults);

/*
 Задание 3:

 Функция должна принимать другую функцию и возвращать результат вызова этой функции

 Пример:
   returnFnResult(() => 'привет') вернет 'привет'
 */
function returnFnResult(fn) {
  const callFn = fn();
  return callFn;
}

const A = function returnSecondResult() {
  const result = 'Hello';
  return result;
};

const trhirdFn = returnFnResult(A);
console.log(trhirdFn);
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
function returnCounter(number = 0) {
  return function fn() {
    return ++number;
  };
}
const f = returnCounter(10);

console.log(f());
console.log(f());
console.log(f());

/*
 Задание 5 *:

 Функция должна возвращать все переданные ей аргументы в виде массива
 Количество переданных аргументов заранее неизвестно

 Пример:
   returnArgumentsArray(1, 2, 3) вернет [1, 2, 3]
 */
function returnArgumentsArray() {
  const arr = [];
  for (let i = 0; i < arguments.length; i++) {
    arr.push(arguments[i]);
  }
  return arr;
}
const newArray = returnArgumentsArray(10, 20, 32, -12, 'ads');

console.log(newArray);

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
function bindFunction(sum, ...args) {
  return sum.bind(null, ...args);
}

function sum(a, b) {
  return a + b;
}

const newSum = bindFunction(sum, 1000, 7);

console.log(newSum());

export {
  returnFirstArgument,
  sumWithDefaults,
  returnArgumentsArray,
  returnFnResult,
  returnCounter,
  bindFunction,
};
