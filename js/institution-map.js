function nano(template, data) {
  /* Nano Templates - https://github.com/trix/nano */

  return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
    var keys = key.split("."), v = data[keys.shift()];
    for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
    return (typeof v !== "undefined" && v !== null) ? v : "";
  });

}

jQuery(document).ready(function() {

	var quito = [-0.2245, -78.4929];
	var zoom = 12;

	var map = L.map('mapContainer').setView(quito, zoom);

	var mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		{
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}
	).addTo(map);

	var markerTemplate = jQuery('#markerTemplate').html();

	jQuery.ajax({
		url: "data/institutions.json",
	})
	.done(function(result) {
		for (var index = 0; index < result.length; index++) {
			node = result[index];
			var marker = L.marker([node.latitude, node.longitude]);
			marker.addTo(map);
			marker.bindPopup(nano(markerTemplate, node));
		}
	})
	.fail(function(err) {
		var popup = L.popup()
					.setLatLng(quito)
					.setContent("Error cargando los datos. :(")
					.openOn(map);
	});

});
