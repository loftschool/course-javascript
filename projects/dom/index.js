/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {
  let divElement = document.createElement('div');
  divElement.innerHTML = text;
  return divElement;
}

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в параметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */
function prepend(what, where) {
  where.prepend(what);
}

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов следующим соседом которых является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </body>

   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
  let children = where.children;
  let arr = [];
  for (let child of children) {
    if (child.nextElementSibling && child.nextElementSibling.tagName == "P") {
      arr.push(child);
    }
  }
  return arr;
}

/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </body>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
function findError(where) {
  const result = [];

  for (const child of where.children) {
    result.push(child.textContent);
  }

  return result;
}

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
  let i = 0;
  while (i < where.childNodes.length) {
    if (where.childNodes[i].nodeType === 3) {
      where.childNodes[i].remove();
      i = 0;
    } else {
      i++;
    }
  }
}

/*
 Задание 6:

 Выполнить предыдущее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
  for (var i = 0; i < where.childNodes.length; i++) {
    if (where.childNodes[i].nodeType === 3) {
      where.removeChild(where.childNodes[i]);
      i--;
    } else {
      deleteTextNodesRecursive(where.childNodes[i]);
    }
  }

}


/*
 Задание 7 *:
 
 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных
 
 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */
function collectDOMStat(root) {
  if (arguments.length == 1) {
    var obj = {
      tags: {},
      classes: {},
      texts: 0
    }
  }
  for (let i = 0; i < root.childNodes.length; i++) {
    if (root.childNodes[i].childNodes.length !== 0) {
      let tagName = root.childNodes[i].tagName;
      let classNames = root.childNodes[i].className ? root.childNodes[i].className.split(" ") : [];
      let isText = root.childNodes[i].nodeType === 3;
      if (tagName !== "SCRIPT") {
        if (arguments.length > 1) {
          if (tagName) {
            arguments[1].tags[tagName] = arguments[1].tags[tagName] ? arguments[1].tags[tagName] + 1 : 1;
          }
          for (let className of classNames) {
            if (className.trim()) {
              arguments[1].classes[className] = arguments[1].classes[className] ? arguments[1].classes[className] + 1 : 1;
            }
          }
          if (isText) {
            if (root.childNodes[i].textContent.trim()) {
              arguments[1].texts += 1;
            }
          }
        } else {
          if (tagName) {
            obj.tags[tagName] = obj.tags[tagName] ? obj.tags[tagName] + 1 : 1;
          }
          for (let className of classNames) {
            if (className.trim()) {
              obj.classes[className] = obj.classes[className] ? obj.classes[className] + 1 : 1;
            }
          }
          if (isText) {
            if (root.childNodes[i].textContent.trim()) {
              obj.texts += 1;
            }
          }
        }
      }
      if (arguments.length > 1) {
        collectDOMStat(root.childNodes[i], arguments[1]);
      } else {
        collectDOMStat(root.childNodes[i], obj);
      }

    } else {
      let tagName = root.childNodes[i].tagName;
      let classNames = root.childNodes[i].className ? root.childNodes[i].className.split(" ") : [];
      let isText = root.childNodes[i].nodeType === 3;
      if (tagName !== "SCRIPT") {
        if (arguments.length > 1) {
          if (tagName) {
            arguments[1].tags[tagName] = arguments[1].tags[tagName] ? arguments[1].tags[tagName] + 1 : 1;
          }
          for (let className of classNames) {
            if (className.trim()) {
              arguments[1].classes[className] = arguments[1].classes[className] ? arguments[1].classes[className] + 1 : 1;
            }
          }
          if (isText) {
            if (root.childNodes[i].textContent.trim()) {
              arguments[1].texts += 1;
            }
          }
        } else {
          if (tagName) {
            obj.tags[tagName] = obj.tags[tagName] ? obj.tags[tagName] + 1 : 1;
          }
          for (let className of classNames) {
            if (className.trim()) {
              obj.classes[className] = obj.classes[className] ? obj.classes[className] + 1 : 1;
            }
          }
          if (isText) {
            if (root.childNodes[i].textContent.trim()) {
              obj.texts += 1;
            }
          }
        }
      }
    }
  }
  return obj;
}

/*
 Задание 8 *:
 
 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn
 
 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)
 
 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов
 
 Рекомендуется использовать MutationObserver
 
 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }
 
   ------
 
   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */
function observeChildNodes(where, fn) { }

export {
  createDivWithText,
  prepend,
  findAllPSiblings,
  findError,
  deleteTextNodes,
  deleteTextNodesRecursive,
  collectDOMStat,
  observeChildNodes,
};
