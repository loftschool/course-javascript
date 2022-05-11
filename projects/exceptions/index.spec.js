import {
  randomNumberArray,
  randomStringArray,
  randomValue as random,
} from '../../scripts/helper';
import { calculator, isAllTrue, isSomeTrue, returnBadArguments } from './index';

describe('ДЗ 3 - работа с исключениями и отладчиком', () => {
  describe('isAllTrue', () => {
    it('должна вызывать fn для всех элементов массива', () => {
      const array = random('array', 1);
      const pass = [];

      isAllTrue(array, (e) => pass.push(e));

      expect(pass).toEqual(array);
    });

    it('должна вернуть true, если fn вернула true для всех элементов массива', () => {
      const array = randomNumberArray();
      const result = isAllTrue(array, Number.isFinite);

      expect(result).toBe(true);
    });

    it('должна вернуть false, если fn вернула false хотя бы для одного элемента массива', () => {
      const array = randomNumberArray();

      array.push(random('string'));
      const result = isAllTrue(array, Number.isFinite);

      expect(result).toBe(false);
    });

    it('должна выбросить исключение, если передан пустой массив', () => {
      expect(() => isAllTrue([], () => {})).toThrow('empty array');
    });

    it('должна выбросить исключение, если передан не массив', () => {
      expect(() => isAllTrue(':(', () => {})).toThrow('empty array');
      expect(() => isAllTrue({}, () => {})).toThrow('empty array');
    });

    it('должна выбросить исключение, если fn не функция', () => {
      const array = randomNumberArray();

      expect(() => isAllTrue(array, ':(')).toThrow('fn is not a function');
    });
  });

  describe('isSomeTrue', () => {
    it('должна вернуть true, если fn вернула true хотя бы для одного элемента массива', () => {
      const array = randomStringArray().concat(random('number'));
      const result = isSomeTrue(array, Number.isFinite);

      expect(result).toBe(true);
    });

    it('должна вернуть false, если fn не вернула true хотя бы для одного элемента массива', () => {
      const array = randomStringArray();
      const result = isSomeTrue(array, Number.isFinite);

      expect(result).toBe(false);
    });

    it('должна выбросить исключение, если передан пустой массив', () => {
      expect(() => isSomeTrue([], () => {})).toThrow('empty array');
    });

    it('должна выбросить исключение, если передан не массив', () => {
      expect(() => isSomeTrue(':(', () => {})).toThrow('empty array');
      expect(() => isSomeTrue({}, () => {})).toThrow('empty array');
    });

    it('должна выбросить исключение, если fn не функция', () => {
      const array = randomNumberArray();

      expect(() => isSomeTrue(array, ':(')).toThrow('fn is not a function');
    });
  });

  describe('returnBadArguments', () => {
    it('должна вызывать fn для всех элементов массива', () => {
      const array = random('array', 1);
      const pass = [];

      returnBadArguments((e) => pass.push(e), ...array);

      expect(pass).toEqual(array);
    });

    it('должна вернуть массив с аргументами, для которых fn выбрасила исключение', () => {
      const evenNumbers = randomNumberArray('even');
      const oddNumbers = randomNumberArray('odd');
      const fn = (a) => {
        if (a % 2 !== 0) {
          throw new Error('not even');
        }
      };
      const result = returnBadArguments(fn, ...evenNumbers, ...oddNumbers);

      expect(result).toEqual(oddNumbers);
    });

    it('должна вернуть массив пустой массив, если не передано дополнительных аргументов', () => {
      const fn = () => ':)';
      const result = returnBadArguments(fn);

      expect(result.length).toBe(0);
    });

    it('должна выбросить исключение, если fn не функция', () => {
      expect(() => returnBadArguments(':(')).toThrow('fn is not a function');
    });
  });

  describe('calculator', () => {
    it('должна возвращать объект с методами', () => {
      const calc = calculator();

      expect(Object.keys(calc)).toEqual(['sum', 'dif', 'div', 'mul']);
    });

    it('метод sum должен складывать аргументы', () => {
      const initialValue = random('number');
      const calc = calculator(initialValue);
      const args = randomNumberArray();

      expect(calc.sum(...args)).toBe(
        args.reduce((prev, current) => prev + current, initialValue)
      );
    });

    it('метод dif должен вычитать аргументы', () => {
      const initialValue = random('number');
      const calc = calculator(initialValue);
      const args = randomNumberArray();

      expect(calc.dif(...args)).toBe(
        args.reduce((prev, current) => prev - current, initialValue)
      );
    });

    it('метод div должен делить аргументы', () => {
      const initialValue = random('number');
      const calc = calculator(initialValue);
      const args = randomNumberArray();

      expect(calc.div(...args)).toBe(
        args.reduce((prev, current) => prev / current, initialValue)
      );
    });

    it('метод div должен выбрасывать исключение, если хотя бы один из аргументов равен 0', () => {
      const initialValue = random('number');
      const calc = calculator(initialValue);
      const args = [...randomNumberArray(), 0];

      expect(() => calc.div(...args)).toThrow('division by 0');
    });

    it('метод mul должен умножать аргументы', () => {
      const initialValue = random('number');
      const calc = calculator(initialValue);
      const args = randomNumberArray();

      expect(calc.mul(...args)).toBe(
        args.reduce((prev, current) => prev * current, initialValue)
      );
    });

    it('функция должна выбрасывать исключение, если number не является числом', () => {
      expect(() => calculator(':(')).toThrow('number is not a number');
    });

    it('значение по умолчанию для аргумента number должно быть равно 0', () => {
      const calc = calculator();
      const args = randomNumberArray();

      expect(calc.sum(...args)).toBe(args.reduce((prev, current) => prev + current));
    });
  });
});
