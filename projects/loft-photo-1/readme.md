## Массивы и объекты

Реализуйте объект с двумя методами:

- `getRandomElement(array)`
- `getNextPhoto()`

### `getRandomElement(array)`

Метод принимает массив в параметре `array` и должен вернуть **случайный** элемент из этого масства при каждом вызове.

Например:

```js
const fruits = ['банан', 'яблоко', 'груша'];

console.log(getRandomElement(fruits)); // груша
console.log(getRandomElement(fruits)); // банан
console.log(getRandomElement(fruits)); // банан
```

Для получения случайного числа может пригодиться метод [Math.random()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random). Этот метод возвращает случайное число между 0 и 1 (например 0.548)

Вот так можно получить число от 0 до 10 (например):

```js
console.log(Math.random() * 10); // 5.754356
console.log(Math.random() * 10); // 2.12864
```

А при помощи [parseInt](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/parseInt) можно убрать дробную часть:

```js
console.log(parseInt(Math.random() * 10)); // 8
console.log(parseInt(Math.random() * 10)); // 3
```

### `getNextPhoto()`

При каждом вызове метод должен вернуть информацию со случайным другом и случайной его фотографией.

Информация должна быть возвращена в виде объекта из двух полей:  `friend` и `url`.

Например:

```js
let photo = getNextPhoto();

console.log(photo.friend); // { firstName: 'Иван' }
console.log(photo.url); // https://...

photo = getNextPhoto();

console.log(photo.friend); // { firstName: 'Сергей' }
console.log(photo.url); // https://...
```

Пример списка друзей и фотографий можно найти в файлах [friends.json](friends.json) и [photos.json](photos.json).

В файле [friends.json](friends.json) хранится массив со списком друзей. У каждого друга есть имя, фамилия и идентификатор.

В файле [photos.json](photos.json) хранится объект, ключами которого являются идентификаторы друзей, а значениями - массив фотографий этого друга.
У каждой фотографии есть идентификатор и url.

Вот так, например, можно получить все фотографии друга с идентификатором `1`:

```js
const photosDB = require('./photos.json');

console.log(photosDB[1]) // [ ... ]
```
