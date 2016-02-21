if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude + ',' + position.coords.longitude);
  });

} else {
    loadWeather("Gainesville, FL", "");
}

  function getWeather(){
    var lat = $('#latitude').val();
    var lon = $('#longitude').val();
    var options = {
      url: buildUrl(lat, lon),
      dataType: 'jsonp',
      success: successHandler,
      error: errorHandler
    };
  }

$(document).ready(function() {
    setInterval(getWeather, 10000);
});

function loadWeather(location, woeid) {
    $.simpleWeather({
        location: location,
        woeid: woeid,
        unit: "f",
        success: function(weather) {
          city = weather.city;
          temp = weather.temp+'&deg;';
          wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svp">';
          wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
          humidity = weather.humidity + ' %';

          $(".location").text(city);
          $(".tempature").html(temp);
          $(".climate_bg").html(wcode);
          $(".wndspeed").html(wind);
          $(".humidity").text(humidity);
        },

        error: function(error) {
            $(".error").html('<p>' + error + '</p>');
        }
    });
}
