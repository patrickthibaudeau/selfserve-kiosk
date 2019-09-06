$(document).ready(function () {
    init();
});

function init() {

    if (isPublicKiosk()) {
        preventUrl();
    } else {
        popupInWindow();
    }

    var faqHost = $('#faqHost').val();

    $('.answer').hide();

    $('#btnSubmit').off();
    $('#btnSubmit').on('click', function () {
        searchFaq(faqHost);
    });

// jQuery Keydown event not working on android. Using plain JS
    document.addEventListener('keydown', function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);

        if (keycode == '13') {
            event.preventDefault();
            searchFaq(faqHost);
        }
    });

    $('.openFaq').click(function () {
        var id = $(this).data('id');
        var lang = $(this).data('lang');
        //Get faq
        $.ajax({
            url: faqHost + '/api2.php?action=getFaq&recordid=' + id +
                    '&lang=' + lang,
            crossDomain: true,
            dataType: 'json',
            success: function (results) {
                $('.answer').hide();
                $('.answer-' + results.id + '-content').html(results.content);
                $('.answer-' + results.id).show();
                if (isPublicKiosk()) {
                    preventUrl();
                } else {
                    popupInWindow();
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    });

    $('#btnReset').click(function () {
        $('#faqData').html('');
        $('#q').val('');
        $('.answer').hide();
    });
}

function showLinks() {
    if (isPublicKiosk()) {
        $('.qrcode').hide();
        $('.QRcode').hide();
    } else {
        $('.showLink').hide();
    }
}

function searchFaq(faqHost) {
    var q = escape($('#q').val());
    console.log(q);

    var lang = $('#currentLanguage').val();

    var html = '';
    //Get faq
    $.ajax({
        url: faqHost + '/api.php?action=search&q=' + q +
                '&lang=' + lang,
        crossDomain: true,
        dataType: 'json',
        success: function (results) {
            var noResults = ''
            if (results.length == 0) {
                if (lang == 'en') {
                    noResults = 'Sorry, no results found. Please try again.';
                } else {
                    noResults = 'Désolé, aucun résultat trouvé. Veuillez réessayer.';
                }
                html += '<div class="alert alert-warning">' + noResults + '</div>';
            } else {
                html += '<ul class="list-group">';
                for (i = 0; i < results.length; i++) {
                    html += '<li class="list-group-item">'
                            + "<a href='javascript:void(0);' class='openFaq' data-id='"
                            + results[i].id
                            + "' data-lang='" + results[i].lang + "'>"
                            + results[i].question + "</a>"
                            + "<div class='card answer-" + results[i].id + " answer'>"
                            + "<div class='card-body'>"
                            + "<div class='answer-" + results[i].id + "-content'>"
                            + "</div>"
                            + "</div>"
                            + "</div>"
                            + '</li>';
                }
                html += '</ul>';
            }
            $('#faqData').html(html);
            init();
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function popupInWindow() {
    console.log('popupwindow');
    $('.answer a').click(function (e) {
        e.preventDefault();
        window.open(this.href, 'Kiosk', 'width=1024, height=800');
    });
}

function preventUrl() {
    $('.answer a').click(function (e) {
        e.preventDefault();
    });
}