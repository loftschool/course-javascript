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
// 			ymapsScript.src = '';
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
// 			center: [59.94, 30.32],
// 			zoom: 16,
// 		});
// 		this.map.events.add('click', (e)=> this.onClick(e.get('coords')));
// 		this.map.geoObjects.add(this.clusterer);
// 	}
// }
