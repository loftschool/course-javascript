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
 const returnFirstArgument = param => param

 /*
  Задание 2:
 
  2.1: Функция должна возвращать сумму переданных аргументов
 
 const sumWithDefaults = (a, b) => a + b
 
  Пример:
    sumWithDefaults(10, 20) вернет 30
    sumWithDefaults(2, 4) вернет 6
 
  2.2 *: Значение по умолчанию для второго аргумента должно быть равно 100
 
  Пример:
    sumWithDefaults(10) вернет 110
  */
 const sumWithDefaults = (a, b = 100) => a + b
 
 /*
  Задание 3:
 
  Функция должна принимать другую функцию и возвращать результат вызова этой функции
 
  Пример:
    returnFnResult(() => 'привет') вернет 'привет'
  */
 const returnFnResult = fn => fn()
 
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
   const F = () => ++num
 
   return F
 }
 
 /*
  Задание 5 *:
 
  Функция должна возвращать все переданные ей аргументы в виде массива
  Количество переданных аргументов заранее неизвестно
 
  Пример:
    returnArgumentsArray(1, 2, 3) вернет [1, 2, 3]
  */
 const returnArgumentsArray = (...args) => args
 
 export {
   returnFirstArgument,
   sumWithDefaults,
   returnArgumentsArray,
   returnFnResult,
   returnCounter,
 };
 