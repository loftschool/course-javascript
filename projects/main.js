let myMap, coords, balloon, clusterer;
if (!localStorage.places) localStorage.places = '';

const form = [
    '<form id="feedback_form">',
    '<p><b>Отзыв:</b></p>',
    '<p><input name="user_name" type="text" placeholder="Укажите ваше имя" size="40"></p>',
    '<p><input name="place" type="text" placeholder="Укажите место" size="40"></p>',
    '<p><textarea name="feedback" cols="40" rows="3" placeholder="Оставить отзыв"></textarea></p>',
    '<p><button onclick="send()" type="button">Отправить</button></p>',
    '</form>'
];
const feedbackTemplate = Handlebars.compile([
    '<div>',
    '<span><b>{{user_name}} </b></span>',
    '<span>{{place}} </span>',
    '<span>{{date}}</span>',
    '<br>',
    '<span>{{feedback}}</span>',
    '</div>',
].join(''));

const init = () => {
    myMap = new ymaps.Map('map', {
        center: [43.23703366, 76.94422158],
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
                    key.split('_'),
                    {balloonContent:balloonContent.join('')}
                ));
            }
        }

        clusterer = new ymaps.Clusterer({
            clusterDisableClickZoom: true,
            openBalloonOnClick: false,
            gridSize: 128
        });

        clusterer.add(geoObjects);
        clusterer.events.add('click', async function (e) {
            coords = e.get('coords');
            const target = e.get('target');
            await balloon.open(coords, {
                contentBody: getFeedbacks(target)
            });
        });
        myMap.geoObjects.add(clusterer);
    }

    myMap.events.add('click', async function (e) {
        coords = e.get('coords');
        await balloon.open(coords, {
            contentBody: form.join('')
        });
    });
}

ymaps.ready(init);


function send() {
    const myForm = document.forms.feedback_form;
    const formData = new FormData(myForm);
    const user_name = formData.get('user_name');
    const place = formData.get('place');
    const feedback = formData.get('feedback');
    const data = {date:getCurrentDate(), user_name:user_name, place:place, feedback:feedback};
    const key = coords[0].toString() + '_' +  coords[1].toString();

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

function getFeedbacks(target){
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

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return day + '.' + month + '.' + year;
}