import './index.html';

let map;
let storage = localStorage;
let arr = [];
const templateReviews = `<ul class="left-reviews"><li class="left-review"><div class="left-review__title"><span class="left-review__author">{{name}}</span><span class="left-review__place">{{place}}</span><span class="left-review__date">{{date}}</span></div><div class="left-review__text">{{review}}</div></li></ul>`;
const templateForm = `<form class="review" id="review"><div class="review__heading">Отзыв:</div><div class="review__inputs"><input class="review__input input--name" name="name" type="text" placeholder="Укажите ваше имя"><input class="review__input input--place" name="place" type="text" placeholder="Укажите место"><input class="review__input input--review" name="review" type="textarea" placeholder="Оставить отзыв"></div><button class="review__btn" type="submit">Добавить</button></form>`;

function init() {
  map = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 11
  });
  placemark = '';

  map.events.add('click', (map_e) => {
    let coords = map_e.get('coords');
    map.balloon.events.add('open', (ballon_e) => {
      balloonOpenHandler(ballon_e);
    });
    map.balloon.open(coords, {content: templateForm});
  });
  map.behaviors.disable('scrollZoom');
};

function balloonOpenHandler(event) {
  let form = document.querySelector('.review');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newReview = submitForm(form);

    if (event.get("target")["geometry"]) {
      event.get("target")["properties"].set("balloonContent", `${newReview} <hr> ${templateForm}`);

    } else {
      createPlacemark(event.originalEvent.target.balloon.getPosition(), newReview);
    }
  });
}

function submitForm(form) {
  let input = {
    name: form.elements.name,
    place: form.elements.place,
    review: form.elements.review
  }

  if (validateForm(input)) {
    inputCheck();

    saveData(form, input);

    arr.push(input);
    let newReview = fillTemplate(templateReviews, '\{\{[^\s}]*\}\}', arr);

    map.balloon.close();

    return newReview;
  }
}

function createPlacemark(coords, review) {
  placemark = new ymaps.Placemark(coords, {balloonContent: `${review} <hr> ${templateForm}`});
  map.geoObjects.add(placemark);
}

function saveData(input) {
  let json = {};

  for (const key in input) {
    json[key] = input[key]; 
  }

  storage.data = JSON.stringify(json);
}

function inputCheck() {
  document.addEventListener('keydown', function(e) {
    if (e.target === document.querySelector('.input--name')) {
      let isDigit = false;

      if (e.key >=0 || e.key <=9) {
        isDigit = true;
      }

      if (isDigit === true) {
        e.preventDefault();
      }
    }
  });
}

function validateForm(input) {
  let isValid = true

  for (const key in input) {
    if (Object.hasOwnProperty.call(input, key)) {
      const element = input[key];

      const valid = validateField(element);
      if (!valid) {
        isValid = false;
      }
    }
  }

  function validateField(field) {
    if (!field.value.trim().length) {
      field.classList.add('review__input--error');
      return false;
    } else {
      field.classList.remove('review__input--error');
      return true;
    }
  };
  return isValid;
};

function fillTemplate(template, regex, array) {
  let html = '';

  array.forEach(obj => {
    let buf = template;
    let matches = []
    for (match of buf.matchAll(regex)) {
      matches.push(match[0])
    }
    matches.forEach(match => {
      let key = match.substring(2, match.length - 2);
      buf = buf.replace(match, obj[key] ? obj[key].value : "");
    });
    html += buf;
  });

  return html;
}

ymaps.ready(init);
