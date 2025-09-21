var wms_layers = [];


        var lyr_GoogleSatellite_0 = new ol.layer.Tile({
            'title': 'Google Satellite',
            'type':'base',
            'opacity': 0.500000,
            
            
            source: new ol.source.XYZ({
            attributions: ' &nbsp &middot; <a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
                url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            })
        });
var format_KVR_1 = new ol.format.GeoJSON();
var features_KVR_1 = format_KVR_1.readFeatures(json_KVR_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_KVR_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_KVR_1.addFeatures(features_KVR_1);
var lyr_KVR_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_KVR_1, 
                style: style_KVR_1,
                popuplayertitle: 'KVR',
                interactive: true,
                title: '<img src="styles/legend/KVR_1.png" /> KVR'
            });

lyr_GoogleSatellite_0.setVisible(true);lyr_KVR_1.setVisible(true);
var layersList = [lyr_GoogleSatellite_0,lyr_KVR_1];
lyr_KVR_1.set('fieldAliases', {'id': 'id', 'lineName': 'lineName', });
lyr_KVR_1.set('fieldImages', {'id': 'TextEdit', 'lineName': 'TextEdit', });
lyr_KVR_1.set('fieldLabels', {'id': 'no label', 'lineName': 'no label', });
lyr_KVR_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});