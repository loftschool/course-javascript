function returnArgumentsArray() {
  return [...arguments];
}

// tests
console.log(returnArgumentsArray(1, 2, 3)); // вернет [1, 2, 3]
