var path = window.location.pathname;

if (!isPublicKiosk()) {
    let deferredPrompt;
    const addBtn = document.querySelector('.add-button');
    addBtn.style.display = 'none';

    window.addEventListener('beforeinstallprompt', (e) => {
        alert('Before install prompt');
        console.log(e);
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        addBtn.style.display = 'block';

        addBtn.addEventListener('click', (e) => {
            // hide our user interface that shows our A2HS button
            addBtn.style.display = 'none';
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    });
}

if (isPublicKiosk()) {
    //Return Kiosk to home page on idle
    if (path != '/kiosk/') {
        console.log('idle time started');
        idleTime();
    }
    //Show alert if logged in to PPY 

    setInterval(function () {
        var cookie = cookieExists('pyauth');
        if (cookie) {
            $('#loginWarning').show();
        } else {
            $('#loginWarning').hide();
        }
    }, 50);

}

$(document).ready(function () {

    if (isMobile()) {
        document.body.requestFullscreen();
    }

    $('#loginWarning').hide();

    $('#password').click(function () {

        var strWindowFeatures = "location=no,height=570,width=520,scrollbars=yes,status=no";
        var URL = "https://mms.yorku.ca";
        var win = window.open(URL, "_blank", strWindowFeatures);
    });


});

function isMobile() {
    try {
        if (/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        }
        ;
        return false;
    } catch (e) {
        console.log("Error in isMobile");
        return false;
    }
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function isPublicKiosk() {
    var public = $('#isPublic').val();
    return public;
}


function rtrim(str, charlist) {
    //  discuss at: http://locutus.io/php/rtrim/
    // original by: Kevin van Zonneveld (http://kvz.io)
    //    input by: Erkekjetter
    //    input by: rem
    // improved by: Kevin van Zonneveld (http://kvz.io)
    // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //   example 1: rtrim('    Kevin van Zonneveld    ')
    //   returns 1: '    Kevin van Zonneveld'

    charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
            .replace(/([[\]().?/*{}+$^:])/g, '\\$1')

    var re = new RegExp('[' + charlist + ']+$', 'g')

    return (str + '').replace(re, '')
}

//Return the current page name
function getPageName() {
    var name = document.title;
    return name;
}

//CURRENT DATE-------------------------------------------------
function getCurrentDate() {
    var now = new Date();
    var monthEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthFr = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var dayEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayFr = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    var day = ("0" + now.getDate()).slice(-2);
    var year = now.getFullYear();
    var dayName = '';
    var currentDate = '';
    if ($('#lang').val() == 'en') {
        dayName = dayEn[now.getDay()];
        currentDate = monthEn[now.getMonth()] + day + ', ' + year;
    } else {
        dayName = dayFr[now.getDay()];
        currentDate = day + ' ' + monthFr[now.getMonth()] + ', ' + year;
    }
    $('#dayName').html(dayName);
    $('#currentDate').html(currentDate);
}

function getDateInfo(date) {
    var now = new Date(date);
    var monthEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthFr = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var dayEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayFr = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    var day = ("0" + now.getDate()).slice(-2);
    var year = now.getFullYear();
    var dayNameEn = dayEn[now.getDay()];
    var currentDateEn = monthEn[now.getMonth()] + day + ', ' + year;
    var dayNameFr = dayFr[now.getDay()];
    var currentDateFr = day + ' ' + monthFr[now.getMonth()] + ', ' + year;
    var timeFr = now.getHours() + 'h' + now.getMinutes();
    var timeEn = now.getHours() + ':' + now.getMinutes();

    var dateTime = {
        day: day,
        year: year,
        dayNameEn: dayNameEn,
        currentDateEn: currentDateEn,
        dayNameFr: dayNameFr,
        currentDateFr: currentDateFr,
        timeFr: timeFr,
        timeEn: timeEn,
    }

    return dateTime;

}

//Taken from https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

/**
 * 
 * @returns string
 */
function getLanguage() {
    var queryString = getUrlVars();
    var lang = queryString.lang;
    if (lang == undefined) {
        lang = 'en';
    }
    return lang;
}



function idleTime() {
    idleTime = 0;

    //Increment the idle time counter every second.
    var idleInterval = setInterval(timerIncrement, 1000);
}

function timerIncrement()
{
    idleTime++;
    if (idleTime > 60)
    {
        goHome();
    }
}

//Zero the idle timer on mouse movement.
$(this).on('click mousemove keypress scroll touchstart', function (e) {
    idleTime = 0;
});

function goHome()
{
    var home = $('#wwwroot').val();
    //Remove authenticated user cookies;
    document.cookie = 'pyauth=; path=/; domain=.yorku.ca; expires =Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'mayaauth=; path=/; domain=.yorku.ca; expires =Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location = home;
}

function cookieExists(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return true;
    }
    return false;
}