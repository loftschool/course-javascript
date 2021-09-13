/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {
  if (e.target.classList.contains('draggable-div')) {
    const div = e.target;
    div.ondragstart = function () {
      return false;
    };
    div.onmousedown = function (event) {
      function move(x, y) {
        div.style.left = x - div.offsetWidth / 2 + 'px';
        div.style.top = y - div.offsetHeight / 2 + 'px';
      }
      move(event.pageX, event.pageY);
      function moveTo(event) {
        move(event.pageX, event.pageY);
      }
      div.addEventListener('mousemove', moveTo);
      div.onmouseup = () => {
        div.removeEventListener('mousemove', moveTo);
        div.onmouseup = null;
      };
    };
  }
});

export function createDiv() {
  function getRandomInt(from, to) {
    return Math.ceil(Math.random() * (to - from) + from);
  }
  const element = document.createElement('div');
  element.classList.add('draggable-div');
  element.style.backgroundColor =
    'rgb(' +
    getRandomInt(0, 256) +
    ',' +
    getRandomInt(0, 256) +
    ',' +
    getRandomInt(0, 256) +
    ')';
  element.style.width = `${getRandomInt(1, 100)}px`;
  element.style.height = `${getRandomInt(1, 100)}px`;
  element.style.left = `${getRandomInt(0, document.body.offsetWidth)}px`;
  element.style.top = `${getRandomInt(0, document.body.offsetHeight)}px`;
  return element;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
