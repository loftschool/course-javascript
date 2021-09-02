function returnFirstArgument(value) {
  return value;
}

function sumWithDefaults(valueA, valueB = 100) {
  return valueA + valueB;
}

function returnFnResult(fn) {
  return fn();
}

function returnCounter(number = 0) {
  return () => ++number;
}

function returnArgumentsArray() {
  return [...arguments];
}

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
