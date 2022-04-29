//Задание 1.1:

function returnFirstArgument(a) {

    return a
}

console.log(returnFirstArgument(10));

//Задание 1.2:

var sumWithDefaults = (a, b) => a + b;

console.log(sumWithDefaults(10, 20));

//Задание 1.2.1:

var sumWithDefaults = (a, b) => {
    b = 100;

    return a + b;
} 

console.log(sumWithDefaults(10));

//Задание 1.3:

function returnFnResult(a) {
    function scndFun(a) {
        return a;
    }
    return scndFun(a);
}

console.log(returnFnResult('привет'));

//Задание 1.4:

function returnCounter(a) {
    return function f() {
        return ++a
    }
}

var f = returnCounter(10);
console.log(f());
console.log(f());
console.log(f());


//Задание 1.5:

function returnArgumentsArray() {
    resultArray = [];
    for (i = 0; i < arguments.length; i++) {
        resultArray[i] = arguments[i];
    }
    return resultArray;
}

console.log(returnArgumentsArray(1, 2, 3, 4, 5))

//Задание 1.6:


function sum(...arguments) {
    let sum = 0;
    for (value of arguments) {
        sum += value;
    }
    return sum;
}

var newSum = sum.bind(sum, 2, 4);
console.log(newSum());