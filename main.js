var longitude, latitude, timeHour, timeFull;

//Function to update weather information

function updateWeather (json) {

	longitude = json.coord.lon;
  latitude = json.coord.lat;

	//AJAX request

	$.getJSON('http://api.geonames.org/timezoneJSON?lat=' + latitude + '&lng=' + longitude + '&username=joseph_akpu', function(timezone) {
			var rawTimeZone = JSON.stringify(timezone);
			var parsedTimeZone = JSON.parse(rawTimeZone);
			var dateTime = parsedTimeZone.time;
			timeFull = dateTime.substr(11);
			$(".time").html(timeFull); //Update local time
			timeHour = dateTime.substr(-5, 2);
	});
	//Update Weather parameters and location

	$(".weather").html(json.weather[0].description);
var temp = [(json.main.temp - 273.15).toFixed(0) + "°C", (1.8 * (json.main.temp - 273.15) + 32).toFixed(0) + "F"];
	$(".temp-celsius").html(temp[0]);
	$(".temp-fahrenheit").html(temp[1]);
	$(".temperature").click(function () {
		$(".temp-celsius").toggle();
		$(".temp-fahrenheit").toggle();
	});
  $(".city").html(json.name);

  //Check for Geoloaction support

if (navigator.geolocation) {

	//Return the user's longitude and latitude on page load using HTML5 geolocation API

	window.onload = function () {
	var currentPosition;
	function getCurrentLocation (position) {
		currentPosition = position;
		latitude = currentPosition.coords.latitude;
    longitude = currentPosition.coords.longitude;


		//AJAX request

		$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "APPID=8c29bd3506a11f14c3a4a6a3303ef36f", function (data) {
			var rawJson = JSON.stringify(data);
			var json = JSON.parse(rawJson);
			updateWeather(json); //Update Weather parameters
		});
	}

	navigator.geolocation.getCurrentPosition(getCurrentLocation);

	};
	//Find a Forcast

	$("form").on("submit", function(event) {
		event.preventDefault();
		var city = $(".search-box").val(); //Get value from form input
		document.getElementById("my-form").reset();

		//AJAX Request

		$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=8c29bd3506a11f14c3a4a6a3303ef36f", function (data) {
			var rawJson = JSON.stringify(data);
			var json = JSON.parse(rawJson);
			updateWeather(json); //Update Weather parameters
		});
	});
}

//If Geolocation is not supported by the browser, alert the user

else {
	alert("Geolocation is not supported by your browser, download the latest Chrome or Firefox to use this app");
}
