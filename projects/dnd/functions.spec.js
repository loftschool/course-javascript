import {
  addListener,
  delegate,
  emulateClick,
  once,
  removeListener,
  skipDefault,
} from './functions';

describe('ДЗ 6.1 - DOM Events', () => {
  describe('addListener', () => {
    it('должна добавлять обработчик событий элемента', () => {
      const target = document.createElement('div');
      const eventName = 'click';
      const fn = jest.fn();

      addListener(eventName, target, fn);

      target.dispatchEvent(new CustomEvent(eventName));
      expect(fn).toBeCalled();
    });
  });

  describe('removeListener', () => {
    it('должна удалять обработчик событий элемента', () => {
      const target = document.createElement('div');
      const eventName = 'click';
      const fn = jest.fn();

      target.addEventListener(eventName, fn);

      removeListener(eventName, target, fn);

      target.dispatchEvent(new CustomEvent(eventName));
      expect(fn).not.toBeCalled();
    });
  });

  describe('skipDefault', () => {
    it('должна добавлять такой обработчик, который предотвращает действие по умолчанию', () => {
      const target = document.createElement('div');
      const eventName = 'click';

      skipDefault(eventName, target);

      const result = target.dispatchEvent(
        new CustomEvent(eventName, { cancelable: true })
      );
      expect(!result);
    });
  });

  describe('emulateClick', () => {
    it('должна эмулировать клик по элементу', () => {
      const target = document.createElement('div');
      const eventName = 'click';
      const fn = jest.fn();

      target.addEventListener(eventName, fn);

      emulateClick(target);

      expect(fn).toBeCalled();
    });
  });

  describe('delegate', () => {
    it('должна добавлять обработчик кликов, который реагирует только на клики по кнопкам', () => {
      const target = document.createElement('div');
      const eventName = 'click';
      const fn = jest.fn();

      target.innerHTML = '<div></div><a href="#"></a><p></p><button></button>';

      delegate(target, fn);

      expect(fn).not.toBeCalled();
      target.children[0].dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
      expect(fn).not.toBeCalled();
      target.children[1].dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
      expect(fn).not.toBeCalled();
      target.children[2].dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
      expect(fn).not.toBeCalled();
      target.children[3].dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
      expect(fn).toBeCalled();
    });
  });

  describe('once', () => {
    it('должна добавлять обработчик кликов, который сработает только один раз и удалится', () => {
      const target = document.createElement('div');
      const eventName = 'click';
      let passed = 0;
      const fn = () => passed++;

      once(target, fn);

      expect(passed).toBe(0);
      target.dispatchEvent(new CustomEvent(eventName));
      expect(passed).toBe(1);
      target.dispatchEvent(new CustomEvent(eventName));
      expect(passed).toBe(1);
      target.dispatchEvent(new CustomEvent(eventName));
    });
  });
});
