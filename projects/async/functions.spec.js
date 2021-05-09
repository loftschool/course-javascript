import { delayPromise, loadAndSortTowns } from './functions';

const hasOwnProperty = Object.prototype.hasOwnProperty;

describe('ДЗ 5.2 - Асинхронность и работа с сетью', () => {
  describe('delayPromise', () => {
    it('должна возвращать Promise', () => {
      const result = delayPromise(1);

      expect(result).toBeInstanceOf(Promise);
    });

    it('Promise должен быть resolved через указанное количество секунд', (done) => {
      const result = delayPromise(1);
      const startTime = new Date();

      result
        .then(() => {
          expect(new Date() - startTime).toBeGreaterThanOrEqual(1000);
          done();
        })
        .catch(done);
    });
  });

  describe('loadAndSortTowns', () => {
    it('должна возвращать Promise', () => {
      const result = loadAndSortTowns();

      expect(result).toBeInstanceOf(Promise);
    });

    it('Promise должен разрешаться массивом из городов', (done) => {
      const result = loadAndSortTowns();

      result
        .then((towns) => {
          expect(Array.isArray(towns));
          expect(towns.length).toBe(50);
          towns.forEach((town, i, towns) => {
            expect(hasOwnProperty.call(towns, 'name'));

            if (i) {
              expect(towns[i - 1].name.localeCompare(town.name)).toBeLessThanOrEqual(0);
            }
          });
          done();
        })
        .catch(done);
    });
  });
});
