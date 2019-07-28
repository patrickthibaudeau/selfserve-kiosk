$(document).ready(function () {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    //Remove some height so that it fits on all screens
    vh = vh - 0.7;
// Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    //Get place to set marker
    var apiKey = 'a8885f6549b6e6574753f4b1745077de';
    var venueId = '5d249b06c2beab001657417b';
    var organizationId = '5d249b06c2beab001657417b';
    var queryStrings = getUrlVars();
    var place = queryStrings['place'];
    var placeObject = '';
    var placeArray = place.split('_');
    var room = '';
    var floor = 1;
    var venueObject = '';

    switch (placeArray[0]) {
        case 'YH':
            room = 'York Hall ' + placeArray[1];
            break;
        case 'GH':
            room = 'Glendon Hall ' + placeArray[1];
            break;
    }

    Mapwize.apiKey(apiKey);
    Mapwize.Api.getPlaces({organizationId: venueId, search: room}).then((places) => {
        // places contain all places you can access
        Mapwize.Api.getPlace(places[0]['_id']).then(place => {
            console.log(place);
            placeObject = place;
            floor = place['floor'];
            venueObject = place['venue'];
            console.log('Floor: ' + floor);
        });
        console.log(places);
    });

    //Display Directions
    Mapwize.Api.getDirection({
        from: {},
        to: {},
        waypoints: [],
        options: {}
    }).then(direction => map.setDirection(direction));



    Mapwize.map({
        container: 'mapwize',
        maxBounds: [[-79.382100, 43.725437], [-79.374096, 43.731562]],

    }).then(map => {
        var userPosition = map.getUserPosition();
        console.log('User position: ' + userPosition);
        var thisFloor = map.getFloor();
        console.log('This floor: ' + thisFloor);
        map.setFloor(parseInt(floor));
        if (place) {

            map.addMarkerOnPlace(placeObject).then(marker => {

            }).catch(err => {
                console.log(err);
            });
        }
        
        

    }).catch(err => {
        // Something bad happened during Mapwize loading
        console.error(err);
    });

});
