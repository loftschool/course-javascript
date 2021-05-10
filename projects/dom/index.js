/* ДЗ 4 - работа с DOM */

/*
 Задание 1:
 1.1: Функция должна создать элемент с тегом DIV
 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text
 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
   function createDivWithText(text) {
    const createDiv = document.createElement('div');
    createDiv.textContent = text;
  
    return createDiv;
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
    let siblings = [];
  
    for (const node of where.children) {
  
      if (node.tagName === 'P') {
        siblings.push(node.previousElementSibling);
      }
    }
  
    return siblings;
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
    for (const child of where.childNodes) {
      if (child.nodeType === 3) {
        where.removeChild(child);
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
  
    for (const child of where.childNodes) {
      if (child.nodeType === 3) {
        child.textContent = '';
      }
      deleteTextNodesRecursive(child);
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
    const domStat = {
      tags: {},
      classes: {},
      texts: '',
    };
  
    const text = [];
    const tags = [];
    const classes = [];
  
    function createArrays(arg) {
      for (const child of arg.childNodes) {
        if (child.tagName != undefined) {
          tags.push(child.tagName);
        }
        if (child.className != undefined) {
          if (child.className != '') {
            classes.push(child.classList);
          }
        }
  
        if (child.nodeType === 3) {
          text.push(child);
        }
        createArrays(child);
      }
    }
  
    createArrays(root);
  
    const countTxt = text.length;
  
    const countTags = tags.reduce((acc, item) => {
      if (acc.hasOwnProperty(item)) {
        acc[item]++
      } else {
        acc[item] = 1
      }
  
      return acc
    }, {});
  
    const classesArr = []
  
    for (let i = 0; i < classes.length; i++) {
      const element = classes[i];
  
      for (let i = 0; i < element.length; i++) {
        classesArr.push(element[i]);
      }
    }
  
    const countClass = classesArr.reduce((acc, item) => {
      if (acc.hasOwnProperty(item)) {
        acc[item]++
      } else {
        acc[item] = 1
      }
  
      return acc
    }, {});
  
    domStat.texts = countTxt;
    domStat.tags = countTags;
    domStat.classes = countClass;
  
    return domStat;
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
  function observeChildNodes(where, fn) {
    // Конфигурация observer (за какими изменениями наблюдать)
    const config = {
      childList: true,
      subtree: true
    };
  
    // Колбэк-функция при срабатывании мутации
    const callback = function (mutationsList) {
      let object = {
        type: '',
        nodes: [],
      };
  
      mutationsList.forEach(mutation => {
  
  
        if (mutation.type === 'childList') {
  
          if (mutation.addedNodes.length > 0) {
  
            mutation.addedNodes.forEach(node => {
              object.type = 'insert';
              object.nodes.push(node);
  
            })
          }
  
          if (mutation.removedNodes.length > 0) {
  
            mutation.removedNodes.forEach(node => {
              object.type = 'remove';
              object.nodes.push(node);
  
            })
          }
        }
      });
  
      fn(object);
  
    };
  
    // Создаём экземпляр наблюдателя с указанной функцией колбэка
    const observer = new MutationObserver(callback);
  
    // Начинаем наблюдение за настроенными изменениями целевого элемента
    observer.observe(where, config);
  }
  
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