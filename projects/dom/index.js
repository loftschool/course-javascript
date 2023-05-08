/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {
  const element = document.createElement('div');
  element.textContent = text;
  return element;
}
console.log(createDivWithText('loftschool'));

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в параметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */

const where = document.createElement('div');
where.id = 'one';
const what = document.createElement('p');
what.id = 'two';

function prepend(what, where) {
  where.prepend(what);
  return where;
}

console.log(prepend(what, where));
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
  let arr = [];
  for (const node of where.children) {
    if (node.nodeName === 'P') {
      arr.push(node.previousElementSibling);
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
    for (const child of where.childNodes) {
      if(child.nodeName === 'DIV'){
        result.push(child.textContent)
  }
    }
   return result;
  }
  console.log(findError(document.body))
  

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
    let newBody = where.childNodes
  for (const node of newBody){
    if (node.nodeType == 3){
      node.remove(node)
    }
  }
    return newBody 
  }
/*
 Задание 6 *:

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
    const stat = {
        tags: {},
        classes: {},
        texts: 0
    };
    function scan(root) {
        for (const child of root.childNodes) {
            if (child.nodeType == Node.TEXT_NODE) {
                stat.texts++;
            } else if (child.nodeType == Node.ELEMENT_NODE) {
                if (child.tagName in stat.tags) {
                    stat.tags[child.tagName]++;
                } else {
                    stat.tags[child.tagName] = 1;
                }
                for (const className of child.classList) {
                    if (className in stat.classes) {
                        stat.classes[className]++;
                    } else {
                        stat.classes[className] = 1;
                    }
                }
                scan(child);
            }
        }
    }
    scan(root);
    return stat;
}

export {
  createDivWithText,
  prepend,
  findAllPSiblings,
  findError,
  deleteTextNodes,
  collectDOMStat,
};
