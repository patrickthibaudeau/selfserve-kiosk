$(document).ready(function () {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    //Remove some height so that it fits on all screens
    vh = vh - 0.7;
// Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    MapwizeUI.map({
        container: 'mapwize',
        apiKey: 'a8885f6549b6e6574753f4b1745077de',
        centerOnVenue: '5d30d8596d56440016c66cbd',
        restrictContentToOrganization: '5d249b06c2beab001657417b',
        maxBounds: [[43.725599, -79.381904],[43.731278, -79.375017]],
        minZoom: 21,
        center: [43.727452, -79.378655],
        floorControl: true,
        userPosition: true,
    }).then(map => {
        var mobile = isMobile();
        var useJsKeyboard = $('#useJsKeyboard').val();

//    Only make the Keyboard work on none mobile devices
        if (mobile == false && useJsKeyboard == true) {
            $('input').keyboard({
                usePreview: false,
                autoAccept: true,
                autoAcceptOnEsc: true
            })
                    // activate the typing extension
                    .addTyping({
                        showTyping: true,
                        delay: 250
                    });
        }
    }).catch(err => {
        // Something bad happened during Mapwize loading
        console.error(err);
    });

});
