/* ДЗ 1 - Функции */

/*
 Задание 1:
*/

 function returnFirstArgument(value) {
  return value;
}

/*
 Задание 2:
*/

function sumWithDefaults(a, b = 100) {
 return a + b;
}
/*
 Задание 3:
*/

function returnFnResult(fn) {
  return fn();
}

/*
 Задание 4:
*/

function returnCounter(number = 0) {
  return () => ++number;
}

/*
 Задание 5 *:
*/

function returnArgumentsArray() {
 return [...arguments];
}

/*
 Задание 6 *:
*/

function bindFunction(fn, ...args) {
  return fn.bind(null, ...args);
}

export {
  returnFirstArgument,
  sumWithDefaults,
  returnArgumentsArray,
  returnFnResult,
  returnCounter,
  bindFunction,
};
