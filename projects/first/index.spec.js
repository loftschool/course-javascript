function returnFirstArgument(a) {
  return a;
}

console.log(returnFirstArgument(94));

const sumWithDefaults = (a, b = 100) => {
  return a + b;
};

console.log(sumWithDefaults(12));

const returnFnResult = (fn) => {
  return fn();
};

console.log(returnFnResult(returnFirstArgument('Привет')));

/*var f = returnCounter(10);
const returnCounter = (numb) => {
 if (numb === undefined){
    numb = 0;
   }
 return f(a)  {
    numb++;
    if (a===undefined) {
       return numb;
      } else {
       return a++;
      }
    }
};*/
