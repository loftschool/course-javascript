ymaps.ready(init);

const data = new Map();
let globalCoords;

function createPlaceMark(myMap, clusterer, BalloonContentLayout) {
  const placemark = new ymaps.Placemark(
    globalCoords,
    {
      reviews: getBalloonReviews(data.get(globalCoords.join('-'))),
    },
    {
      balloonContentLayout: BalloonContentLayout,
      balloonPanelMaxMapArea: 0,
    }
  );
  placemark.events.add('click', () => (globalCoords = placemark.geometry.getCoordinates()));
  clusterer.add(placemark);
  myMap.geoObjects.add(placemark);
}
const getBalloonContent = () => {
  return `<div class="balloon__header">
            <h3>Отзыв:</h3>
          </div>
          <div class="balloon__form">
            <form action="#">
              <input type="text" name="name" id="name" placeholder="Укажите ваше имя" required>
              <input type="text" name="place" id="place" placeholder="Укажите место" required>
              <textarea name="text" id="text" cols="42" rows="6" placeholder="Оставить отзыв" required></textarea>
              <button type="submit" id="submitBtn">Добавить</button>
            </form>
          </div>`;
};

function getReview(name, place, text) {
  return `
  <div class="balloon__review review">
    <span class="review__name">${name}</span>
    <span class="review__place">${place}</span>
    <p class="review__text">${text}</p>
  </div>
  `;
}

const getBalloonReviews = (reviews) => {
  if (reviews) {
    let result = '';
    reviews.forEach((review) => {
      result += getReview(review.name, review.place, review.text);
    });
    return result;
  } else {
    return '';
  }
};

function addReview(coords, name, place, text) {
  const id = coords.join('-');
  if (data.has(id)) {
    const reviews = data.get(id);
    reviews.push({ name: name, place: place, text: text });
    data.set(id, reviews);
  } else {
    data.set(id, [{ name: name, place: place, text: text }]);
  }
  saveReviews();
}
function loadDataFromLocalStorage() {
  const keys = Object.keys(localStorage);
  for (const key of keys) {
    if (data.has(key)) {
      const reviews = data.get(key);
      data.set(key, reviews.push(JSON.parse(localStorage.getItem(key))));
    } else {
      const reviews = JSON.parse(localStorage.getItem(key));
      data.set(key, reviews);
    }
  }
}
function saveReviews() {
  localStorage.clear();
  data.forEach((value, key) => {
    localStorage[key] = JSON.stringify(data.get(key));
  });
}
function loadPoints(myMap, clusterer, balloonLayout) {
  data.forEach((value, key) => {
    const stringCoords = key.split('-');
    const coords = [+stringCoords[0], +stringCoords[1]];
    const placemark = new ymaps.Placemark(
      coords,
      {
        reviews: getBalloonReviews(data.get(key)),
      },
      {
        balloonContentLayout: balloonLayout,
        balloonPanelMaxMapArea: 0,
      }
    );
    placemark.events.add(
      'click',
      () => (globalCoords = placemark.geometry.getCoordinates())
    );
    myMap.geoObjects.add(placemark);
    clusterer.add(placemark);
  });
}

function init() {
  const myMap = new ymaps.Map(
    'app',
    {
      center: [31.221124, 121.487644],
      zoom: 13,
      behaviors: ['drag'],
    },
    {
      balloonMaxHeight: 750,
    }
  );
  const clusterer = new ymaps.Clusterer({
    hasBalloon: false,
    maxZoom: 12,
  });
  myMap.geoObjects.add(clusterer);
  loadDataFromLocalStorage();
  const BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
    '<div class="balloon__reviews">' +
      '{{properties.reviews|raw}}' +
      '</div>' +
      getBalloonContent(),
    {
      build: function () {
        BalloonContentLayout.superclass.build.call(this);
        document
          .querySelector('.balloon__form form')
          .addEventListener('submit', onFormSubmit);
      },
      clear: function () {
        document
          .querySelector('.balloon__form form')
          .removeEventListener('submit', onFormSubmit);
        BalloonContentLayout.superclass.clear.call(this);
      },
    }
  );
  loadPoints(myMap, clusterer, BalloonContentLayout);
  function onFormSubmit(event) {
    event.preventDefault();
    clusterer.removeAll();
    const name = this.querySelector('#name').value;
    const place = this.querySelector('#place').value;
    const text = this.querySelector('#text').value;
    addReview(globalCoords, name, place, text);
    loadPoints(myMap, clusterer, BalloonContentLayout);
    this.reset();
    globalCoords = '';
    myMap.balloon.close();
  }
  myMap.events.add('click', function (e) {
    globalCoords = e.get('coords');
    if (!myMap.balloon.isOpen()) {
      myMap.balloon.open(
        globalCoords,
        {},
        {
          contentLayout: BalloonContentLayout,
        }
      );
    } else {
      myMap.balloon.close();
    }
  });
}
