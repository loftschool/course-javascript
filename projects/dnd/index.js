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

document.addEventListener('mousemove', (e) => {});

function randomPx() {
  return `${Math.random().toString(10).substring(2, 4)}px`;
}

function positionPx() {
  return `${Math.random().toString(10).substring(2, 4)}%`;
}

function createDiv() {
  const div = document.createElement('div');
  const randomColor = (Math.random().toString(16) + '000000')
    .substring(2, 8)
    .toUpperCase();
  div.classList.add('draggable-div');
  div.style = `background-color: #${randomColor}; height: ${randomPx()}; width: ${randomPx()}; left: ${positionPx()}; top: ${positionPx()}`;
  div.draggable = true;
  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

let currentDrag;

document.addEventListener('dragstart', (e) => {
  currentDrag = { node: e.target };
  e.dataTransfer.setData('text/html', '...');
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
});

document.addEventListener('drop', (e) => {
  if (currentDrag) {
    if (e.target.hasAttribute('id')) {
      e.preventDefault();
      currentDrag.node.style.left = `${e.offsetX}px`;
      currentDrag.node.style.top = `${e.offsetY}px`;
    }
  }

  currentDrag = null;
});
