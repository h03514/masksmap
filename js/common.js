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
        let width = $(window).width();
        let height = $(window).height();
        let MapMark = L.map('mapid').setView([25.0722631, 121.5816963], 16);

        let layer_1 = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 16,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        layer_1.addTo(MapMark);
        // L.circleMarker([25.0722631, 121.5816963], {
        //     radius: 10
        // }).addTo(MapMark);

        const greenIcon = L.icon({
            iconUrl: '../images/marker-icon.png',
            iconSize: [50, 50], // size of the icon
            // popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
        });
        // L.marker([25.0722631, 121.5816963], {
        //     icon: greenIcon
        // }).addTo(MapMark);

        L.marker([25.0722631, 121.5816963], {
            icon: greenIcon
        }).addTo(MapMark);



        let locateData = [];


        for (let i in data.features) {
            let locateDataInfo = {};
            locateDataInfo.name = data.features[i].properties.name;
            locateDataInfo.localX = data.features[i].geometry.coordinates[0];
            locateDataInfo.localY = data.features[i].geometry.coordinates[1];
            locateData.push(locateDataInfo);

        }

        let markers = new L.MarkerClusterGroup();
        for (let i in locateData) {
            markers.addLayer(L.marker([locateData[i].localX, locateData[i].localY], {
                icon: greenIcon
            }));

        }

        MapMark.addLayer(markers);

    }