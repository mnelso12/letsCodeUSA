$( document ).ready(function() {
	console.log( "ready!" );
	loadCodeSchools();
});

function loadCodeSchools() {
	makeCorsRequest();
}

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: new google.maps.LatLng(36,-97),
		mapTypeId: 'terrain'
	});

	//	Create a <script> tag and set the USGS URL as the source.
	var script = document.createElement('script');
	//	This example uses a local copy of the GeoJSON stored at
	//	http:earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp

	script.src = 'https:developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
	//script.src = 'http://code.org/schools.json';
	document.getElementsByTagName('head')[0].appendChild(script);
}

//Loop through the results array and place a marker for each
//set of coordinates.
window.eqfeed_callback = function(results) {
	/*
		for (var i = 0; i < results.features.length; i++) {
			var coords = results.features[i].geometry.coordinates;
			var latLng = new google.maps.LatLng(coords[1],coords[0]);
			var marker = new google.maps.Marker({
				position: latLng,
				map: map
			});
		}
		*/
}







// cors request from Code.org

function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		xhr.open(method, url, true);

	} else if (typeof XDomainRequest != "undefined") {
		xhr = new XDomainRequest();
		xhr.open(method, url);

	} else {
		xhr = null;
	}
	return xhr;
}

function parseJSON(json) {
	var obj = JSON.parse(json);
	var latLng = [];

	for (var i=0; i<obj.schools.length; i++) {
		var lat = obj.schools[i].latitude;
		var lng = obj.schools[i].longitude;
		var coord = {lat, lng};
		latLng.push(coord);
	}

	var i=0;
	for (var obj in latLng) {
		console.log(latLng[i].lat);
		var coord = new google.maps.LatLng(latLng[i].lat, latLng[i].lng);
		var marker = new google.maps.Marker({
			position: coord,
			map: map
		});
		i+=1;
	}
}



function makeCorsRequest() {
	//var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';
	var url = "http://code.org/schools.json";

	var xhr = createCORSRequest('GET', url);
	if (!xhr) {
		alert('CORS not supported');
		return;
	}

	xhr.onload = function() {
		var text = xhr.responseText;
		parseJSON(text);
	};

	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	xhr.send();
}
