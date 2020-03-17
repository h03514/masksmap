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

        let maskMap = L.map('mapid').setView([25.0722631, 121.5816963], 16);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(maskMap);

        let locateData = [];
        for (let i in data.features) {
            let locateDataInfo = {};
            locateDataInfo.name = data.features[i].properties.name;
            locateDataInfo.mask_adult = data.features[i].properties.mask_adult;
            locateDataInfo.mask_child = data.features[i].properties.mask_child;
            locateDataInfo.localY = data.features[i].geometry.coordinates[0];
            locateDataInfo.localX = data.features[i].geometry.coordinates[1];
            locateData.push(locateDataInfo);
        }

        const markers = new L.MarkerClusterGroup();
        locateData.forEach(item => {
            markers.addLayer(L.marker([item.localX, item.localY]).bindPopup(`<ul><li>${item.name}</li><li>成人口罩: ${item.mask_adult}</li><li>兒童口罩: ${item.mask_child}</li></ul>`));

        });
        maskMap.addLayer(markers);

    }