
//1.1
function returnFirstArgument(arg) {
  return arg;
}

//1.2
function sumWithDefaults(a, b = 100) {
  return a + b;
}

//1.3
function returnFnResult(fn) {
  return fn();
}

//1.4
function returnCounter(num = 0) {
  return () => num = num + 1;
}

//1.5
function returnArgumentsArray(...args) {
  return args;
}

//1.6
function bindFunction(fn, ...args) {
  return () => fn(...args)
}