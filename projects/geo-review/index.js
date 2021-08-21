ymaps.ready(init);

const placemarks = [
        {
            latitude: 59.97,
            longitude: 30.31,
            reviews: [
                {
                    name: 'Сергей',
                    placeName: 'Кафе',
                    reviewDate: '12.01.2020',
                    reviewText: 'Очень хорошее место!'
                }
            ]
        },
        {
            latitude: 59.94,
            longitude: 30.25,
            reviews: [
                {
                    name: 'Дима',
                    placeName: 'Пятерочка',
                    reviewDate: '31.12.2020',
                    reviewText: 'Вкусное шампанское!'
                }
            ]
        },
        {
            latitude: 59.93,
            longitude: 30.34,
        }
    ],
    geoObjects = [];

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
    return ymaps.geocode(coords).then((res) => {
        let firstGeoObject = res.geoObjects.get(0);
        return firstGeoObject.getAddressLine();
    });
}

// Подготовка геобъекта
function prepareGeoObject(placemark) {
    const coords = [placemark.latitude, placemark.longitude];
    return new ymaps.Placemark(coords,
        {
            // todo: добавлять заголовок с адресом
            // balloonContentHeader: getAddressByCoords(coords),
            balloonContent: renderForm(placemark.reviews)
        }
    );
}

function init() {
    const map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
    });

    for (let i = 0; i < placemarks.length; i++) {
        geoObjects[i] = prepareGeoObject(placemarks[i]);
    }

    // Кластеризация
    const clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);

    // todo: вывод агрегированного
    clusterer.events.add('balloonopen', function (e) {
        // todo: агрегация отзывов для реденра
        const reviews = [];
        clusterer.balloonContent = renderForm(reviews)
    });

    // Событие клика по карте
    map.events.add('click', function (e) {
        if (!map.balloon.isOpen()) {
            const coords = e.get('coords');
            ymaps.geocode(coords).then(function (res) {
                const firstGeoObject = res.geoObjects.get(0);
                map.balloon.open(coords, {
                    contentHeader: firstGeoObject.getAddressLine(),
                    contentBody: renderForm()
                })
            });
        } else {
            map.balloon.close();
        }
    });

    // Событие клика по балуну
    /*
    map.events.add('balloonopen', function (e) {
        // Получаем координаты открытого банула
        const balloon = e.originalEvent.currentTarget.balloon;
        const coords = balloon.getPosition();
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            balloon.balloonContentHeader = firstGeoObject.getAddressLine();
        });
    });
    */
}
