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
const cookies = getCookies();

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

function addCookieToTable(name, value) {
  if (name.includes(filterNameInput.value) || value.includes(filterNameInput.value)) {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdValue = document.createElement('td');
    const tdDelete = document.createElement('td');
    const btn = document.createElement('button');

    btn.addEventListener('click', () => {
      tr.remove();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    });

    tdName.value = name;
    tdValue.value = value;

    tdDelete.appendChild(btn);
    tr.append(tdName, tdValue, tdDelete);
    listTable.appendChild(tr);
  }
}

Object.keys(cookies).forEach((cookie) => {
  const name = cookie;
  const value = cookies[cookie];

  addCookieToTable(name, value);
});

filterNameInput.addEventListener('input', function () {
  listTable.innerHTML = '';
  const curCookies = getCookies();
  console.log(666, document.cookie);
  Object.keys(curCookies).find((cookie) => {
    addCookieToTable(cookie, curCookies[cookie]);
  });
});

addButton.addEventListener('click', () => {
  const curCookies = getCookies();
  const name = addNameInput.value;
  const value = addValueInput.value;
  const isDuplicate = Object.keys(curCookies).find((cookie) => cookie === name);

  if (!isDuplicate) {
    addCookieToTable(name, value);
  } else {
    const trs = listTable.querySelectorAll('tr');

    trs.forEach((tr) => {
      const [tdName, tdValue] = tr.querySelectorAll('td');

      if (tdName.value === name) {
        tdValue.textContent = value;
        return;
      }
    });
  }

  document.cookie = `${name}=${value}`;
});

listTable.addEventListener('click', (e) => {});
