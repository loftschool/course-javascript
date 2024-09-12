import { randomStringArray, randomValue as random } from '../../scripts/helper';
import {
  bindFunction,
  returnArgumentsArray,
  returnCounter,
  returnFirstArgument,
  returnFnResult,
  sumWithDefaults,
} from './index';

describe('ДЗ 1 - функции', () => {
  describe('returnFirstArgument', () => {
    it('должна возвращать переданный аргумент', () => {
      const value = random();
      const result = returnFirstArgument(value);

      expect(result).toBe(value);
    });
  });

  describe('sumWithDefaults', () => {
    it('должна возвращать сумму переданных аргументов', () => {
      const valueA = random('number');
      const valueB = random('number');
      const result = sumWithDefaults(valueA, valueB);

      expect(result).toBe(valueA + valueB);
    });

    it('значение по умолчанию второго аргумента должно быть 100', () => {
      const value = random('number');
      const result = sumWithDefaults(value);

      expect(result).toBe(value + 100);
    });
  });

  describe('returnFnResult', () => {
    it('должна возвращать результат вызова переданной функции', () => {
      function fn() {
        return value;
      }

      const value = random();
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
      const value = random('number');
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
      const value = random('array', 1);
      const result = returnArgumentsArray(...value);

      expect(result).toEqual(value);
    });

    it('должна возвращать пустой массив если нет аргументов', () => {
      const result = returnArgumentsArray();

      expect(result.length).toBe(0);
    });
  });

  describe('bindFunction', () => {
    const valuesArr = randomStringArray();

    function fn(...valuesArr) {
      return [...arguments].join('');
    }

    it('должна возвращать функцию', () => {
      const result = bindFunction(fn);

      expect(typeof result).toBe('function');
    });

    it('должна привязывать любое кол-во аргументов возвращаемой функции', () => {
      const result = bindFunction(fn, ...valuesArr);

      expect(result()).toBe(valuesArr.join(''));
    });
  });
});
