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
// import './dnd.html';

const homeworkContainer = document.querySelector('#app');

// export function createDiv() {}

const addDivButton = homeworkContainer.querySelector('#addDiv');

//1. Устанавливаем обработчик на кнопку
addDivButton.addEventListener('click', function () {
  //2. Создае DIV
  const div = createDiv();
  homeworkContainer.appendChild(div);

  // 3. Вешаем обработчик нажатия мыши на DIV
  div.onmousedown = function (event) {
    //4.  Отключаем стандартное поведение Drag&Drop HTML5
    div.ondragstart = function () {
      return false;
    };

    //5. Собираем  в переменные точку клика
    const shiftX = event.clientX - div.getBoundingClientRect().left;
    const shiftY = event.clientY - div.getBoundingClientRect().top;

    //8. Двигаем DIV исходя из движения мыши учитывая точки клика
    function moveAt(pageX, pageY) {
      div.style.left = pageX - shiftX + 'px';
      div.style.top = pageY - shiftY + 'px';
    }
    //7. При движении мыши передаем коордианты движения
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    //6. Вешаем обрабочик движения мыши
    document.addEventListener('mousemove', onMouseMove);

    //9. При отпускании клика удаляем обрабочик движения мыши и обработчик опускания клика
    div.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      div.onmouseup = null;
    };
  };
});

// Генератор случайного числа от min до max
function random(min, max) {
  return parseInt(min + Math.random() * max - min);
}

//2. Создать новый <DIV> со случайными размерами, цветом и рамположением
function createDiv() {
  const minSize = 20;
  const maxSize = 200;
  const maxColor = 0xffffff;

  const newDiv = document.createElement('div');
  newDiv.classList.add('block');
  newDiv.style.width = random(minSize, maxSize) + 'px';
  newDiv.style.height = random(minSize, maxSize) + 'px';
  newDiv.style.background = '#' + random(0, maxColor).toString(16);
  newDiv.style.left = random(0, window.innerWidth) + 'px';
  newDiv.style.top = random(0, window.innerHeight) + 'px';
  newDiv.setAttribute('draggable', true);

  return newDiv;
}
