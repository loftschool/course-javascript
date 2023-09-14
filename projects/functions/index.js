/* ДЗ 1 - Функции */

// Задание 1
function returnFirstArgument(arg) {
    return arg;
}

// Задание 2.1

function sumWithDefaults(a, b) {
  return a + b;
}

// Задание 2.2
function sumWithDefaults2(a , b = 100) {
  return a + b;
}

// Задание 3

function fn() {
  return Math.random();
}
function returnFnResult(fn) {
  return fn();
};

 // Задание 4
 function returnCounter(initialNumber = 0) {
  return function () {
    return ++initialNumber;
  }
}

const f = returnCounter(10);

// Задание 5 

function returnArgumentsArray(a, b, c) {
  let argArr = [];
  argArr.push(a);
  argArr.push(b);
  argArr.push(c);
  return argArr;
}

export {
  returnFirstArgument,
  sumWithDefaults,
  sumWithDefaults2,
  returnArgumentsArray,
  returnFnResult,
  returnCounter,
};
