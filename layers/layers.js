var wms_layers = [];


        var lyr_BaseMap_0 = new ol.layer.Tile({
            'title': 'BaseMap',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' &nbsp &middot; <a href="https://cartodb.com/basemaps/">Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>',
                url: 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png'
            })
        });
var format_VancouverBoundary_1 = new ol.format.GeoJSON();
var features_VancouverBoundary_1 = format_VancouverBoundary_1.readFeatures(json_VancouverBoundary_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_VancouverBoundary_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_VancouverBoundary_1.addFeatures(features_VancouverBoundary_1);
var lyr_VancouverBoundary_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_VancouverBoundary_1, 
                style: style_VancouverBoundary_1,
                popuplayertitle: 'Vancouver Boundary',
                interactive: true,
                title: '<img src="styles/legend/VancouverBoundary_1.png" /> Vancouver Boundary'
            });
var format_BikePathsBuiltAfter2000_2 = new ol.format.GeoJSON();
var features_BikePathsBuiltAfter2000_2 = format_BikePathsBuiltAfter2000_2.readFeatures(json_BikePathsBuiltAfter2000_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_BikePathsBuiltAfter2000_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BikePathsBuiltAfter2000_2.addFeatures(features_BikePathsBuiltAfter2000_2);
var lyr_BikePathsBuiltAfter2000_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_BikePathsBuiltAfter2000_2, 
                style: style_BikePathsBuiltAfter2000_2,
                popuplayertitle: 'Bike Paths Built After 2000',
                interactive: true,
                title: '<img src="styles/legend/BikePathsBuiltAfter2000_2.png" /> Bike Paths Built After 2000'
            });
var format_BikePathsBuiltBefore2000_3 = new ol.format.GeoJSON();
var features_BikePathsBuiltBefore2000_3 = format_BikePathsBuiltBefore2000_3.readFeatures(json_BikePathsBuiltBefore2000_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_BikePathsBuiltBefore2000_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_BikePathsBuiltBefore2000_3.addFeatures(features_BikePathsBuiltBefore2000_3);
var lyr_BikePathsBuiltBefore2000_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_BikePathsBuiltBefore2000_3, 
                style: style_BikePathsBuiltBefore2000_3,
                popuplayertitle: 'Bike Paths Built Before 2000',
                interactive: true,
                title: '<img src="styles/legend/BikePathsBuiltBefore2000_3.png" /> Bike Paths Built Before 2000'
            });

