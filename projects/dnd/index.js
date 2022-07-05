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
let currentDrag, startX, startY;

function random(min, max) {
  return String(Math.floor(Math.random() * (max - min)) + min);
}

document.addEventListener('mousemove', (e) => {
  if (currentDrag) {
    currentDrag.style.top = e.clientY - startY + 'px';
    currentDrag.style.left = e.clientX - startX + 'px';
  }
});

export function createDiv() {
  const newDiv = document.createElement('div');
  newDiv.className = 'draggable-div';

  newDiv.style.top = random(100, document.documentElement.clientHeight - 100) + 'px';
  newDiv.style.left = random(100, document.documentElement.clientWidth - 100) + 'px';
  newDiv.style.width = random(10, 100) + 'px';
  newDiv.style.height = random(10, 100) + 'px';
  newDiv.style.backgroundColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(
    0,
    255
  )})`;

  newDiv.onmousedown = (event) => {
    startX = event.offsetX;
    startY = event.offsetY;
    currentDrag = newDiv;
  };
  newDiv.onmouseup = (event) => {
    currentDrag = false;
  };

  return newDiv;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
