$(document).ready(function() {

    let date = new Date();

    $('#mapid').height(window.innerHeight);

    let ref = {
        url: 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json'
    }
    AjaxJson(ref, ref, masksInfo);

    $('body').on('click', '#checkIdBtn', function() {
        $('.alertText').remove();

        let html = '';
        if (!$('#inputText').val()) {
            return;
        }
        if (date.getDay() == 7) {
            html += '<div class="alertText">今天大家都可以買口罩喔!!</div>';
            $('#nameText').append(html);
        }
        if ($('#inputText').val() % 2 != 0) {
            html = '';
            html += '<div class="alertText">你今天<span><strong>可以</strong></span>買口罩唷</div>';
            $('#nameText').append(html);
        }
        if ($('#inputText').val() % 2 == 0) {
            html = '';
            html += '<div class="alertText">你今天<span><strong>不可以</strong></span>買口罩唷</div>';
            $('#nameText').append(html);
        }
    });





    masksInfo('');

});