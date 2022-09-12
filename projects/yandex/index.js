/* eslint-disable no-undef */
import { formTemplate } from './templates';
import './yandex.html';
import './main.css';

let clusterer;
document.addEventListener('DOMContentLoaded', () => ymaps.ready(init));

function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.76, 37.64],
    controls: ['zoomControl'],
    zoom: 12,
  });

  myMap.events.add('click', function (e) {
    const coords = e.get('coords');
    opernBalloon(myMap, coords, []);
  });

  clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: true,
  });

  clusterer.options.set('hasBalloon', false);

  renderGeoObjects(myMap);

  clusterer.events.add('click', function (e) {
    const geoObjectInCluster = e.get('target').getGeoObjects();
    opernBalloon(myMap, e.get('coords'), geoObjectInCluster);
  });
}

function getReviewsFromLS() {
  const reviews = localStorage.reviews;
  return JSON.parse(reviews || '[]');
}

function getReviewList(currentGeoObjects) {
  let reviewListHTML = '';

  for (const review of getReviewsFromLS()) {
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

function renderGeoObjects(map) {
  const geoObjects = [];
  for (const review of getReviewsFromLS()) {
    const placemark = new ymaps.Placemark(review.coords);
    placemark.events.add('click', (e) => {
      e.stopPropagation();
      opernBalloon(map, e.get('coords'), [e.get('target')]);
    });
    geoObjects.push(placemark);
  }

  clusterer.removeAll();
  map.geoObjects.remove(clusterer);
  clusterer.add(geoObjects);
  map.geoObjects.add(clusterer);
}

async function opernBalloon(map, coords, currentGeoObjects) {
  await map.balloon.open(coords, {
    content:
      `<div class="
      ">${getReviewList(currentGeoObjects)}</div>` + formTemplate,
  });

  document.querySelector('#add-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const review = {
      coords,
      author: this.elements.author.value,
      place: this.elements.place.value,
      reviewText: this.elements.review.value,
    };

    localStorage.reviews = JSON.stringify([...getReviewsFromLS(), review]);

    renderGeoObjects(map);

    map.balloon.close();
  });
}
