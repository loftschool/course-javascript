import {
  returnArgumentsArray,
  returnCounter,
  returnFirstArgument,
  returnFnResult,
  sumWithDefaults,
} from './index';

describe('ДЗ 1 - функции', () => {
  describe('returnFirstArgument', () => {
    it('должна возвращать переданный аргумент', () => {
      expect(returnFirstArgument(123)).toBe(123);
      expect(returnFirstArgument('ls')).toBe('ls');
    });
  });

  describe('sumWithDefaults', () => {
    it('должна возвращать сумму переданных аргументов', () => {
      expect(sumWithDefaults(1, 2)).toBe(3);
      expect(sumWithDefaults(10, -2)).toBe(8);
    });

    it('значение по умолчанию второго аргумента должно быть 100', () => {
      expect(sumWithDefaults(10)).toBe(110);
      expect(sumWithDefaults(-2)).toBe(98);
    });
  });

  describe('returnFnResult', () => {
    it('должна возвращать результат вызова переданной функции', () => {
      function fn() {
        return value;
      }

      const value = Math.random();
      const result = returnFnResult(fn); // result = fn() -> value

      expect(result).toBe(value);
    });
  });

  describe('returnCounter', () => {
    it('должна возвращать функцию', () => {
      const result = returnCounter();

      expect(typeof result).toBe('function');
    });

    it('возвращаемая функция должна увеличивать переданное число на единицу при каждом вызове', () => {
      const value = parseInt(Math.random() * 10, 10);
      const result = returnCounter(value);

      expect(result()).toBe(value + 1);
      expect(result()).toBe(value + 2);
      expect(result()).toBe(value + 3);
    });

    it('значение аргумента должно быть 0 по умолчанию', () => {
      const result = returnCounter();

      expect(result()).toBe(1);
      expect(result()).toBe(2);
      expect(result()).toBe(3);
    });
  });

  describe('returnArgumentsArray', () => {
    it('должна возвращать переданные аргументы в виде массива', () => {
      expect(returnArgumentsArray(1, 2, 3)).toEqual([1, 2, 3]);
      expect(returnArgumentsArray('l', 's')).toEqual(['l', 's']);
    });

    it('должна возвращать пустой массив если нет аргументов', () => {
      expect(returnArgumentsArray()).toEqual([]);
    });
  });
});
