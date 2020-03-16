    function pa(data) {
        alert(data);
    }

    function cslog(arr) {
        console.log(JSON.stringify(arr));
    }

    function paUrl(da) {
        console.log(da);
    }

    function AjaxJson(ref, params, callback) {
        var Async = false;
        var ProDa = true;
        var ConType = true;
        if (ref.async !== undefined) {
            Async = ref.async;
        }
        if (ref.proda !== undefined) {
            ProDa = ref.proda;
        }
        if (ref.contype !== undefined) {}
        ConType = ref.contype;
        return $.ajax({
            url: ref.url,
            data: ref.data,
            type: 'GET',
            dataType: 'json',
            processData: ProDa,
            contentType: ConType,
            async: Async,
            error: function(xhr, ajaxOptions, thrownError) {
                pa(ref.url + '|' + xhr.responseText);
            },
            success: function(json) {
                callback({
                    params: params,
                    json: json
                });
            },
            beforeSend: function() {
                $('.loader').show();
            },
            complete: function() {
                $('.loader').hide();
            }
        });
    }

    function masksInfo(da) {
        let data = da.json;
        var myMap = L.map('mapid').setView([25.0722631, 121.5816963], 14);
        L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 14,
            attribution: 'Map data: © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: © <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }).addTo(myMap);

        // L.circleMarker([25.0722631, 121.5816963], {
        //     radius: 10
        // }).addTo(myMap);

        for (let i in data.features) {
            L.circleMarker(data.features[i].geometry.coordinates, {
                radius: 10
            }).addTo(myMap);
        }

    }