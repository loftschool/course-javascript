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
  document.body.style.cursor = 'pointer';
});

function randomSize(from, to) {
  return parseInt(from + Math.random() * to - from);
}

function randomColor() {
  let r, g, b;
  r = randomSize(0, 255);
  g = randomSize(0, 255);
  b = randomSize(0, 255);
  return `rgb(${r},${g},${b})`;
}

function randomPosition() {
  let maxX = screen.availWidth;
  let maxY = screen.availHeight;
  let startX = window.screenX;
  let startY = window.screenY;
  let position = {};
  position.x = randomSize(startX, maxX);
  position.y = randomSize(startY, maxY);
  return position;
}

export function createDiv() {
  const div = document.createElement('div');
  let maxWidth = 100;
  let maxHeight = 100;
  let position = randomPosition();
  div.classList.add("draggable-div");
  div.style.backgroundColor = randomColor();
  div.style.width = randomSize(1, maxWidth) + 'px';
  div.style.height = randomSize(1, maxHeight) + 'px';
  div.style.top = position.y + 'px';
  div.style.left = position.x + 'px';
  div.setAttribute("draggable", "true");
  let getCoords = (elem) => {
    let box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
  div.addEventListener("dragend", (event) => {
    let coords = getCoords(event.target),
      x = event.pageX,
      y = event.pageY;
    div.style.top = y + "px";
    div.style.left = +x + "px";
  });
  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
