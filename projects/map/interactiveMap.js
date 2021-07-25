// export default class InteractiveMap {
// 	constructor(mapId, onClick) {
// 		this.mapId = mapId;
// 		this.onClick = onClick;
// 	}

// 	async init() {
// 		await this.injectYMapsScript();
// 		await this.loadMaps();
// 		this.initMap();
// 	}

// 	injectYMapsScript() {
// 		return new Promise((resolve) => {
// 			const ymapsScript = document.createElement('script');
// 			ymapsScript.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A09447cb03fd58a9e0f898fdd30ae0c6d2427a90aa58112d64b56531a251290e2&amp;min-width=288&amp;min-height=216&amp;lang=ru_RU&amp;scroll=true';
// 			document.body.appendChild(yamapsScript);
// 			yamapsScript.addEventListener('load', resolve);
// 		});
// 	}

// 	loadYMaps() {
// 		return new Promise((resolve) => ymaps.ready(resolve));
// 	}

// 	initMap() {
// 		this.clusterer = new ymaps.Clusterer({
// 			groupByCoordinates: true,
// 			clusterDisableClickZoom: true,
// 			clusterOpenBalloonOnClick: false,
// 		});
// 		this.clusterer.events.add('click', (e) => {
// 			const coords = e.get('target').geometry.getCoordinates();
// 			this.onClick(coords);
// 		});
// 		this.map = new ymaps.Map(this.mapId, {
// 			center: [55.75, 37.57],
// 			zoom: 16,
// 		});
// 		this.map.events.add('click', (e) => this.onClick(e.get('coords')));
// 		this.map.geoObjects.add(this.clusterer);
// 	}
// }
