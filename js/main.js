$('#mapid').height(window.innerHeight);

let ref = {
    url: 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json'
}
AjaxJson(ref, ref, masksInfo);

masksInfo('');