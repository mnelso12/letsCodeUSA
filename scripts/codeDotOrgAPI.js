// global variables
var map;
var markers = [];
var schoolData = [];


$( document ).ready(function() {
	loadCodeSchools();
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
}



// geocoding from Google Maps Geocoding API
$("#searchButton").click(function(){
	pressedSearch();
});

$("#clearFilters").on('click', function(){
	console.log("clearing");

	console.log($("#classFormat").val());
	$("#classFormat").val("format-0").change();
	$('#classFormat').trigger("chosen:updated");
	$("#classFormat option[value=format-0]").attr('selected', 'selected');
	$('#classFormat').prop('selectedIndex',0);
	console.log($("#classFormat").val());
/*
	$("#publicPrivate").val("0");
	$("#level").val("0");
	$("#language").val("0");
	*/
});

$("#searchForm").submit(function() {
	pressedSearch();
	return false;
});

function pressedSearch() {
	//console.log($("#search").val());
	searchForAddress($("#search").val());
	var filteredPoints = filterPoints();
	graphPoints(filteredPoints);
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

		/* // Uncomment below if you want a point to appear on this searched-for location
		 *
		var marker = new google.maps.Marker({
			map: map,
			position: json["results"][0].geometry.location
		});

		map.panTo(marker.position);
		*/

		map.setZoom(10);
		map.panTo(json["results"][0].geometry.location);
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
		schoolData.push(obj.schools[i]);
	}
	//console.log(schoolData);
}

function getFilters() {
	var classFormat = $("#classFormat").val();
	var publicPrivate = $("#publicPrivate").val();
	var level = $("#level").val();
	var language = $("#language").val();

	var formats = ["any", "In School", "Out of School"];
	var publicPrivateArr = ["any", "Public", "Private"];
	var levels = ["any", "Preschool", "Elementary", "Middle School", "High School", "College", "Vocational"];
	var languages = ["any", "Code.org Code Studio", "Alice", "Arduino","C++", "C#", "CSS", "HTML", "Java", "JavaScript", "Kodu", "Logo", "Mobile Apps", "Perl", "PHP", "Processing", "Python", "Racket", "Ruby", "Ruby on Rails", "Scratch", "Scheme", "StarLogo Nova", "WeScheme"];

	var selectedLevels = [];
	for (l in level) {
		selectedLevels.push(levels[parseInt(level[l])]);
	}

	var selectedLanguages = [];
	for (l in language) {
		selectedLanguages.push(languages[parseInt(language[l])]);
	}

	var selectedFormat = formats[classFormat];
	var selectedPublicPrivate = publicPrivateArr[publicPrivate];

	return [selectedFormat, selectedPublicPrivate, selectedLevels, selectedLanguages];
}



function filterPoints() {
	var filters = getFilters();

	var filterFormat = filters[0];
	var filterMoney = filters[1];
	var filterLevels = filters[2];
	var filterLanguages = filters[3];

	var filteredPoints = []; // filtered schoolData


	for (var obj in schoolData) {
		var school = schoolData[obj];

		var format = school.format;
		var money_needed = school.money_needed;
		var levels = school.levels;
		var languages = school.languages;

		var isGoodPoint = true;
		
		// filter for format 
		if (filterFormat == "Out of School") {
			if (format == "In School") {
				isGoodPoint = false;
			}
		}
		else if (filterFormat == "In School") {
			if (format == "Out of School") {
				isGoodPoint = false;
			}
		}

		// filter for money_needed (public/private)
		if (filterMoney == "Public") {
			if (money_needed === true) {
				isGoodPoint = false;
			}
		}
		else if (filterMoney == "Private") {
			if (money_needed == false) {
				isGoodPoint = false;
			}
		}

		// filter for levels
		if (filterLevels.length > 0) {
			for (l of filterLevels) {
				if (levels.indexOf(l) < 0) {
					isGoodPoint = false;
				}
			}
		}

		// filter for languages
		if (filterLanguages.length > 0) {
			for (l of filterLanguages) {
				if (languages.indexOf(l) < 0) {
					isGoodPoint = false;
				}
			}
		}

		if (isGoodPoint == true) {
			filteredPoints.push(school);
		}
	}
	return filteredPoints;
}







// Sets the map on all markers in the array.
function setMapOnAll(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
	clearMarkers();
	markers = [];
}


function graphPoints(filteredPoints) {
	// clear graph markers
	deleteMarkers();

	var i=0;
	for (var obj in filteredPoints) {
		var coord = new google.maps.LatLng(filteredPoints[i].latitude, filteredPoints[i].longitude);

		var marker = new google.maps.Marker({
			position: coord,
			map: map
		});

		markers.push(marker);

		var infoWindow =  new google.maps.InfoWindow({
			content: '' 
		});
;
		var name = filteredPoints[i].name;
		var street = filteredPoints[i].street;
		var city = filteredPoints[i].city;
		var state = filteredPoints[i].state;
		var zip = filteredPoints[i].zip;
		var format = filteredPoints[i].format;
		var format_desc = filteredPoints[i].format_description;
		var levels = filteredPoints[i].levels.join(", ");
		var languages = filteredPoints[i].languages.join(", ");

		if (!levels) {
			levels = "(none listed)"	
		}
		if (!languages) {
			languages = "(none listed)"	
		}
		if (!street) {
			street = ""	
		}
		if (!city) {
			city = ""	
		}
		if (!state) {
			state = ""	
		}
		if (!zip) {
			zip = ""	
		}
;
		var html = "<h5>" + name + "</h5>"
 				+ "<p>" + street + " " + city + ", " + state + " " + zip + "</p>" 
				+ "<p><span style='color: #3f51b5; font-weight: bold;'>Format: </span>" + format + " - " + format_desc + "</p>"
				+ "<p><span style='color: #3f51b5; font-weight: bold;'>Levels: </span>" + levels + "</p>"
				+ "<p><span style='color: #3f51b5; font-weight: bold;'>Languages: </span>" + languages + "</p>";


		// add an event listener for this marker
		bindInfoWindow(marker, map, infoWindow, html);

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

	var url = "http://cors.io/?http://code.org/schools.json";
	var shortUrl = "http://code.org/schools.json";
	var path = "scripts/schools.json";

	var xhr = createCORSRequest('GET', path);
	if (!xhr) {
		alert('CORS not supported');
		return;
	}

	xhr.onload = function() {
		var text = xhr.responseText;
		makeSchoolDataArray(text);
		//graphPoints();
	};

	xhr.onerror = function() {
		console.log('Woops, there was an error making the request.');
	};

	xhr.send();
}
