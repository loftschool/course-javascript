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

const filterFunction = (chunk, cookieName, cookieValue) => {
  return (
    cookieName.toLowerCase().indexOf(chunk.toLowerCase()) !== -1 ||
    cookieValue.toLowerCase().indexOf(chunk.toLowerCase()) !== -1
  );
};

const updateCookiesObj = () => {
  if (document.cookie) {
    const cookies = document.cookie.split('; ').reduce((acc, curr) => {
      const [name, value] = curr.split('=');
      acc[name] = value;
      return acc;
    }, {});
    return cookies;
  } else {
    return {};
  }
};

const updateCookiesTable = (cookies, filterChunk) => {
  listTable.innerHTML = '';
  const fragment = document.createDocumentFragment();
  let resultArr;

  if (Object.keys(cookies).length !== 0) {
    const cookieNodesArray = Object.keys(cookies).map((key) => {
      const tr = document.createElement('tr'),
        tdName = document.createElement('td'),
        tdValue = document.createElement('td'),
        tdButton = document.createElement('td'),
        deleteButton = document.createElement('button');
      tdName.innerText = key;
      tdValue.innerText = cookies[key];
      tdValue.classList.add('value');
      deleteButton.innerText = 'Удалить';

      tr.append(tdName, tdValue, tdButton);
      tdButton.appendChild(deleteButton);
      deleteButton.addEventListener('click', () => {
        document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        tr.remove();
      });
      return tr;
    });

    if (!filterChunk) {
      resultArr = cookieNodesArray;
    } else {
      resultArr = cookieNodesArray.filter((node) => {
        return filterFunction(
          filterChunk,
          node.children[0].innerText,
          node.children[1].innerText
        );
      });
    }
    resultArr.map((node) => fragment.appendChild(node));
  }

  if (resultArr) {
    listTable.parentNode.classList.remove('hidden');
    listTable.appendChild(fragment);
  } else {
    listTable.parentNode.classList.add('hidden');
  }
};

updateCookiesTable(updateCookiesObj());

filterNameInput.addEventListener('input', function () {
  updateCookiesTable(updateCookiesObj(), filterNameInput.value);
});

addButton.addEventListener('click', () => {
  const cookieName = addNameInput.value,
    cookieValue = addValueInput.value;

  document.cookie = `${cookieName}=${cookieValue}`;
  updateCookiesTable(updateCookiesObj(), filterNameInput.value);

  addNameInput.value = '';
  addValueInput.value = '';
});

listTable.addEventListener('click', (e) => {});
