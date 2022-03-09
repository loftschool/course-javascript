const returnFirstArgument = (value) => value;

console.log(returnFirstArgument(10));
console.log(returnFirstArgument('привет'));

const sumWithDefaults = (a, b = 100) => a + b;

console.log(sumWithDefaults(10, 20));
console.log(sumWithDefaults(10));

const returnFnResult = (fn) => fn();

console.log(returnFnResult(() => 'привет!'));

const returnCounter = function (initValue) {
  let value = initValue;
  return function () {
    value += 1;
    return value;
  };
};

const f = returnCounter(10);
console.log(f()); // выведет 11
console.log(f()); // выведет 12
console.log(f()); // выведет 13

const returnArgumentsArray = function (...args) {
  return [...args];
};

console.log(returnArgumentsArray(1, 2, 3));

const bindFunction = function (fn, ...args) {
  return function () {
    return fn(...args);
  };
};

function sum(a, b) {
  return a + b;
}

const newSum = bindFunction(sum, 2, 4);

console.log(newSum());
