/*Задание 1:

 1.1: Добавьте к функции параметр с любым именем
 1.2: Функция должна возвращать аргумент, переданный ей в качестве параметра*/

function returnFirstArgument(value) {
  return value;
}

console.log(returnFirstArgument(10));
console.log(returnFirstArgument('привет'));

/*Задание 2:

 2.1: Функция должна возвращать сумму переданных аргументов*/

function sumWithDefaults(a, b) {
  return a + b;
}

console.log(sumWithDefaults(10, 20));
console.log(sumWithDefaults(2, 4));

/*2.2 *: Значение по умолчанию для второго аргумента должно быть равно 100*/

function firstDefault100(a, b = 100) {
  return a + b;
}

console.log(firstDefault100(10));

function default100(a, b) {
  b = typeof b !== 'undefined' ? b : 100;
  return a + b;
}

console.log(default100(10));

/*Задание 3:

 Функция должна принимать другую функцию и возвращать результат вызова этой функции
*/

//FAILED

function fn2() {
  return fn1;
}

fn1('привет');

function fn1(value) {
  return value;
}

fn2()();
