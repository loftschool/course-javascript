/* ДЗ 5 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунд

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */

function delayPromise(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
  return new Promise((resolve, reject) => {
    const getContent = new XMLHttpRequest();
    getContent.open(
      'GET',
      'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json',
      true
    );
    getContent.responseType = 'json';
    getContent.send();

    getContent.onload = () => {
      console.log('Похоже, что ок');
      const allTowns = getContent.response;
      allTowns.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      resolve(allTowns);
    };

    getContent.onerror = () => {
      console.error('Не похоже, что ок');
      reject();
    };
  });
}

export { delayPromise, loadAndSortTowns };
