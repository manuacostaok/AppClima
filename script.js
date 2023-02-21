var appid = "ec75ccf7e3e0c0b01a53d2e754d0cd9d";
var valF = 0;
var valC = 0;

function getloc(){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
		
		$.ajax({
			url: 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/3fce2b1424751388569b1e67e20f073f/' + latitude + ',' + longitude,
			success: function(data){
				var city = data.timezone
				var shortcity = ((city.slice((city.indexOf('/'))+1, city.length)).replace("/", ", ")).replace("_", " ")
				var weather = data.currently.summary
				fahrenheitTemp = Math.floor(data.currently.temperature)
				celsiusTemp = Math.floor((fahrenheitTemp - 32)*(5/9))
				$("#locationID").text(shortcity);
				$("#val").text(celsiusTemp);
				$("#weathermain").text(weather);
				changeBackground(weather);
				$("#latitud").text(latitude);
				$("#longitud").text(longitude);

			}
		})


	})} else {
		$("#locationID").text("Location service is not available");
		}
	}

function changeBackground(clima){
	switch (clima){
		case "Overcast":
		case "Cloudy":
		case "Clouds":
		case "Partly Cloudy":
			$("container2").css({'background-image': 'url(http://i.imgur.com/BTDElMu.jpg)'});
		break;
		case "Thunderstorm":
			$("container2").css({'background-image': 'url(https://dreamlandia.com/images/T/thunderstorm.jpg)'});
		break;
		case "Drizzle":
			$("container2").css({'background-image': 'url(http://turismosalobrena.com/wp-content/uploads/2016/03/efecto-lluvia-en-parabrisas-auto-7223.jpg)'});
		break;
		case "Rain":
			$("container2").css({'background-image': 'url(http://i.imgur.com/ZLXhh8q.jpg)'});
		break;
		case "Snow":
		case "Snowy":
			$("container2").css({'background-image': 'url(http://i.imgur.com/S5EDGHf.jpg)'});
		break;
		case "Atmosphere":
			$("container2").css({'background-image': 'url(http://i.imgur.com/p0NfTAB.jpg)'});
		break;
		case "Extreme":
			$("container2").css({'background-image': 'url(http://i.imgur.com/To7gGz1.jpg)'});
		break;
		case "Additional":
		case "Hurricane":
			$("container2").css({'background-image': 'url(http://i.imgur.com/ad6Sat0.jpg)'});
		break;
		case "Clear":
			$("container2").css({'background-image': 'url(http://i.imgur.com/ad6Sat0.jpg)'});
		break;
		default:
			$("container2").css('background-image', 'url(https://images.alphacoders.com/684/684911.jpg)');
	}
}

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

$(document).ready(function(){
	getloc();

	$("#tempunit").on("click", function(){
		if ($("#tempunit").text() == "°C"){ 
				$("#weather").animateCss('swing')
				$("#val").text(fahrenheitTemp);
				$("#tempunit").text("°F")

		} else if ($("#tempunit").text() == "°F") {
				$("#weather").animateCss('swing')
				$("#val").text(celsiusTemp);
				$("#tempunit").text("°C")
		}
	})

})