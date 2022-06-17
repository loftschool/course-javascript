/* ДЗ 1 - Функции */
/* Дмитрий Иванов, поток №539 */

/*
 Задание 1:

 1.1: Добавьте к функции параметр с любым именем
 1.2: Функция должна возвращать аргумент, переданный ей в качестве параметра

 Пример:
   returnFirstArgument(10) вернет 10
   returnFirstArgument('привет') вернет `привет`

 Другими словами: функция должна возвращать в неизменном виде то, что поступает ей на вход
 */
 var clearParam = param => param;
 console.log(clearParam(1));

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

// 2.1
 let argSum = (a, b) => a + b;
 console.log(argSum(2, 3))

// 2.2*
 let argSumHundred = (a, b = 100) => a + b;
console.log(argSumHundred(2))


/*
 Задание 3:

 Функция должна принимать другую функцию и возвращать результат вызова этой функции

 Пример:
   returnFnResult(() => 'привет') вернет 'привет'
 */

 var fn = (fn1 = () => 'Hello') => fn1();
 console.log(fn());

/*
 Задание 4:

 Функция должна принимать число (если ничего не передано, то воспринимать как 0) и возвращать новую функцию (F)
 При вызове функции F, переданное ранее число должно быть увеличено на единицу и возвращено из F

 Пример:
   var f = returnCounter();
   console.log(f()); // выведет 1
   console.log(f()); // выведет 2

   f = returnCounter(10);
   console.log(f()); // выведет 11
   console.log(f()); // выведет 12
   console.log(f()); // выведет 13
 */

 var number = 0;
 var incrNumber = number => F = number => ++number;
 incrNumber();
 console.log(F());
 console.log(F());
 console.log(F());
 //однако почему-то результат выполнения в console.log NaN :(

/*
 Задание 5 *:

 Функция должна возвращать все переданные ей аргументы в виде массива
 Количество переданных аргументов заранее неизвестно

 Пример:
   returnArgumentsArray(1, 2, 3) вернет [1, 2, 3]
 */

 function createArray() {
  var result = [];
    for (var i = 0; i < arguments.length; i++) {
      result[i] = arguments[i];
   }
   return result;
 }
 console.log(createArray(1, 2, 3))

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию

 Пример:
   function sum(a, b) {
     return a + b;
   }

   var newSum = bindFunction(sum, 2, 4);

   console.log(newSum()) выведет 6
 */

 // var sum = (a, b) => a + b;
 // var newSum = bindSum(sum, ...theArgs);
