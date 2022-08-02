const sumWithDefaults = (a, b) => (b ? +a + +b : +a + 100);

// tests
console.log(sumWithDefaults(10, 20));
console.log(sumWithDefaults(20));
