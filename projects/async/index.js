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
  return new Promise((resolve, reject) => {
    loadingBlock.style.display = 'none';
    fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
      .then((response) => {
        if (response.status !== 200) {
          loadingFailedBlock.style.display = 'block';
          reject(response.status);
        }
        filterBlock.style.display = 'block';
        response.json().then((cities) => {
          cities.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
          resolve(cities);
        });
      })
      .catch(function (err) {
        loadingFailedBlock.style.display = 'block';
        reject(err);
      });
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
  return full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1;
}

const loadingBlock = homeworkContainer.querySelector('#loading-block');
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
const retryButton = homeworkContainer.querySelector('#retry-button');
const filterBlock = homeworkContainer.querySelector('#filter-block');
const filterInput = homeworkContainer.querySelector('#filter-input');
const filterResult = homeworkContainer.querySelector('#filter-result');

loadingFailedBlock.style.display = 'none';
filterBlock.style.display = 'none';

let citiesArray = loadTowns();

retryButton.addEventListener('click', () => {
  loadingBlock.style.display = 'none';
  citiesArray = loadTowns();
});

filterInput.addEventListener('input', function (event) {
  filterResult.textContent = '';
  const inputText = filterInput.value;

  citiesArray.then((cities) => {
    for (const city of cities) {
      if (
        (inputText || inputText === 0 || inputText === '0') &&
        isMatching(city.name, inputText)
      ) {
        const newDiv = document.createElement('div');
        newDiv.textContent = city.name;
        filterResult.appendChild(newDiv);
      }
    }
  });
});

export { loadTowns, isMatching };
