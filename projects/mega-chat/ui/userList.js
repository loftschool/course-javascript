export default class UserList {
  constructor(element) {
    this.element = element; // хранится ссыл ка на дом-элемент, с которым будут производиться манипуляции
    this.items = new Set(); // уникальный список, в котором храним пользователей (когда кто-то входит: add и наоборот)
  }

  buildDOM() {
    const fragment = document.createDocumentFragment(); // для того, чтобы добавлять сразу несколько элементов (позволяет
    // манипулировать множеством элементов, как одним)

    this.element.innerHTML = ''; // список из имен пользователей this.items = new Set() - превращаем в дом-дерево

    for (const name of this.items) {
      const element = document.createElement('div'); // для каждого элемента списка, создаем див
      element.classList.add('user-list-item');
      element.textContent = name; // наполняем его текстовым содержимым
      fragment.append(element); // и добавляем на страницу, в наш список
    }

    this.element.append(fragment);
  }

  add(name) {
    this.items.add(name); // добавляем элемент в список items, когда кто-то заходит
    this.buildDOM();
  }

  remove(name) {
    this.items.delete(name); // удаляем, когда кто-то выходит
    this.buildDOM();
  }
}
