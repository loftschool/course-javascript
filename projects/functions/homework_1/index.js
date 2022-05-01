// Задание 1.1:

// Добавьте к функции параметр с любым именем
// Функция должна возвращать аргумент, переданный ей в качестве параметра

export function returnFirstArgument(a) {
  const result = a;
  return result;
}
const resultFirstArgument = returnFirstArgument(232);
console.log(resultFirstArgument);

//////////////////

// Задание 1.2:

// Функция должна возвращать сумму переданных аргументов

// 1.2.1:* Значение по умолчанию для второго аргумента должно быть равно 100

export function sumWithDefaults(a, b = 100) {
  const result = a + b;
  return result;
}

const resultSumWithDefaults = sumWithDefaults(14);
console.log(resultSumWithDefaults);

//////////////

// Задание 1.3:

// Функция должна принимать другую функцию и возвращать результат вызова этой функции

export function returnFnResult(fn) {
  const callFn = fn();
  return callFn;
}

const A = function returnSecondResult() {
  const result = 'Hello';
  return result;
};

const trhirdFn = returnFnResult(A);
console.log(trhirdFn);

/////////////

// Задание 1.4:

// Функция должна принимать число и возвращать новую функцию (F)
// При вызове функции F, переданное ранее число должно быть увеличено на единицу и возвращено из F Пример:

export function returnCounter(number = 0) {
  return function F() {
    return ++number;
  };
}

const f = returnCounter(10);

console.log(f());
console.log(f());
console.log(f());

////////////////////////////

// Задание 1.5:*

// Функция должна возвращать все переданные ей аргументы в виде массива
// Количество переданных аргументов заранее неизвестно Пример:

export function returnArgumentsArray() {
  const Array = [];
  for (let i = 0; i < arguments.length; i++) {
    Array.push(arguments[i]);
  }
  return Array;
}

const newArray = returnArgumentsArray(10, 20, 32, -12, 'ads');

console.log(newArray);

///////////////////

// Задание 1.6:*

// Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
// Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию Пример:

export function bindFunction(sum, ...array) {
  return sum.bind(null, ...array);
}

export function sum(a, b) {
  return a + b;
}

const newSum = bindFunction(sum, 1000, 7);

console.log(newSum());
