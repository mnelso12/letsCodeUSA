// global variables
var map;
var infowindow;
var schoolData = [];


$( document ).ready(function() {
	console.log( "ready!" );
	loadCodeSchools();
	//searchForAddress("South Bend, IN");
});

function loadCodeSchools() {
	makeCorsRequest();
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: new google.maps.LatLng(36,-97),
		mapTypeId: 'terrain'
	});

	/*
	var homeLatLng = new google.maps.LatLng(51.476706,0);
	infowindow =  new google.maps.InfoWindow({
		content: 'Hello World!',
		map: map
	});
	*/

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




// geocoding from Google Maps Geocoding API
$("#searchForm").submit(function() {
	pressedSearch();
	return false;
});

function pressedSearch() {
	console.log($("#search").val());
	searchForAddress($("#search").val());
}

function searchForAddress(addressString) {
	var parsedAddress = parseAddress(addressString);
	makeCorsRequestForAddress(parsedAddress);
}

function parseAddress(addressString) {
	var replaced = addressString.split(' ').join('+');
	return replaced;
}

function makeCorsRequestForAddress(address) {
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyA2xsfPL2vL3sihxxixNy6qX0bXkNZEyTU";

	var xhr = createCORSRequest('GET', url);
	if (!xhr) {
		alert('CORS not supported');
		return;
	}

	xhr.onload = function() {
		var text = xhr.responseText;
		var json = JSON.parse(text);
		// schoolData = json; // TODO gotta make this into an array of location data

		var marker = new google.maps.Marker({
			map: map,
			position: json["results"][0].geometry.location
		});

		map.setZoom(10);
		map.panTo(marker.position);
	};

	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	xhr.send();
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

function makeSchoolDataArray(json) {
	var obj = JSON.parse(json);

	for (var i=0; i<obj.schools.length; i++) {

		//var lat = obj.schools[i].latitude;
		//var lng = obj.schools[i].longitude;
		//var coord = {lat, lng};
		schoolData.push(obj.schools[i]);
	}
	console.log(schoolData);
}


function graphPoints() {
	var i=0;
	for (var obj in schoolData) {
		var coord = new google.maps.LatLng(schoolData[i].latitude, schoolData[i].longitude);
		//var coord = new google.maps.LatLng(schoolData[i].lat, schoolData[i].lng);
		var marker = new google.maps.Marker({
			position: coord,
			map: map
		});

		var infoWindow =  new google.maps.InfoWindow({
			content: '' 
		});

		// add an event listener for this marker
		bindInfoWindow(marker, map, infoWindow, "<h5>" + schoolData[i].name + "</h5>" + "<p>" + schoolData[i].street + " " + schoolData[i].city + ", " + schoolData[i].state + " " + schoolData[i].zip + "</p>" + "<p> Format: " + schoolData[i].format +  "</p>");

		i+=1;
	}
}


function bindInfoWindow(marker, map, infowindow, html) { 
	google.maps.event.addListener(marker, 'mouseover', function() { 
		infowindow.setContent(html); 
		infowindow.open(map, marker); 
	}); 

	google.maps.event.addListener(marker, 'mouseout', function() { 
		infowindow.setContent(html); 
		infowindow.close(); 
	}); 
} 





function makeCorsRequest() {
	var url = "http://code.org/schools.json";

	var xhr = createCORSRequest('GET', url);
	if (!xhr) {
		alert('CORS not supported');
		return;
	}

	xhr.onload = function() {
		var text = xhr.responseText;
		makeSchoolDataArray(text);
		graphPoints();
	};

	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	xhr.send();
}
