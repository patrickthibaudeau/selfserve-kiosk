$(document).ready(function () {
    document.body.requestFullscreen();

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