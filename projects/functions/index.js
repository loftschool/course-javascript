/* ДЗ 1 - Функции */

/*
 Задание 1:

 1.1: Добавьте к функции параметр с любым именем
 1.2: Функция должна возвращать аргумент, переданный в параметре

 Пример:
   returnFirstArgument(10) вернет 10
   returnFirstArgument('привет') вернет `привет`

 Другими словами: функция должна возвращать в неизменном виде то, что поступает ей на вход
 */
const returnFirstArgument = (foo) => {
  return foo;
};

console.group('Task 1');
console.log(returnFirstArgument(10));
console.log(returnFirstArgument('Привет'));
console.groupEnd();

/*
 Задание 2:

 2.1: Функция должна возвращать сумму переданных аргументов

 Пример:
   sumWithDefaults(10, 20) вернет 30
   sumWithDefaults(2, 4) вернет 6

 2.2 *: Значение по умолчанию для второго аргумента должно быть равно 100

 Пример:
   sumWithDefaults(10) вернет 110
 */
const sumWithDefaults = (a, b = 100) => {
  return a + b;
};

console.group('Task 2');
console.log(sumWithDefaults(10, 20));
console.log(sumWithDefaults(2, 4));
console.log(sumWithDefaults(2));
console.groupEnd();

/*
 Задание 3:

 Функция должна принимать другую функцию и возвращать результат вызова этой функции

 Пример:
   returnFnResult(() => 'привет') вернет 'привет'
 */
const returnFnResult = (fn) => {
  return fn();
};

console.group('Task 3');
console.log(returnFnResult(() => 'привет'));
console.log(returnFnResult(() => 2 * 2));
console.groupEnd();

/*
 Задание 4:

 Функция должна принимать число и возвращать новую функцию (F)
 При вызове функции F, переданное ранее число должно быть увеличено на единицу и возвращено из F

 Пример:
   var f = returnCounter(10);

   console.log(f()); // выведет 11
   console.log(f()); // выведет 12
   console.log(f()); // выведет 13
 */
const returnCounter = (num = 0) => {
  let n = num;

  function inc() {
    n += 1;
    return n;
  }

  return inc;
};

const f = returnCounter(10);
const k = returnCounter();

console.group('Task 4');
console.log(f());
console.log(f());
console.log(f());
console.log(k());
console.log(k());
console.groupEnd();

/*
 Задание 5 *:

 Функция должна возвращать все переданные ей аргументы в виде массива
 Количество переданных аргументов заранее неизвестно

 Пример:
   returnArgumentsArray(1, 2, 3) вернет [1, 2, 3]
 */
const returnArgumentsArray = (...args) => {
  return args;
};

console.group('Task 5');
console.group(returnArgumentsArray(1, 2, 3));
console.groupEnd();

export {
  returnFirstArgument,
  sumWithDefaults,
  returnArgumentsArray,
  returnFnResult,
  returnCounter,
};
