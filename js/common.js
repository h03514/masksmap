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
        let myMap = L.map('mapid').setView([25.0722631, 121.5816963], 16);
        L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 16,
            attribution: 'Map data: © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: © <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }).addTo(myMap);

        // L.circleMarker([25.0722631, 121.5816963], {
        //     radius: 10
        // }).addTo(myMap);


        const greenIcon = L.icon({
            iconUrl: '../images/marker-icon.png',
            iconSize: [50, 50], // size of the icon
            // popupAnchor: [0, -10] // point from which the popup should open relative to the iconAnchor
        });
        // L.marker(data.features[i].geometry.coordinates, { icon: greenIcon }).addTo(myMap);



        let locateData = [];


        for (let i in data.features) {

            if (i > 20) {
                continue;
            }
            let locateDataInfo = {};
            // locateDataInfo.name = data.features[i].properties.name;
            locateDataInfo.local = data.features[i].geometry.coordinates;
            locateData.push(locateDataInfo);

        }
        cslog(locateData);
        // L.marker(data.features[i].geometry.coordinates, { icon: greenIcon }).addTo(myMap);
        // console.log(locateData);
        // cslog(greenIcon);
        locateData.forEach(item => {
            L.marker(item.local, {
                    // title: item.name,
                    icon: greenIcon
                })
                .addTo(myMap)
                // .bindPopup(item.name);
        });

        // L.marker([locateData[0].locate[0], locateData[0].locate[1]], { icon: greenIcon }).addTo(myMap);
        // L.marker(locateData[i].locate, { icon: greenIcon }).addTo(myMap);

        // for (let i in locateData) {
        //     // L.marker(locateData[i].locate, { icon: greenIcon }).addTo(myMap);
        //     cslog(locateData[i].locate);
        // }
    }