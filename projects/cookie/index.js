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

let pageCookies = {};

filterNameInput.addEventListener('input', function () {
  fillTable();
});

addButton.addEventListener('click', () => {
  const name = addNameInput.value;
  if (!name) {
    return;
  }
  const value = addValueInput.value;
  document.cookie = [name, value].join('=');

  fetchCookies();
  fillTable();
});

listTable.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('delete-btn')) {
    const firstElementChild = target.parentNode.firstElementChild;
    const name = firstElementChild.innerHTML;

    document.cookie = name + '=null; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    delete pageCookies.name;
    target.parentNode.remove();
  }
});

window.addEventListener('load', (event) => {
  fetchCookies();
  fillTable();
});

function fetchCookies() {
  const cookies = document.cookie.split('; ');
  if (!cookies) {
    return;
  }

  pageCookies = cookies.reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});
}

function fillTable() {
  if (!pageCookies) {
    return;
  }

  listTable.innerHTML = '';
  const fragment = document.createDocumentFragment();

  let filter = filterNameInput.value;
  for (const [name, value] of Object.entries(pageCookies)) {
    if (filter) {
      filter = filter.toLowerCase();
      if (!name.toLowerCase().includes(filter) && !value.toLowerCase().includes(filter)) {
        continue;
      }
    }

    fragment.append(createTableRow(name, value));
  }

  listTable.appendChild(fragment);
}

function createTableRow(name, value) {
  const row = document.createElement('tr');
  const nameTh = document.createElement('th');
  const valueTh = document.createElement('th');

  nameTh.innerHTML = name;
  valueTh.innerHTML = value;

  row.appendChild(nameTh);
  row.appendChild(valueTh);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.innerHTML = 'удалить';

  row.appendChild(deleteButton);
  return row;
}
