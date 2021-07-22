// ymaps.ready(init);

// var placemarks = [
// 	{
// 		latitude: 59.93,
// 		longitude: 30.34,
// 		hintContent: '<div class="map__hint">наб. реки Фонтанки, д. 56</div>',
// 		balloonContent: [
// 			'<div class="map__balloon">',
// 			'<p class="map__title">Отзыв</p>',
// 			'<div class="map__form">',
// 			'<input class="map__input" type="text" placeholder="Укажите ваше имя">',
// 			'<input class="map__input" type="text" placeholder="Укажите место">',
// 			'<input class="map__input map__input_review" placeholder="Оставить отзыв" type="text">',
// 			'</div>',
// 			'<button class="map__button">Добавить</button>',
// 			'</div>'
// 		]
// 	}
// ],
// 	geoObjects = [];

// function init() {
// 	var map = new ymaps.Map('map', {
// 		center: [59.94, 30.32],
// 		zoom: 16,
// 		controls: ['zoomControl'],
// 		behaviors: ['drag']
// 	});

// 	for (var i = 0; i < placemarks.length; i++) {
// 		geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
// 			{
// 				hintContent: placemarks[i].hintContent,
// 				balloonContent: placemarks[i].balloonContent.join('')
// 			},
// 			{
// 				iconLayout: 'default#image',
// 				iconImageHref: 'img/sprite_1.png',
// 				iconImageSize: [40, 40],
// 				iconImageOffset: [-23, -57]
// 			});
// 	}

// 	var clusterer = new ymaps.Clusterer({
// 		clusterIcons: [
// 			{
// 				href: 'img/burger.png',
// 				size: [100, 100],
// 				offset: [-50, -50]
// 			}
// 		],
// 		clusterIconContentLayout: null
// 	});

// 	map.geoObjects.add(clusterer);
// 	clusterer.add(geoObjects);
// }

import './index.html';
import GeoReview from './geoReview';

new GeoReview();
