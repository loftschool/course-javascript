import './yandex.html';
import { formTemplate } from './templates';

//Глобальная переменная для работы с кластером
let clusterer;

document.addEventListener('DOMContentLoaded', () => {
  ymaps.ready(init);
  function init() {
    const myMap = new ymaps.Map('map', {
      center: [55.76, 37.64],
      controls: ['zoomControl'],
      zoom: 12,
    });

    myMap.events.add('click', async function (e) {
      const coords = e.get('coords');
      openBalloon(myMap, coords, []);
    });

    clusterer = new ymaps.Clusterer({ clusterDisableClickZoom: true });
    clusterer.options.set('hasBalloon', false);

    getGeoObjects(myMap);
    clusterer.events.add('click', function (e) {
      //Получаем текущие плейсмарки (они же геообъекты) в кластере по которому кликнули в зависимости от зума
      let geoObjectsInCluster = e.get('target').getGeoObjects();
      openBalloon(myMap, e.get('coords'), geoObjectsInCluster);
    });
  }
});

function getReviewList(currentGeoObjects) {
  let reviewListHTML = '';

  for (const review of getReviewsFromLS()) {
    //В условии пробегаемся по текущим геобъектам и там где найдено соответвие координат геообъекта и отзыва, то отрисовываем отзыв
    //Вспоминаем работу метода массива some
    if (
      currentGeoObjects.some(
        (geoObject) =>
          JSON.stringify(geoObject.geometry._coordinates) ===
          JSON.stringify(review.coords)
      )
    ) {
      reviewListHTML += `
        <div class="review">
          <div><strong>Место: </strong>${review.place}</div>
          <div><strong>Имя: </strong>${review.author}</div>
          <div><strong>Отзыв: </strong>${review.reviewText}</div>
        </div>  
      `;
    }
  }
  return reviewListHTML;
}

function getReviewsFromLS() {
  const reviews = localStorage.reviews;
  return JSON.parse(reviews || '[]');
}

function getGeoObjects(map) {
  const geoObjects = [];
  for (const review of getReviewsFromLS() || []) {
    const placemark = new ymaps.Placemark(review.coords);
    placemark.events.add('click', (e) => {
      e.stopPropagation();
      //В e.get('target') получим 1 геообъект содержащийся в плейсмаркете и поместим его в массив
      openBalloon(map, e.get('coords'), [e.get('target')]);
    });
    geoObjects.push(placemark);
  }

  clusterer.removeAll();
  map.geoObjects.remove(clusterer);
  clusterer.add(geoObjects);
  map.geoObjects.add(clusterer);
}

async function openBalloon(map, coords, currentGeoObjects) {
  await map.balloon.open(coords, {
    content:
      `<div class="reviews">${getReviewList(currentGeoObjects)}</div>` + formTemplate,
  });
  document.querySelector('#add-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const review = {
      coords,
      author: this.elements.author.value,
      place: this.elements.place.value,
      reviewText: this.elements.review.value,
    };

    //Записываем в ЛС новый отзыв
    localStorage.reviews = JSON.stringify([...getReviewsFromLS(), review]);

    //на основании нового значения в ЛС отрисовываем метки
    getGeoObjects(map);

    map.balloon.close();
  });
}
