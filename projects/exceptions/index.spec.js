import { calculator, isAllTrue, isSomeTrue, returnBadArguments } from './index';

describe('ДЗ 2 - работа с исключениями и отладчиком', () => {
  describe('isAllTrue', () => {
    it('должна вызывать fn для всех элементов массива', () => {
      const array = ['l', 's'];
      const pass = [];

      isAllTrue(array, (e) => pass.push(e));

      expect(pass).toEqual(array);
    });

    it('должна вернуть true, если fn вернула true для всех элементов массива', () => {
      const array = [1, 2, 3];
      const result = isAllTrue(array, Number.isFinite);

      expect(result);
    });

    it('должна вернуть false, если fn вернула false хотя бы для одного элемента массива', () => {
      const array = [1, 2, 3];

      array.push('ls');
      const result = isAllTrue(array, Number.isFinite);

      expect(!result);
    });

    it('должна выбросить исключение, если передан пустой массив', () => {
      expect(() => isAllTrue([], () => {})).toThrow('empty array');
    });

    it('должна выбросить исключение, если передан не массив', () => {
      expect(() => isAllTrue(':(', () => {})).toThrow('empty array');
      expect(() => isAllTrue({}, () => {})).toThrow('empty array');
    });

    it('должна выбросить исключение, если fn не функция', () => {
      const array = [1, 2, 3];

      expect(() => isAllTrue(array, ':(')).toThrow('fn is not a function');
    });
  });

  describe('isSomeTrue', () => {
    it('должна вернуть true, если fn вернула true хотя бы для одного элемента массива', () => {
      const array = ['l', 's', 3];
      const result = isSomeTrue(array, Number.isFinite);

      expect(result);
    });

    it('должна вернуть false, если fn не вернула true хотя бы для одного элемента массива', () => {
      const array = ['l', 's'];
      const result = isSomeTrue(array, Number.isFinite);

      expect(!result);
    });

    it('должна выбросить исключение, если передан пустой массив', () => {
      expect(() => isSomeTrue([], () => {})).toThrow('empty array');
    });

    it('должна выбросить исключение, если передан не массив', () => {
      expect(() => isSomeTrue(':(', () => {})).toThrow('empty array');
      expect(() => isSomeTrue({}, () => {})).toThrow('empty array');
    });

    it('должна выбросить исключение, если fn не функция', () => {
      const array = [1, 2, 3];

      expect(() => isSomeTrue(array, ':(')).toThrow('fn is not a function');
    });
  });

  describe('returnBadArguments', () => {
    it('должна вызывать fn для всех элементов массива', () => {
      const array = [1, 2, 3];
      const pass = [];

      returnBadArguments((e) => pass.push(e), ...array);

      expect(pass).toEqual(array);
    });

    it('должна вернуть массив с аргументами, для которых fn выбрасила исключение', () => {
      const evenNumbers = [2, 4, 6];
      const oddNumbers = [1, 3, 5];
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
      const initialValue = 20;
      const calc = calculator(initialValue);
      const args = [1, 2, 3];

      expect(calc.sum(...args)).toBe(
        args.reduce((prev, current) => prev + current, initialValue)
      );
    });

    it('метод dif должен вычитать аргументы', () => {
      const initialValue = 10;
      const calc = calculator(initialValue);
      const args = [1, 2, 3];

      expect(calc.dif(...args)).toBe(
        args.reduce((prev, current) => prev - current, initialValue)
      );
    });

    it('метод div должен делить аргументы', () => {
      const initialValue = 20;
      const calc = calculator(initialValue);
      const args = [1, 2];

      expect(calc.div(...args)).toBe(
        args.reduce((prev, current) => prev / current, initialValue)
      );
    });

    it('метод div должен выбрасывать исключение, если хотя бы один из аргументов равен 0', () => {
      const initialValue = 20;
      const calc = calculator(initialValue);
      const args = [1, 2, 0];

      expect(() => calc.div(...args)).toThrow('division by 0');
    });

    it('метод mul должен умножать аргументы', () => {
      const initialValue = 10;
      const calc = calculator(initialValue);
      const args = [1, 2];

      expect(calc.mul(...args)).toBe(
        args.reduce((prev, current) => prev * current, initialValue)
      );
    });

    it('функция должна выбрасывать исключение, если number не является числом', () => {
      expect(() => calculator(':(')).toThrow('number is not a number');
    });

    it('значение по умолчанию для аргумента number должно быть равно 0', () => {
      const calc = calculator();
      const args = [1, 2];

      expect(calc.sum(...args)).toBe(args.reduce((prev, current) => prev + current));
    });
  });
});