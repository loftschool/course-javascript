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
  const div = document.createElement('div');
  const randPX = `${Math.round(Math.random() * 1000 + 1)}px`;

  //цвет
  let color = Math.round(Math.random() * 16777215).toString(16);
  color = '0'.repeat(6 - color.length) + color;
  div.style.backgroundColor = '#' + color;

  //позиция
  div.style.top = randPX;
  div.style.left = randPX;
  div.style.right = randPX;
  div.style.bottom = randPX;

  //размер
  div.style.height = randPX;
  div.style.width = randPX;

  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  div.classList.add('draggable-div');

  div.addEventListener('mousedown', (e) => {
    document.addEventListener('mousemove', (e) => {
      div.style.top = e.clientY + 'px';
      div.style.left = e.clientX + 'px';
    });

    div.addEventListener('onmouseup', (e) => {
      document.onmousemove = null;
      div.onmouseup = null;
    });
  });

  homeworkContainer.appendChild(div);
});
