$(document).ready(function () {
    init();
    showLinks();
});

function init() {
   popupInWindow();
    var faqHost = $('#faqHost').val();
    $('.answer').hide();

    $('#btnSubmit').unbind();
    $('#btnSubmit').click(function () {
        var q = escape($('#q').val());
        console.log(q);

        var lang = $(this).data('lang');

        var html = '';
        lang = 'en';
        console.log(lang);
        //Get faq
        $.ajax({
            url: faqHost + '/api.php?action=search&q=' + q +
                    '&lang=' + lang,
            crossDomain: true,
            dataType: 'json',
            success: function (results) {
                console.log(results);
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
                $('#faqData').html(html);
                init();
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
            url: faqHost + '/api2.php?action=getFaq&recordid=' + id +
                    '&lang=' + lang,
            crossDomain: true,
            dataType: 'json',
            success: function (results) {
                $('.answer').hide();
                $('.answer-' + results.id + '-content').html(results.content);
                $('.answer-' + results.id).show();
                popupInWindow();
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

function popupInWindow() {
    $('.qrcode').click(function (e) {
        e.preventDefault();
        window.open(this.href, 'Kiosk', 'width=1024, height=800', 'menubar=no', 'location=no', 'status=no', 'toolbar=no', 'resize=no');
    });
}