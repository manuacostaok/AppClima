
$(document).ready(function(){

	var proxy = 'https://cors-anywhere.herokuapp.com/';
	
	  var Ip = 'https://ipinfo.io/json';
	
		 $.getJSON(Ip, function(data) {
		  var city = data.city;
		  var region = data.region;
		  var country = data.country;
	
		  var KEY = '&APPID=5738223ed89b662a5da1163d481e5065';
	
		  var URL ='http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + region + country + KEY;
	
		  $.getJSON(proxy + URL, function(data) {
			var type = data.weather[0].main;  //array 0 index
			var id = data.weather[0].id; //array 0 index
			var city = data.name;
	
			var tempCel = Math.round(data.main.temp - 273.15);
			var tempC = tempCel + '°C';
			var weather = data.weather[0].description;
			var tempF = Math.round(tempCel * (9 / 5) + 32) + '°F';
			var icon = data.weather[0].icon;
			var tempBool = true;
	
			//Output data to display on the page
			$('#city').text(city);
			$('#state').text(region);
		   $('#temp').text(tempF); //Show Fahrenheit by Default
		   var weatherIcon = 'http://openweathermap.org/img/w/' + icon + '.png';
			$('#wIcon').html('<img src=' + weatherIcon + '>');
	
	
	   //Then toggle to switch between F and C temperature.
	   $('#btnToggle').on('click', function() {
			var temp = $('#temp');
			if (tempBool) {
				temp.html(tempC);
				tempBool = false
				} else {
				temp.html(tempF);
				tempBool = true;
			 }
		  }); //End of toggle function
	
			});
		 });
	  });
	