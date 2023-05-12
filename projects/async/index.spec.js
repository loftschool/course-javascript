const hasOwnProperty = Object.prototype.hasOwnProperty;

describe('ДЗ 5.1 - Фильтр городов', () => {
  const filterPage = require('./index');
  const homeworkContainer = document.querySelector('#app');
  let loadingBlock;
  let filterBlock;
  let filterInput;
  let filterResult;

  beforeAll(() => filterPage.loadTowns());

  describe('Функциональное тестирование', () => {
    describe('isMatching', () => {
      it('должна определять присутствие подстроки в строке', () => {
        expect(filterPage.isMatching('Moscow', 'moscow'));
        expect(filterPage.isMatching('Moscow', 'mos'));
        expect(filterPage.isMatching('Moscow', 'MoS'));
        expect(filterPage.isMatching('Moscow', 'cow'));
        expect(!filterPage.isMatching('Moscow', 'Berlin'));
      });
    });
    describe('loadTowns', () => {
      it('должна возвращать Promise', () => {
        const result = filterPage.loadTowns();
        expect(result).toBeInstanceOf(Promise);
      });

      it('Promise должен разрешаться массивом из городов', (done) => {
        /* eslint-disable max-nested-callbacks */
        const result = filterPage.loadTowns();

        result
          .then((towns) => {
            expect(Array.isArray(towns));
            expect(towns.length).toBe(50);
            towns.forEach((town, i, towns) => {
              expect(hasOwnProperty.call(town, 'name'));

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

  describe('Интеграционное тестирование', () => {
    it('на старнице должны быть элементы с нужными id', () => {
      loadingBlock = homeworkContainer.querySelector('#loading-block');
      filterBlock = homeworkContainer.querySelector('#filter-block');
      filterInput = homeworkContainer.querySelector('#filter-input');
      filterResult = homeworkContainer.querySelector('#filter-result');

      expect(loadingBlock).toBeInstanceOf(Element);
      expect(filterBlock).toBeInstanceOf(Element);
      expect(filterInput).toBeInstanceOf(Element);
      expect(filterResult).toBeInstanceOf(Element);
    });

    it('должен показываться список городов, соответствующих фильтру', (done) => {
      filterInput.value = 'fr';
      filterInput.dispatchEvent(new KeyboardEvent('input'));
      setTimeout(() => {
        expect(filterResult.children.length).toBe(3);
        done();
      }, 1000);
    });

    it('результат должен быть пуст, если в поле пусто', (done) => {
      filterInput.value = '';
      filterInput.dispatchEvent(new KeyboardEvent('input'));
      setTimeout(() => {
        expect(filterResult.children.length).toBe(0);
        done();
      }, 1000);
    });
  });
});
