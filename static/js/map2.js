google.maps.event.addDomListener(window, 'load', init);

var map;

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {

        zoom: 2,

        center: new google.maps.LatLng(40.6700, -73.9400), // New York

        styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}],

        draggable : false,

        zoomControl: false,

        scrollwheel: false,

        disableDoubleClickZoom: true,

        disableDefaultUI: true,

        mapTypeId: google.maps.MapTypeId.PLAN
    };
    var mapElement = document.getElementById('map');

    map = new google.maps.Map(mapElement, mapOptions);

//    var marker = new google.maps.Marker({
//        position: new google.maps.LatLng(40.6700, -73.9400),
//        map: map
//    });
}



var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var icons = {
    parking: {
        icon: iconBase + 'parking_lot_maps.png'
    },
    library: {
        icon: iconBase + 'library_maps.png'
    },
    info: {
        icon: iconBase + 'info-i_maps.png'
    },
    orange: {
        icon: "../static/images/orange.png"
    }
};
var icon = {
    url: "../static/images/orange.png", // url
    scaledSize: new google.maps.Size(8, 8), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};

function addmarker(latilongi) {
    var marker = new google.maps.Marker({
        position: latilongi,
        icon: icon,
        title: 'new marker',
        draggable: true,
        map: map
    });
}

var drawMap = function() {

    var x, y;

    $('a#calculate').unbind('click').click(function() {
        $.getJSON($SCRIPT_ROOT + '/_add_point', {}, function(data) {
            $('#dx').text(data.x);
            $('#dy').text(data.y);
            x = $('#dx').text();
            y = $('#dy').text();

            var latitude = parseFloat(x);
            var longitude = parseFloat(y);
            var point = new google.maps.LatLng(latitude, longitude);
            addmarker(point);
        });
    });

    //make data loading automatically
    var trigeerClick = function() {
        $('a#calculate').trigger('click');
    }
    setInterval(trigeerClick, Math.random()*500+100);

}
drawMap();
