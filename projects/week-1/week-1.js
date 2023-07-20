// Задание 1

function returnFirstArgument() {
    return "привет";
}
console.log(returnFirstArgument());

// Задание 2.1

function sumWithDefaults(a,b) {
    return a+b;
}
console.log("Результат выполнения задания 2.1:", sumWithDefaults(10,2));

// Задание 2.2*

function sumWithDefaults(a,b=100) {
    return a+b;
}
console.log("Результат выполнения задания 2.2*:", sumWithDefaults(10));

// Задание 3

function returnFnResult(fn) {
    return fn();
}

// Задание 4
var f = returnCounter();
function returnCounter(i = 10) {
    return () => ++i;
    
}
console.log(f());

// Задание 5

function returnArgumentsArray(...args) {
    return args;
}
console.log(returnArgumentsArray(1,2,3));