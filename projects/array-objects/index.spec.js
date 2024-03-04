import { forEach, map, reduce, upperProps } from './index';

describe('ДЗ 3 - объекты и массивы', () => {
  describe('forEach', () => {
    it('должна вызывать функцию для каждого элемента массива', () => {
      const array = [1, 2, 3];
      const fn = jest.fn();

      forEach(array, fn);

      for (let i = 0; i < array.length; i++) {
        expect(fn).nthCalledWith(i + 1, array[i], i, array);
      }
    });
  });

  describe('map', () => {
    it('должна вызывать функцию для каждого элемента массива и не изменять оригинальный массив', () => {
      const originalArray = [4, 5, 6];
      const array = [...originalArray];
      const modified = array.map((el) => el ** 2);
      const fn = jest.fn((el) => el ** 2);

      expect(map(array, fn)).toEqual(modified);
      expect(array).toEqual(originalArray);

      for (let i = 0; i < array.length; i++) {
        expect(fn).nthCalledWith(i + 1, array[i], i, array);
      }
    });
  });

  describe('reduce', () => {
    it('должна вызывать функцию для каждого элемента и передавать предыдущий результат первым аргументом', () => {
      const originalArray = [7, 8, 9];
      const array = [...originalArray];
      const modified = array.reduce((all, current) => all + current);
      const fn = jest.fn((all, current) => all + current);

      expect(reduce(array, fn)).toEqual(modified);
      expect(array).toEqual(originalArray);

      let sum = array[0];

      for (let i = 1; i < array.length; i++) {
        expect(fn).nthCalledWith(i, sum, array[i], i, array);
        sum += array[i];
      }
    });

    it('должна учитывать initial', () => {
      const originalArray = [1, 3, 5];
      const array = [...originalArray];
      const modified = array.reduce((all, current) => all + current, 10);
      const fn = jest.fn((all, current) => all + current);

      expect(reduce(array, fn, 10)).toEqual(modified);
      expect(array).toEqual(originalArray);

      let sum = 10;

      for (let i = 0; i < array.length; i++) {
        expect(fn).nthCalledWith(i + 1, sum, array[i], i, array);
        sum += array[i];
      }
    });
  });

  describe('upperProps', () => {
    it('должна возвращать массив с именами свойств и преобразовывать эти имена в верхний регистр', () => {
      const obj = { a: 1, b: 2 };
      const target = ['A', 'B'];
      const result = upperProps(obj);

      expect(result).toEqual(target);
    });
  });
});
