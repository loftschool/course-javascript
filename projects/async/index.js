/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import './towns.html';

const homeworkContainer = document.querySelector('#app');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  showLoadingBlock();

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json'
    );
    xhr.responseType = 'json';
    xhr.onprogress = () => {
      showLoadingBlock();
    };
    xhr.onload = () => {
      if (xhr.status === 200) {
        const result = Array.from(xhr.response).sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        showFilterBlock();
        resolve(result);
      } else {
        showErrorBlock();
        reject();
      }
    };
    xhr.onerror = () => {
      showErrorBlock();
      reject();
    };
    xhr.send();
  });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  if (!chunk) return false;
  return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

function showLoadingBlock() {
  loadingFailedBlock.style.display = 'none';
  filterBlock.style.display = 'none';
  loadingBlock.style.display = 'block';
}
function showErrorBlock() {
  loadingFailedBlock.style.display = 'block';
  filterBlock.style.display = 'none';
  loadingBlock.style.display = 'none';
}
function showFilterBlock() {
  loadingFailedBlock.style.display = 'none';
  filterBlock.style.display = 'block';
  loadingBlock.style.display = 'none';
}

showLoadingBlock();

let TOWNS;

function getTowns() {
  loadTowns().then((towns) => {
    TOWNS = towns;
  });
}

retryButton.addEventListener('click', () => {
  getTowns();
});

filterInput.addEventListener('input', function (e) {
  filterResult.textContent = '';
  TOWNS.forEach((town) => {
    if (isMatching(town.name, e.target.value)) {
      const element = document.createElement('P');
      element.style.padding = 0;
      element.style.margin = 0;
      element.textContent = town.name;
      filterResult.append(element);
    }
  });
});

getTowns();

export { loadTowns, isMatching };
