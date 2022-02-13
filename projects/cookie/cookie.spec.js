const hasOwnProperty = Object.prototype.hasOwnProperty;

function getCookies() {
  return document.cookie
    .split('; ')
    .filter(Boolean)
    .map((cookie) => cookie.match(/^([^=]+)=(.+)/))
    .reduce((obj, [, name, value]) => {
      obj[name] = value;

      return obj;
    }, {});
}

describe('ДЗ 7.2 - Cookie editor', () => {
  require('./index');

  const app = document.querySelector('#app');
  let filterNameInput;
  let addNameInput;
  let addValueInput;
  let addButton;
  let listTable;

  describe('Интеграционное тестирование', () => {
    beforeEach(() => {
      const oldCookies = getCookies();

      Object.keys(oldCookies).forEach(
        (cookie) => (document.cookie = `${cookie}=;expires=${new Date(0)}`)
      );

      if (listTable) {
        listTable.innerHTML = '';
      }
    });

    it('на старнице должны быть элементы с нужными id', () => {
      filterNameInput = app.querySelector('#filter-name-input');
      addNameInput = app.querySelector('#add-name-input');
      addValueInput = app.querySelector('#add-value-input');
      addButton = app.querySelector('#add-button');
      listTable = app.querySelector('#list-table tbody');

      expect(filterNameInput).toBeInstanceOf(Element);
      expect(addNameInput).toBeInstanceOf(Element);
      expect(addValueInput).toBeInstanceOf(Element);
      expect(addButton).toBeInstanceOf(Element);
      expect(listTable).toBeInstanceOf(Element);
    });

    it('cookie должны добавляться при нажатии на "добавить"', () => {
      let cookies;

      addNameInput.value = 'test-cookie-name-1';
      addValueInput.value = 'test-cookie-value-1';
      addButton.click();

      cookies = getCookies();
      expect(hasOwnProperty.call(cookies, addNameInput.value));
      expect(cookies[addNameInput.value]).toBe(addValueInput.value);
      expect(listTable.children.length).toBe(1);

      addNameInput.value = 'test-cookie-name-2';
      addValueInput.value = 'test-cookie-value-2';
      addButton.click();

      cookies = getCookies();
      expect(hasOwnProperty.call(cookies, addNameInput.value));
      expect(cookies[addNameInput.value]).toBe(addValueInput.value);
      expect(listTable.children.length).toBe(2);
    });

    it('если при добавлении указано имя существующей cookie, то в таблице не должно быть дублей', () => {
      addNameInput.value = 'test-cookie-name-1';
      addValueInput.value = 'test-cookie-value-1';
      addButton.click();

      addNameInput.value = 'test-cookie-name-2';
      addValueInput.value = 'test-cookie-value-2';
      addButton.click();

      addNameInput.value = 'test-cookie-name-2';
      addValueInput.value = 'test-cookie-value-2';
      addButton.click();

      const cookies = getCookies();
      expect(hasOwnProperty.call(cookies, addNameInput.value));
      expect(cookies[addNameInput.value]).toBe(addValueInput.value);
      expect(listTable.children.length).toBe(2);
    });

    it('если при добавлении указано имя существующей cookie, то в таблице должно быть изменено ее значение', () => {
      addNameInput.value = 'test-cookie-name-1';
      addValueInput.value = 'test-cookie-value-1';
      addButton.click();

      addNameInput.value = 'test-cookie-name-2';
      addValueInput.value = 'test-cookie-value-2';
      addButton.click();

      addNameInput.value = 'test-cookie-name-2';
      addValueInput.value = 'other-test-cookie-value-2';
      addButton.click();

      const rows = [...listTable.children];
      const changedRow = rows.filter(
        (row) => row.children[1].textContent.trim() === 'other-test-cookie-value-2'
      );
      expect(changedRow.length).toBe(1);
    });

    it('cookie должны удаляться при нажатии на "удалить"', () => {
      let cookies;
      let deleteButton;

      addNameInput.value = 'test-cookie-name-1';
      addValueInput.value = 'test-cookie-value-1';
      addButton.click();

      addNameInput.value = 'test-cookie-name-2';
      addValueInput.value = 'test-cookie-value-2';
      addButton.click();

      deleteButton = listTable.querySelector('button');

      deleteButton.click();
      cookies = getCookies();
      expect(Object.keys(cookies).length).toBe(1);
      expect(listTable.children.length).toBe(1);

      deleteButton = listTable.querySelector('button');
      deleteButton.click();
      cookies = getCookies();
      expect(Object.keys(cookies).length).toBe(0);
      expect(listTable.children.length).toBe(0);
    });

    describe('Фильтрация', () => {
      it('выводить список cookie, имя или значение которых соответствует фильтру', () => {
        addNameInput.value = 'test-cookie-name-1';
        addValueInput.value = 'test-cookie-value-1';
        addButton.click();

        addNameInput.value = 'test-cookie-name-2';
        addValueInput.value = 'test-cookie-value-2';
        addButton.click();

        filterNameInput.value = 'test-cookie';
        filterNameInput.dispatchEvent(new KeyboardEvent('input'));
        expect(listTable.children.length).toBe(2);

        filterNameInput.value = 'name-1';
        filterNameInput.dispatchEvent(new KeyboardEvent('input'));
        expect(listTable.children.length).toBe(1);

        filterNameInput.value = 'name-2';
        filterNameInput.dispatchEvent(new KeyboardEvent('input'));
        expect(listTable.children.length).toBe(1);
      });

      it('добавлять cookie в таблицу, только если значение cookie соответствует фильтру', () => {
        addNameInput.value = 'test-cookie-name-1';
        addValueInput.value = 'test-cookie-value-1';
        addButton.click();

        addNameInput.value = 'test-cookie-name-2';
        addValueInput.value = 'test-cookie-value-2';
        addButton.click();

        filterNameInput.value = 'value-2';
        filterNameInput.dispatchEvent(new KeyboardEvent('input'));
        expect(listTable.children.length).toBe(1);

        addNameInput.value = 'test-cookie-name-3';
        addValueInput.value = 'test-cookie-more-value-2';
        addButton.click();

        const cookies = getCookies();
        expect(hasOwnProperty.call(cookies, addNameInput.value));
        expect(cookies[addNameInput.value]).toBe(addValueInput.value);
        expect(listTable.children.length).toBe(2);
      });

      it('не добавлять cookie в таблицу, если значение cookie не соответствует фильтру', () => {
        addNameInput.value = 'test-cookie-name-1';
        addValueInput.value = 'test-cookie-value-1';
        addButton.click();

        addNameInput.value = 'test-cookie-name-2';
        addValueInput.value = 'test-cookie-value-2';
        addButton.click();

        filterNameInput.value = 'value-2';
        filterNameInput.dispatchEvent(new KeyboardEvent('input'));
        expect(listTable.children.length).toBe(1);

        addNameInput.value = 'test-cookie-name-3';
        addValueInput.value = 'test-cookie-value-3';
        addButton.click();

        const cookies = getCookies();
        expect(hasOwnProperty.call(cookies, addNameInput.value));
        expect(cookies[addNameInput.value]).toBe(addValueInput.value);
        expect(listTable.children.length).toBe(1);
      });

      it('удалить cookie из табилицы, если ее значение перестало соответствовать фильтр', () => {
        addNameInput.value = 'test-cookie-name-1';
        addValueInput.value = 'test-cookie-value-1';
        addButton.click();

        addNameInput.value = 'test-cookie-name-2';
        addValueInput.value = 'test-cookie-value-2';
        addButton.click();

        addNameInput.value = 'test-cookie-name-3';
        addValueInput.value = 'test-cookie-value-2';
        addButton.click();

        filterNameInput.value = 'value-2';
        filterNameInput.dispatchEvent(new KeyboardEvent('input'));
        expect(listTable.children.length).toBe(2);

        addNameInput.value = 'test-cookie-name-3';
        addValueInput.value = 'test-cookie-value-3';
        addButton.click();

        const cookies = getCookies();
        expect(hasOwnProperty.call(cookies, addNameInput.value));
        expect(cookies[addNameInput.value]).toBe(addValueInput.value);
        expect(listTable.children.length).toBe(2);
      });

      it('выводить все cookie, если фильтр не задан', () => {
        addNameInput.value = 'test-cookie-name-1';
        addValueInput.value = 'test-cookie-value-1';
        addButton.click();

        addNameInput.value = 'test-cookie-name-2';
        addValueInput.value = 'test-cookie-value-2';
        addButton.click();

        filterNameInput.value = '';
        filterNameInput.dispatchEvent(new KeyboardEvent('input'));
        expect(listTable.children.length).toBe(2);
      });
    });
  });
});
