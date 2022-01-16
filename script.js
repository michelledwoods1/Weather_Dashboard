//declare variables
var apiKey = '0efb3c8f25a5e0eb6c284292538858f4';
var cityInput = document.getElementById("input");
cityInput.setAttribute("style", "border-radius: 0.25rem");
var cityTitle = document.getElementById("cityName");
var searchButton = document.getElementById("searchButton");
var cityButtons = document.getElementById("cityButtons");
var resultsContainerEl = document.getElementById("results");
var todayResult = document.getElementById("current");
var forecastResult = document.getElementById("forecast");
var todayDate = document.getElementById("todayDate");
var todayIconDisplay = document.getElementById("todayIcon");
var forecastTitle = document.getElementById("forecastTitle")
var todayCard = document.getElementById("todayCard")

// var usercity = cityInput.value;
var cities = [];


// render local storage
var storedCities = JSON.parse(localStorage.getItem("cities"));
if (storedCities !== null) {
    cities = storedCities;
}

cityButtons.textContent = "";

for (var i = 0; i < cities.length; i++) {
        var listButton = document.createElement("button");
        listButton.textContent = cities[i];
        cityButtons.append(listButton);
        listButton.setAttribute("class", "btn btn-primary col-12");
};

// return city data based on lon & lat
function oneCall(lat, lon, city){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(res) {
            console.log("OneCall api :");
            console.log(res);

            cityTitle.textContent = city;

            // display current date
            todayDate.textContent = moment.unix(res.daily[0].dt).format("D" + "/" + "MM" + "/" + "YYYY");
            console.log("this is the onecall date: " + todayDate.textContent);
          
            // display current day icon
            var todayIconRef = res.current.weather[0].icon
            var todayURL = `http://openweathermap.org/img/wn/${todayIconRef}.png`
            todayIconDisplay.setAttribute("src", todayURL);
            todayIconDisplay.setAttribute("alt", "current weather icon");

            // display current data
            var todayTemp = document.createElement("div");
            todayTemp.setAttribute("class", "my-2 ml-2")
            todayCard.append(todayTemp);
            var todayCelcius = Math.round(parseFloat(res.current.temp)-273.15);
            todayTemp.innerHTML = "Temp : " + todayCelcius + '&deg;' + "C";

            var todayWind = document.createElement("div");
            todayWind.setAttribute("class", "my-2 ml-2")
            todayCard.append(todayWind);
            todayWind.innerHTML = "Wind : " + (res.current.wind_speed) + " MPH"
           
            var todayHumidity = document.createElement("div");
            todayCard.append(todayHumidity);
            todayHumidity.setAttribute("class", "my-2 ml-2")
            todayHumidity.innerHTML = "Humidity : " + res.current.humidity;

            var todayUV = document.createElement("div");
            todayUV.innerHTML = "UV : "
            todayCard.append(todayUV);
            var todayUVbutton = document.createElement("button");
            todayUV.setAttribute("class", "my-2 ml-2")
            todayUV.appendChild(todayUVbutton);

            var todayUVindex = parseFloat(res.current.uvi);
            console.log("this is uv index : " + todayUVindex);
            todayUVbutton.innerHTML = todayUVindex;
            if (todayUVindex >5) {
                todayUVbutton.setAttribute("class", "uvhigh");
            } else if (todayUVindex <3) {
                todayUVbutton.setAttribute("class", "uvlow");
            } else {
                todayUVbutton.setAttribute("class", "uvmoderate");
            };

            // display 5 day forecast heading
            forecastTitle.innerHTML = "5 Day Forecast:"
 
            // create forecast cards for 5 days only
            for (var i = 1; i < 6; i++) {

                var forecastCard = document.createElement("div");
                forecastCard.setAttribute("class", "card-body bg-secondary mx-1 my-1 text-white");
                forecastResult.append(forecastCard);


                var forecastDate = document.createElement("h4");
                forecastCard.append(forecastDate);
                forecastDate.textContent = " (" + moment.unix(res.daily[i].dt).format("D" + "/" + "MM" + "/" + "YYYY") + " )";
                forecastDate.setAttribute("class", "card-title");

                var forecastImgDiv = document.createElement("div");
                forecastCard.append(forecastImgDiv);
                var forecastImg = document.createElement("img");
                forecastImgDiv.append(forecastImg);

                var forecastIcon = (res.daily[i].weather[0].icon);
                var forecastURL = `http://openweathermap.org/img/wn/${forecastIcon}.png`
                forecastImg.setAttribute("src", forecastURL);
                forecastImg.setAttribute("alt", "forecasted weather icon");
                
                var forecastTemp = document.createElement("div");
                var forecastWind = document.createElement("div");
                var forecastHumidity = document.createElement("div");
                forecastCard.append(forecastTemp, forecastWind, forecastHumidity);

                // forecast data
                var forecastCelcius = Math.round(parseFloat(res.daily[i].temp.day)-273.15);
                forecastTemp.innerHTML = "Temp : " + forecastCelcius + '&deg;' + "C";

                forecastWind.innerHTML = "Wind : " + (res.daily[i].wind_speed) + " MPH"

                forecastHumidity.innerHTML = "Humidity : " + (res.daily[i].humidity) + " %"

            }
            
    })
};

function getCityCoord (usercity, shouldCreateButton) {
    todayCard.textContent = "";
    forecastResult.textContent = "";
          
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${usercity}&appid=${apiKey}`)
        .then(function (response) {
            console.log("This is response status :" + response.status);
            if (!response.ok) {
                alert("invalid city name");
                todayCard.textContent = "";
                forecastResult.textContent = "";
                currentData.textContent = "";
                forecastResult.textContent = "";
                forecastTitle.textContent = "";
                return;
            }
            return response.json();
        })
 
        .then(function (data){
            console.log("OpenWeather api : ");
            console.log(data);
                
            var lon = data.coord.lon;
            var lat = data.coord.lat;
            var city = data.name;


            cityInput.value = "";



            console.log("this is openW date : " + moment.unix(data.dt).format("D" + "/" + "MM" + "/" + "YYYY")); 
            console.log("Coordinates from OpenWeatherMap : ");
            console.log("City :" + city + " " + "lat: " + lat + " " + "lon: " + lon);

            // create buttons only if a new city
            if (shouldCreateButton) {
            var listButton = document.createElement("button")
            cityButtons.appendChild(listButton);
            listButton.textContent = city;
            listButton.setAttribute("class", "btn btn-tertiary");
            cities.push(city);
            localStorage.setItem("cities", JSON.stringify(cities));
            }

            console.log("This is LOCAL STORAGE ARRAY : " + cities);

            oneCall(lat, lon, city);
    });
};



//event listeners
searchButton.addEventListener("click", function(event) {
    event.preventDefault();

    var usercity = cityInput.value.trim();
    console.log("This is usercity input :" + usercity);

    if (usercity === "") {
        return;
    }

    if (usercity) {
        getCityCoord(usercity, true);

      
    }
});

cityButtons.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;

    if (element.matches("button")) {
    var usercity = element.textContent
    console.log("This is a saved usercity :" + usercity);
    }


    if (usercity) {
        getCityCoord(usercity, false);

    }

});
