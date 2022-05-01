// Задание 1.1:

// Добавьте к функции параметр с любым именем
// Функция должна возвращать аргумент, переданный ей в качестве параметра

function returnFirstArgument(a) {
    let result = a;
    return result;
};
let resultFirstArgument = returnFirstArgument(232);
console.log(resultFirstArgument);

//////////////////

// Задание 1.2:

// Функция должна возвращать сумму переданных аргументов

function sumWithDefaults(a, b){
    b = 100;
    let result = a + b;
    return result;
}

let resultSumWithDefaults = sumWithDefaults(14);
console.log(resultSumWithDefaults);

//////////////

// Задание 1.3:

// Функция должна принимать другую функцию и возвращать результат вызова этой функции

function returnFnResult(){
    result = returnSecondResult();
    return result;

    function returnSecondResult(){
        let result = 'Hello';
        return result;
    }
}

trhirdFn = returnFnResult();
console.log(trhirdFn);

/////////////

// Задание 1.4:

// Функция должна принимать число и возвращать новую функцию (F)
// При вызове функции F, переданное ранее число должно быть увеличено на единицу и возвращено из F Пример:

function returnCounter(number) {
    
    return function F(){
        
        return ++number;
    }
}

const f = returnCounter(10);

console.log(f());
console.log(f());
console.log(f());

////////////////////////////

// Задание 1.5:*

// Функция должна возвращать все переданные ей аргументы в виде массива
// Количество переданных аргументов заранее неизвестно Пример:

function ArgumentsToArray() {
    let Array = [];
    for (let i = 0; i < arguments.length; i++) {
        Array.push(arguments[i]);
    }
    return Array;
}

const newArray = ArgumentsToArray(10, 20, 32, -12, 'ads');

console.log(newArray);

///////////////////

// Задание 1.6:*

// Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
// Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию Пример:

function bindFunction(sum, a, b) {
    return sum.bind(null, a, b);
}

function sum(a, b) {
    return a + b;
}

var newSum = bindFunction(sum, 1000, 7);

console.log(newSum());