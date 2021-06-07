export default class MainWindow {
  constructor(element) {
    this.element = element;
  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }
}
