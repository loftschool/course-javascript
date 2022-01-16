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

function addRow(name = "", value = "") {
  let tr = document.createElement("tr");

  let tdName = document.createElement("td");
  tdName.textContent = name;

  let tdValue = document.createElement("td");
  tdValue.textContent = value;

  let tdDelete = document.createElement("td");
  let butDelete = document.createElement("button");
  butDelete.textContent = "удалить";
  tdDelete.appendChild(butDelete);

  butDelete.addEventListener("click", () => {
    eraseCookie(tdName.textContent);
    tr.remove();

  });

  tr.appendChild(tdName);
  tr.appendChild(tdValue);
  tr.appendChild(tdDelete);
  listTable.appendChild(tr);
}

function clearInputCookieFields() {
  addNameInput.value = '';
  addValueInput.value = '';
}
function addCookie() {
  if (isEmptyCookie()) {
    clearInputCookieFields();
    return;
  }

  if (existingCookie(addNameInput.value)) {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    //Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру, 
    //то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
    if (addValueInput.value.toUpperCase().indexOf(filterNameInput.value.toUpperCase()) == -1) {
      deleteRow(addNameInput.value);
      clearInputCookieFields();
      return;
    }

    //Если добавляется cookie с именем уже существующей cookie, 
    //то ее значение в браузере и таблице должно быть обновлено
    updateRow(addNameInput.value);
    clearInputCookieFields();
    return;
  }
  //Если добавляемая cookie не соответствует фильтру, 
  //то она должна быть добавлена только в браузер, но не в таблицу
  if (addNameInput.value.toUpperCase().indexOf(filterNameInput.value.toUpperCase()) > -1) {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    addRow(addNameInput.value, addValueInput.value);
  } else {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  }
  clearInputCookieFields();
}

function listCookie() {
  const cookies = document.cookie.split(';').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});
  return cookies;
}

function existingCookie(name) {
  const cookies = listCookie();
  for (const key in cookies) {
    if (key.trim() === name.trim()) {
      return true;
    }
  }
  return false;
}

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

function isEmptyCookie() {
  if (!addNameInput.value) {
    return true;
  }
  return false;
}

function updateRow(name) {
  let htmlCollection = listTable.children;
  for (let i = 0; i < htmlCollection.length; i++) {
    if (htmlCollection[i].children[0].innerText.trim() === name.trim()) {
      htmlCollection[i].children[1].textContent = addValueInput.value;
    }
  }
}

function deleteRow(name) {
  let htmlCollection = listTable.children;
  for (let i = 0; i < htmlCollection.length; i++) {
    if (htmlCollection[i].children[0].innerText.trim() === name.trim()) {
      htmlCollection[i].remove();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cookies = listCookie();
  for (const key in cookies) {
    if (key) {
      addRow(key, cookies[key]);
    }
  }
});

function filterCookies() {
  let htmlCollection = listTable.children;;
  for (let i = 0; i < htmlCollection.length; i++) {
    let tdName = htmlCollection[i].children[0];
    let tdValue = htmlCollection[i].children[1];
    if (tdName || tdValue) {
      let cookieName = tdName.textContent || tdName.innerText;
      let cookieValue = tdValue.textContent || tdValue.innerText;
      if (cookieName.toUpperCase().indexOf(filterNameInput.value.toUpperCase()) > -1 ||
        cookieValue.toUpperCase().indexOf(filterNameInput.value.toUpperCase()) > -1) {
        htmlCollection[i].style.display = "";
      } else {
        htmlCollection[i].style.display = "none";
      }
    }
  }
}

filterNameInput.addEventListener('input', function () {
  filterCookies();
});

addButton.addEventListener('click', () => {
  addCookie();
});

listTable.addEventListener('click', (e) => { });