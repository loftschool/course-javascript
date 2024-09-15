import { randomValue } from '../../scripts/helper';
import {
  collectDOMStat,
  createDivWithText,
  deleteTextNodes,
  deleteTextNodesRecursive,
  findAllPSiblings,
  findError,
  observeChildNodes,
  prepend,
} from './index';

function random(type) {
  const result = randomValue(type);

  if (type === 'string') {
    return encodeURIComponent(result);
  }

  return result;
}

describe('ДЗ 4 - Работа с DOM', () => {
  describe('createDivWithText', () => {
    it('должна возвращать элемент с тегом DIV', () => {
      const text = random('string');
      const result = createDivWithText(text);

      expect(result).toBeInstanceOf(Element);
      expect(result.tagName).toBe('DIV');
    });

    it('должна добавлять текст в элемент', () => {
      const text = random('string');
      const result = createDivWithText(text);

      expect(result.textContent).toBe(text);
    });
  });

  describe('prepend', () => {
    it('должна добавлять элемент в начало', () => {
      const where = document.createElement('div');
      const what = document.createElement('p');
      const whereText = random('string');
      const whatText = random('string');

      where.innerHTML = `, <b>${whereText}</b>!`;
      what.textContent = whatText;

      prepend(what, where);

      expect(where.firstChild).toBe(what);
      expect(where.innerHTML).toBe(`<p>${whatText}</p>, <b>${whereText}</b>!`);
    });
  });

  describe('findAllPSiblings', () => {
    it('должна возвращать массив с элементами, соседями которых являются P', () => {
      const where = document.createElement('div');

      where.innerHTML = '<div></div><p></p><span></span><span></span><p></p>';
      const result = findAllPSiblings(where);

      expect(Array.isArray(result));
      expect(result).toEqual([where.children[0], where.children[3]]);
    });
  });

  describe('findError', () => {
    it('должна возвращать массив из текстового содержимого элементов', () => {
      const where = document.createElement('div');
      const text1 = random('string');
      const text2 = random('string');

      where.innerHTML = ` <div>${text1}</div>, <div>${text2}</div>!!!`;
      const result = findError(where);

      expect(Array.isArray(result));
      expect(result).toEqual([text1, text2]);
    });
  });

  describe('deleteTextNodes', () => {
    it('должна удалить все текстовые узлы', () => {
      const where = document.createElement('div');

      where.innerHTML = ` <div></div>${random('string')}<p></p>${random('string')}`;
      deleteTextNodes(where);

      expect(where.innerHTML).toBe('<div></div><p></p>');
    });
  });

  describe('deleteTextNodesRecursive', () => {
    it('должна рекурсивно удалить все текстовые узлы', () => {
      const where = document.createElement('div');
      const text1 = random('string');
      const text2 = random('string');
      const text3 = random('string');

      where.innerHTML = `<span> <div> <b>${text1}</b> </div> <p>${text2}</p> ${text3}</span>`;
      deleteTextNodesRecursive(where);

      expect(where.innerHTML).toBe('<span><div><b></b></div><p></p></span>');
    });
  });

  describe('collectDOMStat', () => {
    it('должна вернуть статистику по переданному дереву', () => {
      const where = document.createElement('div');
      const class1 = `class-${random('number')}`;
      const class2 = `class-${random('number')}-${random('number')}`;
      const text1 = random('string');
      const text2 = random('string');
      const stat = {
        tags: { P: 1, B: 2 },
        classes: { [class1]: 2, [class2]: 1 },
        texts: 3,
      };

      where.innerHTML = `<p class="${class1}"><b>${text1}</b> <b class="${class1} ${class2}">${text2}</b></p>`;
      const result = collectDOMStat(where);

      expect(result).toEqual(stat);
    });
  });

  describe('observeChildNodes', () => {
    it('должна вызывать fn при добавлении элементов в указанный элемент', (done) => {
      const where = document.createElement('div');
      const fn = (info) => {
        expect(typeof info === 'object' && info && info.constructor === 'Object');
        expect(info.type).toBe(targetInfo.type);
        expect(Array.isArray(info.nodes));
        expect(info.nodes.length).toBe(targetInfo.nodes.length);
        expect(targetInfo.nodes).toEqual(info.nodes);
        done();
      };
      const elementToInsert = document.createElement('div');
      const targetInfo = {
        type: 'insert',
        nodes: [elementToInsert],
      };

      document.body.appendChild(where);

      observeChildNodes(where, fn);
      where.appendChild(elementToInsert);

      document.body.removeChild(where);
    });

    it('должна вызывать fn при добавлении множества элементов в указанный элемент', (done) => {
      const where = document.createElement('div');
      const fn = (info) => {
        expect(typeof info === 'object' && info && info.constructor === 'Object');
        expect(info.type).toBe(targetInfo.type);
        expect(Array.isArray(info.nodes));
        expect(info.nodes.length).toBe(targetInfo.nodes.length);
        expect(targetInfo.nodes).toEqual(info.nodes);
        done();
      };
      const elementToInsert1 = document.createElement('div');
      const elementToInsert2 = document.createElement('div');
      const elementToInsert3 = document.createElement('div');
      const targetInfo = {
        type: 'insert',
        nodes: [elementToInsert1, elementToInsert2, elementToInsert3],
      };
      const fragment = new DocumentFragment();

      document.body.appendChild(where);

      fragment.appendChild(elementToInsert1);
      fragment.appendChild(elementToInsert2);
      fragment.appendChild(elementToInsert3);

      observeChildNodes(where, fn);
      where.appendChild(fragment);

      document.body.removeChild(where);
    });

    it('должна вызывать fn при удалении элементов из указанного элемента', (done) => {
      const where = document.createElement('div');
      const fn = (info) => {
        expect(typeof info === 'object' && info && info.constructor === 'Object');
        expect(info.type).toBe(targetInfo.type);
        expect(Array.isArray(info.nodes));
        expect(info.nodes.length).toBe(targetInfo.nodes.length);
        expect(targetInfo.nodes).toEqual(info.nodes);
        done();
      };
      const elementToRemove = document.createElement('div');
      const targetInfo = {
        type: 'remove',
        nodes: [elementToRemove],
      };

      document.body.appendChild(where);

      where.appendChild(elementToRemove);
      observeChildNodes(where, fn);
      where.removeChild(elementToRemove);

      document.body.removeChild(where);
    });

    it('должна вызывать fn при удалении множества элементов из указанного элемента', (done) => {
      const where = document.createElement('div');
      const fn = (info) => {
        expect(typeof info === 'object' && info && info.constructor === 'Object');
        expect(info.type).toBe(targetInfo.type);
        expect(Array.isArray(info.nodes));
        expect(info.nodes.length).toBe(targetInfo.nodes.length);
        expect(targetInfo.nodes).toEqual(info.nodes);
        done();
      };
      const elementToRemove1 = document.createElement('div');
      const elementToRemove2 = document.createElement('div');
      const elementToRemove3 = document.createElement('div');
      const targetInfo = {
        type: 'remove',
        nodes: [elementToRemove1, elementToRemove2, elementToRemove3],
      };

      document.body.appendChild(where);

      where.appendChild(elementToRemove1);
      where.appendChild(elementToRemove2);
      where.appendChild(elementToRemove3);

      observeChildNodes(where, fn);
      where.innerHTML = '';

      document.body.removeChild(where);
    });
  });
});
