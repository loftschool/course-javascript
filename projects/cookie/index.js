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
  updateTable();
});

addButton.addEventListener('click', () => {
  document.cookie = `${addNameInput.value}=${addValueInput.value}`;

  // addNameInput.value = '';
  // addValueInput.value = '';
  updateTable();
});

listTable.addEventListener('click', (e) => {});

function updateTable() {
  listTable.innerHTML = '';
  const filterName = filterNameInput.value;
  const cookie = document.cookie.split('; ');
  for (const item of cookie) {
    const [name, value] = item.split('=');
    if (
      !!filterName &&
      name.indexOf(filterName) === -1 &&
      value.indexOf(filterName) === -1
    ) {
      continue;
    }
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const button = document.createElement('a');
    button.textContent = 'Удалить';
    button.style =
      'cursor:pointer; background-color:#B72222; color:#fff; padding:4px; border-radius:5px;';
    button.addEventListener('click', (event) => {
      let count = 0;
      let node = event.path[count];
      while (node.tagName !== 'TR') {
        node = event.path[++count];
      }
      const cookieName = node.children[0].textContent;
      document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      updateTable();
    });

    td1.textContent = name;
    td2.textContent = value;
    td3.appendChild(button);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    listTable.appendChild(tr);
  }
}
updateTable();
