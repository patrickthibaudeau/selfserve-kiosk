$(document).ready(function () {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    //Remove some height so that it fits on all screens
    vh = vh - 0.7;
// Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    //Get place to set marker
    var apiKey = 'a8885f6549b6e6574753f4b1745077de';
    var organizationId = '5d249b06c2beab001657417b';
    var venueId = '5d30d8596d56440016c66cbd';
    var queryStrings = getUrlVars();
    var place = queryStrings['place'];
    var placeObject = '';
    var placeArray = '';
    var room = '';
    var floor = 1; //Default
    var venueObject = '';

    /**
     * If there is a value fro place
     */
    if (place) {
        //Split to make array. Required because system only sends acronyme
        //BUt mapwize needs full name
        placeArray = place.split('_');
        //Add fullname to room number
        switch (placeArray[0]) {
            case 'YH':
                room = 'York Hall ' + placeArray[1];
                break;
            case 'GH':
                room = 'Glendon Hall ' + placeArray[1];
                break;
        }

        Mapwize.apiKey(apiKey);
        //Search for the room
        Mapwize.Api.getPlaces({organizationId: organizationId, search: room}).then((places) => {
            //Get place object and set floor.
            if (places.length != 0) {
                console.log
                Mapwize.Api.getPlace(places[0]['_id']).then(place => {
                    placeObject = place;
                    floor = place['floor'];
                    venueObject = place['venue'];
                }).catch(err => {
                    console.error(err);
                    place = '';
                });
            } else {
                // If no room was found, set place to false.
                // This will avoid an error while loading the map
                place = false;
            }
        });
    }

    /**
     * Initiate the map
     */
    MapwizeUI.map({
        container: 'mapwize',
        apiKey: apiKey,

        mapwizeOptions: {
//            bounds: [[-79.382100, 43.725437], [-79.374096, 43.731562]],
            userPosition: true,
        },
    }).then(map => {
        var thisFloor = map.getFloor();
        map.setFloor(parseInt(floor));
        if (place) {
            map.addMarkerOnPlace(placeObject).then(marker => {
            }).catch(err => {
                console.log(err);
            });
            map.centerOnPlace(placeObject);
        } else {
            map.centerOnVenue(venueId);
        }
    }).catch(err => {
        // Something bad happened during Mapwize loading
        console.error(err);
    });

});
