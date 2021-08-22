ymaps.ready(init);
let myMap, openBalloon;
const placemarks = [], geoObjects = [];

// Рендер формы добавления отзывов
const balloonTemplate = document.querySelector('#balloon_template').textContent
const balloonRender = Handlebars.compile(balloonTemplate);

function renderForm(reviews) {
    let renderObj = {};
    if (Array.isArray(reviews)) {
        renderObj = {reviews: reviews};
    }

    return balloonRender(renderObj);
}

// Получить адрес на основании координат
function getAddressByCoords(coords) {
    if (!coords) {
        debugger;
    }
    return ymaps.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
        return firstGeoObject.getAddressLine();
    });
}

// Подготовка геобъекта
function prepareGeoObject(placemark) {
    const coords = [placemark.latitude, placemark.longitude];
    placemark = new ymaps.Placemark(coords,
        {
            balloonContent: renderForm(placemark.reviews)
        }
    );

    // Если в объекте сохранен адрес - берем его, иначе - получаем из координат
    if (placemark.address) {
        placemark.properties.set('balloonContentHeader', placemark.address);
    } else {
        getAddressByCoords(coords).then((address) => {
            if (address) {
                placemark.properties.set('balloonContentHeader', address);
            }
        });
    }

    return placemark;
}

// Подписка на клики кнопки отправки формы
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('send__review')) {
        e.preventDefault();
        if (openBalloon) {
            const coords = openBalloon.getPosition();
            let address = openBalloon._balloon.getData().contentHeader;
            if (address === undefined) {
                getAddressByCoords().then((res) => {
                    address = res;
                })
            }

            const reviewAuthor = document.querySelector('#review-text').value;
            const reviewPlace = document.querySelector('#review-place').value;
            const reviewText = document.querySelector('#review-name').value;

            // todo: сохранять объект
            placemarks.push({
                address: address,
                latitude: coords[0],
                longitude: coords[1],
                reviews: [
                    {
                        name: reviewAuthor,
                        placeName: reviewPlace,
                        reviewDate: new Date().toISOString().slice(0, 10),
                        reviewText: reviewText
                    }
                ]
            });

            openBalloon.close();
            fetchMapObjects();
        }
    }
});

function init() {
    myMap = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        balloonMinWidth: 310,
    });

    // Событие клика по карте
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            const coords = e.get('coords');
            getAddressByCoords(coords).then((address) => {
                myMap.balloon.open(coords, {
                    contentHeader: address,
                    contentBody: renderForm()
                })
            });
        } else {
            myMap.balloon.close();
        }
    });

    // Сохраняем контекст открытого балуна
    myMap.events.add('balloonopen', function (e) {
        openBalloon = e.originalEvent.currentTarget.balloon;
    });

    // Удаляем контекст открытого балуна
    myMap.events.add('balloonclose', function (e) {
        openBalloon = null;
    });

    fetchMapObjects();
}

function fetchMapObjects() {
    for (let i = 0; i < placemarks.length; i++) {
        geoObjects[i] = prepareGeoObject(placemarks[i]);
    }

    // Кластеризация
    const clusterer = new ymaps.Clusterer({
        clusterBalloonContentLayoutWidth: 300,
        clusterBalloonContentLayoutHeight: 440,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
    });

    myMap.geoObjects.removeAll();
    myMap.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
}
