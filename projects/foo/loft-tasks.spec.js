/*1.1 Функция возвращает аргумент, переданный ей в качестве параметра*/

function returnFirstArgument(value) {
  return value;
}

console.log(returnFirstArgument(10));
console.log(returnFirstArgument('привет'));

/*1.2 Функция возвращает сумму переданных аргументов*/

function sumWithDefaults(a, b) {
  return a + b;
}

console.log(sumWithDefaults(10, 20));
console.log(sumWithDefaults(2, 4));

/*1.2.1 Значение по умолчанию для второго аргумента равно 100*/

function firstDefault100(a, b = 100) {
  return a + b;
}

console.log(firstDefault100(10));

/*или*/

function default100(a, b) {
  b = typeof b !== 'undefined' ? b : 100;
  return a + b;
}

console.log(default100(10));

/*1.3 Функция принимает другую функцию и возвращает результат вызова этой функции*/

function fn2() {
  return fn1();
}

function fn1(value) {
  value = 'привет';
  return value;
}

fn2(fn1());

/*1.4 Функция принимает число и возвращает новую функцию (F). 
При вызове функции F, переданное ранее число увеличивается на единицу и возвращается из F*/

function returnCounter(number) {
  return function f() {
    return number++;
  };
}

const f = returnCounter(10);
console.log(f());
console.log(f());
console.log(f());

/*1.5 Функция возвращает все переданные ей аргументы в виде массива.
Количество переданных аргументов заранее неизвестно*/

function returnArgumentsArray() {
  return [...arguments];
}

returnArgumentsArray(1, 2, 3, 4, 5);

/*1.6 Функция возвращает все переданные ей аргументы в виде массива.
Количество переданных аргументов заранее неизвестно*/
