$(document).ready(function () {
    $('#btnSubmit').click(function () {
        searchAtlas();
    });
});

function searchAtlas() {
    var config = {
        webServiceUrl: 'https://admin.glendon.yorku.ca/webservice/rest/server.php?',
        webServiceToken: 'c6edf616d1c5ecc323172c813c21d990',
    }
    $('#btnSubmit').append('&nbsp;<i id="searchSpinner" class="fas fa-spinner fa-spin"></i>');
    var lang = getLanguage();
    var ln = $('#ln').val();
    var fn = $('#fn').val();
    var email = $('#email').val();
    var ext = $('#ext').val();
    var title = $('#title').val();
    var dep = $('#dep').val();

    var queryString = '&ln=' + ln + '&fn=' + fn + '&email=' + email + '&ext=' + ext + '&title=' + title + '&dep=' + dep;
    var url = config.webServiceUrl + 'wstoken=' + config.webServiceToken + '&wsfunction=local_atlas_search' + queryString + '&moodlewsrestformat=json';
    console.log(url);
    $.ajax({
        url: url,
        crossDomain: true,
        dataType: 'json',
        success: function (results) {
            var atlasResults = JSON.parse(b64DecodeUnicode(results[0]['atlas']));
            console.log(results);
            var items = atlasResults['results'];
            var html = '';
            console.log(items);
            if (lang == 'en') {
                html = '<h2>Results</h2>';
            } else {
                html = '<h2>Résultats</h2>';
            }
            html += '<table class="table table-striped">';
            html += '<thead>';
            html += '   <tr>';
            html += '       <th>';
            html += '           ';
            html += '       </th>';
            html += '   </tr>';
            html += '</thead>';
            html += '   <tbody>';
            for (i = 0; i < items.length; i++) {
                var department = '';
                var title = '';
                //Sometimes serviceprovided is not available
                if (typeof items[i].serviceprovided !== 'undefined') {
                    if (typeof items[i].serviceprovided.department !== 'undefined') {
                        department = items[i].serviceprovided.department;
                    } else {
                        department = items[i].serviceprovided[0].department + '<br>' + items[i].serviceprovided[1].department;
                    }
                    if (typeof items[i].serviceprovided.service !== 'undefined') {
                        if (typeof items[i].serviceprovided.service.description !== 'undefined') {
                            title = items[i].serviceprovided.service.description + '<br>';
                        }
                    }
                }
                if (typeof items[i].preferredemailaddress !== 'undefined') {
                    var email = items[i].preferredemailaddress;
                } else {
                    var email = items[i].mail;
                }



                html += '   <tr>';
                html += '       <td>';
                html += '           <h3>' + items[i].givenName + ' ' + items[i].sn + '</h3>' + title + department + '<br>' 
                        + items[i].serviceprovided.service.campusmailingaddress + '<br>'
                        + items[i].serviceprovided.service.buildingaddress + '<br>'
                        + email + '<br>' + items[i].telephoneNumber;
                html += '       </td>';
                html += '   </tr>';
            }
            html += '   </tbody>';
            html += '</table>';

            $('#atlasData').html(html);
            $('#searchSpinner').remove();
        }
    });
}

function getPerson(seqPersonId) {
    console.log(seqPersonId);
    var lang = getLanguage();
    var url = config.webServiceUrl + 'wstoken=' + config.webServiceToken + '&wsfunction=local_atlas_user&seqpersonid=' + seqPersonId + '&moodlewsrestformat=json';
    $.ajax({
        url: url,
        crossDomain: true,
        dataType: 'json',
        success: function (results) {
            var atlasResults = JSON.parse(b64DecodeUnicode(results[0]['atlas']));

            var items = atlasResults['results'];
            var html = '';
            console.log(items);
            if (lang == 'en') {
                html = '<h2>Person view</h2>';
            } else {
                html = '<h2>Personne</h2>';
            }
            html += '<table class="table table-striped">';
            html += '<thead>';
            html += '   <tr>';
            html += '       <th>';
            html += '           ';
            html += '       </th>';
            html += '   </tr>';
            html += '</thead>';
            html += '   <tbody>';
            for (i = 0; i < items.length; i++) {
                var title = '';
                var address = '';
                var campusAddress = '';
                //Sometimes serviceprovided is not available
                if (typeof items[i].serviceprovided !== 'undefined') {
                    if (typeof items[i].serviceprovided.department !== 'undefined') {
                        department = items[i].serviceprovided.department;
                    } else {
                        department = items[i].serviceprovided[0].department + '<br>' + items[i].serviceprovided[1].department;
                    }
                    if (typeof items[i].serviceprovided.service !== 'undefined') {
                        if (typeof items[i].serviceprovided.service.description !== 'undefined') {
                            title = items[i].serviceprovided.service.description + '<br>';
                        }
                        if (typeof items[i].serviceprovided.service.buildingaddress !== 'undefined') {
                            address = items[i].serviceprovided.service.buildingaddress + '<br>';
                        } else {
                            if (typeof items[i].serviceprovided[0] !== 'undefined') {
                                if (typeof items[i].serviceprovided[0].service.buildingaddress !== 'undefined') {
                                    address = items[i].serviceprovided[0].service.buildingaddress + '<br>';
                                }
                            }
                        }
                        if (typeof items[i].serviceprovided.service.campusmailingaddress !== 'undefined') {
                            campusAddress = items[i].serviceprovided.service.campusmailingaddress + '<br>';
                        } else {
                            campusAddress = items[i].serviceprovided[0].service.campusmailingaddress + '<br>';
                        }
                    }
                }
                if (typeof items[i].preferredemailaddress !== 'undefined') {
                    var email = '<a href="mailto:' + items[i].preferredemailaddress + '">' + items[i].preferredemailaddress + '</a>';
                } else {
                    var email = '<a href="mailto:' + items[i].mail + '">' + items[i].mail + '</a>';
                }
                var phone = items[i].telephoneNumber;
                var telephone = '';
                if (typeof phone === 'string') {
                    telephone = phone;
                } else {
                    telephone = phone[0];
                }
//                telephone = replaceAll(telephone, 'Voicemail', '');
                telephone = telephone.replace(/["'(Voicemail)]/g, "");

                telephoneUrl = telephone.replace(/["'x]/g, ",");
                telephoneUrl = telephoneUrl.replace(/["'-]/g, "");
                telephoneUrl = telephoneUrl.replace(/["' ]/g, "");
                console.log(telephoneUrl);
                telephone = '(' + telephone.substr(0, 3) + ') ' + telephone.substr(3, 25);

                html += '   <tr>';
                html += '       <td>';
                html += '           <h4>' + items[i].givenName + ' ' + items[i].sn + '</h4>' + title + department + '<br>' + email + '<br><a href="tel:' + telephoneUrl + '">' + telephone + '</a>';
                html += '           <br>' + address + campusAddress;
                html += '       </td>';
                html += '   </tr>';
            }
            html += '   </tbody>';
            html += '</table>';

            $('#atlasData').html(html);
            $('#searchSpinner').remove();
        }
    });
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


