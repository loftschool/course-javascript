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

document.addEventListener('mousedown', (e) => {
  const div = e.target;

  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });

  const shiftX = e.clientX - div.getBoundingClientRect().left;
  const shiftY = e.clientY - div.getBoundingClientRect().top;

  function moveDiv(e) {
    div.style.left = `${e.pageX - shiftX}px`;
    div.style.top = `${e.pageY - shiftY}px`;
  }

  if (e.target.classList.contains('draggable-div')) {
    moveDiv(e);

    document.addEventListener('mousemove', moveDiv);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', moveDiv);
    });
  }
});

export function createDiv() {
  const div = document.createElement('div');

  div.classList.add('draggable-div');
  div.style.zIndex = '-1';
  div.style.background = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  div.style.width = `${Math.random() * 300}px`;
  div.style.height = `${Math.random() * 300}px`;
  div.style.top = `${Math.random() * 100}%`;
  div.style.left = `${Math.random() * 100}%`;

  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
