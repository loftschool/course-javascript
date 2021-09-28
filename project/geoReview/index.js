let myMap, coords, balloon, clusterer;
if (!localStorage.places) localStorage.places = '';
ymaps.ready(init);
const form = [
    '<form id="feedback_form">',
    '<div"><h1 class="title">Отзыв:</h1></div>',
    '<div><input class="field" name="user_name" type="text" placeholder="Укажите ваше имя" size="40"></div>',
    '<div><input class="field" name="place" type="text" placeholder="Укажите место" size="40"></div>',
    '<div><textarea class="field" name="feedback" cols="40" rows="3" placeholder="Оставить отзыв"></textarea></div>',
    '<div><button class=button onclick="send()" type="button">Отправить</button></div>',
    '</form>'
];
const feedbackTemplate = Handlebars.compile([
    '<div class="review">',
    '<span><b>{{user_name}} </b></span>',
    '<span>{{place}} </span>',
    '<br>',
    '<span>{{feedback}}</span>',
    '</div>',
].join(''));

function init() {
    myMap = new ymaps.Map('map', {
        center: [56.828371, 60.624425],
        zoom: 12
    });
    balloon = myMap.balloon;

    if (localStorage.places) {
        const geoObjects = [];

        let places = JSON.parse(localStorage.places);
        for (const key in places) {
            if (places.hasOwnProperty(key)) {
                const balloonContent = [];
                places[key].forEach(place => {
                    balloonContent.push(feedbackTemplate(place));
                });
                balloonContent.push(...form);
                geoObjects.push(new ymaps.Placemark(
                    key.split('_'), { balloonContent: balloonContent.join('') }
                ));
            }
        }

        clusterer = new ymaps.Clusterer({
            clusterDisableClickZoom: true,
            openBalloonOnClick: false,
            gridSize: 120
        });

        clusterer.add(geoObjects);
        clusterer.events.add('click', async function(e) {
            coords = e.get('coords');
            const target = e.get('target');
            await balloon.open(coords, {
                contentBody: getFeedbacks(target)
            });
        });
        myMap.geoObjects.add(clusterer);
    }

    myMap.events.add('click', async function(e) {
        coords = e.get('coords');
        await balloon.open(coords, {
            contentBody: form.join('')
        });
    });
}


function send() {
    const myForm = document.forms.feedback_form;
    const formData = new FormData(myForm);
    const user_name = formData.get('user_name');
    const place = formData.get('place');
    const feedback = formData.get('feedback');
    const data = { user_name: user_name, place: place, feedback: feedback };
    const key = coords[0].toString() + '_' + coords[1].toString();

    let places;
    if (localStorage.places) {
        places = JSON.parse(localStorage.places);
    } else {
        places = {};
    }
    if (places[key]) {
        places[key].push(data);
    } else {
        places[key] = [];
        places[key].push(data);
    }
    localStorage.places = JSON.stringify(places);

    const placemark = new ymaps.Placemark(coords);
    clusterer.add(placemark);
    balloon.close();
}

function getFeedbacks(target) {
    const feedbacks = [];
    let places = JSON.parse(localStorage.places);
    if (target.hasOwnProperty('_clusterListeners')) {
        target.getGeoObjects().forEach(obj => {
            let objCoords = obj.geometry.getCoordinates();
            objCoords = objCoords.join('_');
            if (places.hasOwnProperty(objCoords)) {
                places[objCoords].forEach(fdb => {
                    feedbacks.push(feedbackTemplate(fdb));
                });
            }
        });
    } else {
        let objCoords = target.geometry.getCoordinates();
        objCoords = objCoords.join('_');
        if (places.hasOwnProperty(objCoords)) {
            places[objCoords].forEach(fdb => {
                feedbacks.push(feedbackTemplate(fdb));
            });
        }
    }
    feedbacks.push(...form);

    return feedbacks.join('');
}