function returnCounter(a) {
  return () => ++a;
}

//tests
const f = returnCounter(10);
console.log(f()); // выведет 11
console.log(f()); // выведет 12
console.log(f()); // выведет 13
