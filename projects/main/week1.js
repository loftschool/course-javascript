//1.1
function returnFirstArgument(value) {
  return value;
}


//1.2

function sumWithDefaults(a, b) {
  let result = a + b;
  return result;
}



//1.2.1

function sumWithDefaults2(a, b = 100) {
  let resultArgument = a + b;
  return resultArgument;
}




//1.3


function returnFnResult (fn) {
 return fn();
}



//1.4

function  returnCounter (number) {
  return () => ++number;
}

var f = returnCounter(10);
console.log(f());


//1.5 

function returnArgumentsArray () {
  return [...arguments];
}

returnArgumentsArray(1, 2, 3);



//1.6 

function bindFunction(fn, ...args) {
  return () => fn(...args);
}