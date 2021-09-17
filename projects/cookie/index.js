/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');

// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');

// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');

// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');

// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');

// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('input', function () {
  listTable.innerHTML = '';

  createCookiesList();
});

addButton.addEventListener('click', () => {
  const nameCookie = addNameInput.value;
  const valueCookie = addValueInput.value;

  if (nameCookie.length > 0 && valueCookie.length > 0) {
    const newCookie = `${nameCookie}=${valueCookie}`;
    document.cookie = newCookie;
  }
  listTable.click();
});

function createCookiesList() {
  const cookies = document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});

  for (const key in cookies) {
    if (cookies[key] !== undefined) {
      if (
        key.includes(filterNameInput.value) ||
        cookies[key].includes(filterNameInput.value) ||
        filterNameInput.value.length === 0
      ) {
        const trTable = document.createElement('tr');

        trTable.insertAdjacentHTML('beforeend', `<td>${key}</td>`);
        trTable.insertAdjacentHTML('beforeend', `<td>${cookies[key]}</td>`);
        trTable.insertAdjacentHTML('beforeend', `<td><button>Удалить</button></td>`);
        listTable.appendChild(trTable);
      }
    }
  }
}

function deleteCookie(button) {
  const parent = button.closest('tr');
  const nameCookie = parent.children[0].textContent;
  const valueCookie = parent.children[1].textContent;
  const cookie = `${nameCookie}=${valueCookie}`;
  document.cookie = `${cookie}; max-age=0`;
}

listTable.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    deleteCookie(e.target);
  }

  listTable.innerHTML = '';
  createCookiesList();
});

createCookiesList();
