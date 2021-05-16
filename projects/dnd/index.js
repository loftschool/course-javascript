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
let mouseOffset;
let dragElem;

document.addEventListener('mousemove', (e) => {
  e.preventDefault();
});
document.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('draggable-div')) {
    dragElem = e.target;
    const pos = getPosition(e.target);
    mouseOffset = {
      x: e.pageX - pos.x,
      y: e.pageY - pos.y,
    };
  }
});
document.addEventListener('mouseup', (e) => {
  if (dragElem) {
    dragElem.style.top = e.pageY - mouseOffset.y + 'px';
    dragElem.style.left = e.pageX - mouseOffset.x + 'px';
    dragElem = null;
  }
});

export function createDiv() {
  const elem = document.createElement('div');
  elem.classList.add('draggable-div');
  const maxHeight = 200;
  const maxWidth = 400;
  const windowHeight = window.outerHeight;
  const windowWidth = window.outerWidth;
  const elemHeight = Math.random() * maxHeight;
  const elemWidth = Math.random() * maxWidth;
  const elemTop = Math.random() * (windowHeight - maxHeight);
  const elemLeft = Math.random() * (windowWidth - maxWidth);
  const elemBackgroundColor = Math.floor(Math.random() * 16777215).toString(16);
  elem.style.cssText = 'height:' + elemHeight + 'px; width:' + elemWidth + 'px;';
  elem.style.cssText += 'top:' + elemTop + 'px; left:' + elemLeft + 'px;';
  elem.style.cssText += 'background-color:#' + elemBackgroundColor + ';';
  elem.draggable = true;

  return elem;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

function getPosition(e) {
  let left = 0;
  let top = 0;
  while (e.offsetParent) {
    left += e.offsetLeft;
    top += e.offsetTop;
    e = e.offsetParent;
  }
  left += e.offsetLeft;
  top += e.offsetTop;

  return { x: left, y: top };
}
