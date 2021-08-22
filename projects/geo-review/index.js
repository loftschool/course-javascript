ymaps.ready(init);

let myMap;
let placeMarks = geoObjects = [];

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

// Получение  адрес на основании координат
function getAddressByCoords(coords) {
    return ymaps.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
        return firstGeoObject.getAddressLine();
    });
}

// Загрузить метки из Local Storage
function loadPlaceMarks() {
    const storageData = localStorage.getItem('placeMarks');
    if (storageData) {
        placeMarks = JSON.parse(storageData);
    }
}

// Сохранить метки в Local Storage
function savePlaceMarks() {
    localStorage.setItem('placeMarks', JSON.stringify(placeMarks));
}

// Добавить новую метку в базу
function addPlaceMark(placeMark) {
    let isFound = false;
    for (let position = 0; position < placeMarks.length; position++) {
        if (placeMark.latitude === placeMarks[position].latitude
            && placeMark.longitude === placeMarks[position].longitude) {
            placeMarks[position].reviews.push(placeMark.reviews[0]);
            isFound = true;
        }
    }

    if (!isFound) {
        placeMarks.push(placeMark);
    }

    savePlaceMarks();
}

// Подготовка геобъекта
function prepareGeoObject(placeMark) {
    const coords = [placeMark.latitude, placeMark.longitude];
    placeMark = new ymaps.Placemark(coords,
        {
            balloonContent: renderForm(placeMark.reviews)
        }
    );

    // Если в объекте сохранен адрес - берем его, иначе - получаем из координат
    if (placeMark.address) {
        placeMark.properties.set('balloonContentHeader', placeMark.address);
    } else {
        getAddressByCoords(coords).then((address) => {
            if (address) {
                placeMark.properties.set('balloonContentHeader', address);
            }
        });
    }

    return placeMark;
}

// Подписка на клики кнопки отправки формы
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('send__review')) {
        e.preventDefault();
        let openBalloon = myMap.balloon;
        if (openBalloon) {
            let coords, geometry;

            const geoObject = openBalloon.getData().geoObject;
            // Пытаемся получить координаты из геообъекта (при его наличии)
            if (geoObject) {
                geometry = geoObject.geometry;
            } else {
                geometry = openBalloon.geometry;
            }

            if (geometry) {
                coords = geometry._coordinates;
            } else {
                coords = openBalloon.getPosition();
            }

            let address = openBalloon._balloon.getData().contentHeader;
            if (address === undefined) {
                getAddressByCoords(coords).then((res) => {
                    address = res;
                })
            }

            const reviewAuthor = document.querySelector('#review-name').value;
            const reviewPlace = document.querySelector('#review-place').value;
            const reviewText = document.querySelector('#review-text').value;

            addPlaceMark({
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

            fetchMapObjects();
            openBalloon.close();
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

    loadPlaceMarks();
    fetchMapObjects();
}

function fetchMapObjects() {
    for (let i = 0; i < placeMarks.length; i++) {
        geoObjects[i] = prepareGeoObject(placeMarks[i]);
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
