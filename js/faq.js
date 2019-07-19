$(document).ready(function () {
    $('.answer').hide();

    var login = {faqusername: "webservice", faqpassword: "asdasd"};
//    $.ajax({
//        method: 'POST',
//        url: 'https://patdev.glendon.yorku.ca/faq/api.php?action=login',
//        data: login,
//        crossDomain: true,
//        dataType: 'json',
//        success: function (results) {
//            console.log(results);
//        },
//        error: function (e) {
//            console.log(e);
//        }
//    });

    $('#btnSubmit').click(function () {
        var q = $('#q').val();
        var lang = $(this).data('lang');
        lang = 'en';

        //Get faq
        $.ajax({
            url: 'http://localhost/kiosk/ajax.php?action=search&q=' +  q +
                    '&lang=' + lang,
//            xhrFields: {withCredentials: true},
            crossDomain: true,
            dataType: 'json',
            success: function (results) {
                console.log(results);
            },
            error: function (e) {
                console.log(e);
            }
        });
    });

    $('.openFaq').click(function () {
        var id = $(this).data('id');
        var lang = $(this).data('lang');

        //Get faq
        $.ajax({
            url: 'http://localhost/kiosk/ajax.php?action=getFaq&id=' + id +
                    '&lang=' + lang,
            xhrFields: {withCredentials: true},
            crossDomain: true,
            dataType: 'json',
            success: function (results) {
                console.log(results);
            },
            error: function (e) {
                console.log(e);
            }
        });
    });
});


