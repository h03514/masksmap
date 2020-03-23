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
            if (data.features[i].properties.mask_adult > 0 || data.features[i].properties.mask_child > 0) {
                let locateDataInfo = {};
                locateDataInfo.id = data.features[i].properties.id;
                locateDataInfo.name = data.features[i].properties.name;
                locateDataInfo.mask_adult = data.features[i].properties.mask_adult;
                locateDataInfo.mask_child = data.features[i].properties.mask_child;
                locateDataInfo.localY = data.features[i].geometry.coordinates[0];
                locateDataInfo.localX = data.features[i].geometry.coordinates[1];
                locateDataInfo.tel = data.features[i].properties.phone;
                locateDataInfo.addr = data.features[i].properties.address;
                locateDataInfo.note = data.features[i].properties.note;

                locateData.push(locateDataInfo);
            }
        }

        const markers = new L.MarkerClusterGroup();

        locateData.forEach(item => {
            let adult = item.mask_adult;
            let child = item.mask_child;
            if (item.mask_adult == 0) {
                adult = '已完售';
            }
            if (item.mask_child == 0) {
                child = '已完售';
            }
            markers.addLayer(L.marker([item.localX, item.localY]).bindPopup(`<div class="pharmacy"><li class="pharmacyName">${item.name}</li></div><div id="pharmacyInfo"><div class="addr"><span>地址: </span>${item.addr}</div><div class="note"> <span>備註: </span>${item.note}</div><div class="Tel"><span>電話: </span>${item.tel}</div></div><div class="mask row"><div class="col-xs-6 label adult">成人口罩: <span>${adult}</span></div><div class="col-xs-6 label child">兒童口罩: <span>${child}</span></div></div>`));
        });
        maskMap.addLayer(markers);




    }