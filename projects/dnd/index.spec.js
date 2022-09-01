describe('ДЗ 5.2 - Div D&D', () => {
  const dndPage = require('./index');
  const homeworkContainer = document.querySelector('#app');
  let addDivButton;

  describe('Функциональное тестирование', () => {
    describe('createDiv', () => {
      it('должна создавать div с произвольными размерами/позицией/цветом', () => {
        const result = dndPage.createDiv();

        expect(result).toBeInstanceOf(Element);
        expect(result.tagName).toBe('DIV');
        expect(result.style.backgroundColor || result.style.background).not.toBe('');
        expect(result.style.top).not.toBe('');
        expect(result.style.left).not.toBe('');
        expect(result.style.width).not.toBe('');
        expect(result.style.height).not.toBe('');
      });
    });
  });

  describe('Интеграционное тестирование', () => {
    it('на старнице должна быть кнопка с id addDiv', () => {
      addDivButton = homeworkContainer.querySelector('#addDiv');
      expect(addDivButton).toBeInstanceOf(Element);
      expect(addDivButton.tagName).toBe('BUTTON');
    });

    it('создавать div с классом draggable-div при клике на кнопку', () => {
      const divsCount = homeworkContainer.querySelectorAll('.draggable-div').length;

      addDivButton.dispatchEvent(new MouseEvent('click', { view: window }));
      const newDivsCount = homeworkContainer.querySelectorAll('.draggable-div').length;

      expect(newDivsCount - divsCount).toBe(1);
    });
  });
});
