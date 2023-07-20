// Задание 1

function returnFirstArgument(first) {
    return first;
}

// Задание 2

function sumWithDefaults(a,b=100) {
    return a+b;
}

// Задание 3

function returnFnResult(fn) {
    return fn();
}

// Задание 4
var f = returnCounter();
function returnCounter(i = 10) {
    return () => ++i;
}

// Задание 5

function returnArgumentsArray(...args) {
    return args;
}
