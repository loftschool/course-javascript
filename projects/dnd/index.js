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

export function createDiv() {
  const elem = document.createElement('div');
  elem.classList.add('draggable-div');
  const windowHeight = window.outerHeight;
  const windowWidth = window.outerWidth;
  const elemHeight = Math.random() * windowHeight;
  const elemWidth = Math.random() * windowWidth;
  const elemTop = Math.random() * (windowHeight - elemHeight);
  const elemLeft = Math.random() * (windowWidth - elemWidth);
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
