function bindFunction(a, ...theArgs) {
  return function () {
    return a(...theArgs);
  };
}

//tests
function sum(a, b) {
  return a + b;
}

const newSum = bindFunction(sum, 2, 4);

console.log(newSum()); // выведет 6