lyr_BaseMap_0.setVisible(true);lyr_VancouverBoundary_1.setVisible(true);lyr_BikePathsBuiltAfter2000_2.setVisible(true);lyr_BikePathsBuiltBefore2000_3.setVisible(true);
var layersList = [lyr_BaseMap_0,lyr_VancouverBoundary_1,lyr_BikePathsBuiltAfter2000_2,lyr_BikePathsBuiltBefore2000_3];
lyr_VancouverBoundary_1.set('fieldAliases', {'name': 'name', });
lyr_BikePathsBuiltAfter2000_2.set('fieldAliases', {'object_id': 'object_id', 'bike_route': 'bike_route', 'street_nam': 'street_nam', 'bikeway_ty': 'bikeway_ty', 'subtype': 'subtype', 'status': 'status', 'street_seg': 'street_seg', 'overall_di': 'overall_di', 'bikeway_di': 'bikeway_di', 'vehicle_di': 'vehicle_di', 'speed_limi': 'speed_limi', 'surface_ty': 'surface_ty', 'aaa_networ': 'aaa_networ', 'aaa_segmen': 'aaa_segmen', 'w_n_bound_': 'w_n_bound_', 'e_s_bound_': 'e_s_bound_', 'snow_remov': 'snow_remov', 'segment_le': 'segment_le', 'year_of_co': 'year_of_co', 'constructi': 'constructi', 'upgrade_ye': 'upgrade_ye', 'notes': 'notes', });
lyr_BikePathsBuiltBefore2000_3.set('fieldAliases', {'object_id': 'object_id', 'bike_route': 'bike_route', 'street_nam': 'street_nam', 'bikeway_ty': 'bikeway_ty', 'subtype': 'subtype', 'status': 'status', 'street_seg': 'street_seg', 'overall_di': 'overall_di', 'bikeway_di': 'bikeway_di', 'vehicle_di': 'vehicle_di', 'speed_limi': 'speed_limi', 'surface_ty': 'surface_ty', 'aaa_networ': 'aaa_networ', 'aaa_segmen': 'aaa_segmen', 'w_n_bound_': 'w_n_bound_', 'e_s_bound_': 'e_s_bound_', 'snow_remov': 'snow_remov', 'segment_le': 'segment_le', 'year_of_co': 'year_of_co', 'constructi': 'constructi', 'upgrade_ye': 'upgrade_ye', 'notes': 'notes', });
lyr_VancouverBoundary_1.set('fieldImages', {'name': 'TextEdit', });
lyr_BikePathsBuiltAfter2000_2.set('fieldImages', {'object_id': 'TextEdit', 'bike_route': 'TextEdit', 'street_nam': 'TextEdit', 'bikeway_ty': 'TextEdit', 'subtype': 'TextEdit', 'status': 'TextEdit', 'street_seg': 'TextEdit', 'overall_di': 'TextEdit', 'bikeway_di': 'TextEdit', 'vehicle_di': 'TextEdit', 'speed_limi': 'TextEdit', 'surface_ty': 'TextEdit', 'aaa_networ': 'TextEdit', 'aaa_segmen': 'TextEdit', 'w_n_bound_': 'TextEdit', 'e_s_bound_': 'TextEdit', 'snow_remov': 'TextEdit', 'segment_le': 'TextEdit', 'year_of_co': 'TextEdit', 'constructi': 'TextEdit', 'upgrade_ye': 'TextEdit', 'notes': 'TextEdit', });
lyr_BikePathsBuiltBefore2000_3.set('fieldImages', {'object_id': 'TextEdit', 'bike_route': 'TextEdit', 'street_nam': 'TextEdit', 'bikeway_ty': 'TextEdit', 'subtype': 'TextEdit', 'status': 'TextEdit', 'street_seg': 'TextEdit', 'overall_di': 'TextEdit', 'bikeway_di': 'TextEdit', 'vehicle_di': 'TextEdit', 'speed_limi': 'TextEdit', 'surface_ty': 'TextEdit', 'aaa_networ': 'TextEdit', 'aaa_segmen': 'TextEdit', 'w_n_bound_': 'TextEdit', 'e_s_bound_': 'TextEdit', 'snow_remov': 'TextEdit', 'segment_le': 'TextEdit', 'year_of_co': 'TextEdit', 'constructi': 'TextEdit', 'upgrade_ye': 'TextEdit', 'notes': 'TextEdit', });
lyr_VancouverBoundary_1.set('fieldLabels', {'name': 'no label', });
lyr_BikePathsBuiltAfter2000_2.set('fieldLabels', {'object_id': 'hidden field', 'bike_route': 'no label', 'street_nam': 'hidden field', 'bikeway_ty': 'hidden field', 'subtype': 'hidden field', 'status': 'hidden field', 'street_seg': 'hidden field', 'overall_di': 'hidden field', 'bikeway_di': 'hidden field', 'vehicle_di': 'hidden field', 'speed_limi': 'hidden field', 'surface_ty': 'hidden field', 'aaa_networ': 'hidden field', 'aaa_segmen': 'hidden field', 'w_n_bound_': 'hidden field', 'e_s_bound_': 'hidden field', 'snow_remov': 'hidden field', 'segment_le': 'hidden field', 'year_of_co': 'hidden field', 'constructi': 'hidden field', 'upgrade_ye': 'hidden field', 'notes': 'hidden field', });
lyr_BikePathsBuiltBefore2000_3.set('fieldLabels', {'object_id': 'hidden field', 'bike_route': 'no label', 'street_nam': 'hidden field', 'bikeway_ty': 'hidden field', 'subtype': 'hidden field', 'status': 'hidden field', 'street_seg': 'hidden field', 'overall_di': 'hidden field', 'bikeway_di': 'hidden field', 'vehicle_di': 'hidden field', 'speed_limi': 'hidden field', 'surface_ty': 'hidden field', 'aaa_networ': 'hidden field', 'aaa_segmen': 'hidden field', 'w_n_bound_': 'hidden field', 'e_s_bound_': 'hidden field', 'snow_remov': 'hidden field', 'segment_le': 'hidden field', 'year_of_co': 'hidden field', 'constructi': 'hidden field', 'upgrade_ye': 'hidden field', 'notes': 'hidden field', });
lyr_BikePathsBuiltBefore2000_3.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});