// need to match to names in api
    // if (cityInput === "") {
    //     console.log("No input value");
    //     return;
//askBCS - why is new button being created when no text is entered into input box
    // }


// var buttonClickHandler = function(event) {
//     var city = event.target.getAttribute('data-city');
//     console.log("This is city from previous searhces: " + city);

//     if (city) {
//         getFeatureCity(city);

//     }
// }   





//set variables

var apiKey = '0efb3c8f25a5e0eb6c284292538858f4';
var cityInput = document.getElementById("input");
var searchButton = document.getElementById("searchButton");
var cityButtons = document.getElementById("city-buttons");
var results = document.getElementById("results");
var current = document.getElementById("current");
var forecast = document.getElementById("forecast");


//style variables
cityInput.setAttribute("style", "border-radius: 0.25rem");

// hide results area (right hand side)
results.setAttribute("style", "display: none");


//event listener to start new search function
searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    var city = cityInput.value.trim();
    console.log(city);

    if (city) {
        getCityCoord(city);

    } else {
        alert("Please enter a valid City")
    }
    cityInput.value = "";
});

// call city lon & lat
function oneCall(lon, lat){
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(res) {
            // console.log("THIS IS UV DATA: ");
            console.log(res);
                      
            //clear input 
            cityInput = "";
            // create card container

            todayContainer = document.createElement("div");
            todayContainer.setAttribute("id", "todayContainer");
            current.append(todayContainer);
            todayContainer.setAttribute("class", "row col-12 d-flex align-items-start");

            
            // city name from api
            currentCity = document.createElement("h1");
            todayContainer.append(currentCity);
            currentCity.setAttribute("class", "row")
            queryString = res.timezone
            var cityName = queryString.split("/")[1];
            // console.log("This is the city Name : " + cityName);
            currentCity.textContent = cityName
            

            
            var listButton = document.createElement("button")
            cityButtons.appendChild(listButton);
            listButton.textContent = cityName;
            console.log("This is new button text content: " + listButton.textContent);
            listButton.setAttribute("data-city", "cityName-" + cityName);
            listButton.setAttribute("id", "city");
            listButton.setAttribute("class", "btn btn-primary col-12");

            var keyLS = listButton.dataset.city;
            console.log("This is local storage key :" + keyLS);
            var valueLS = listButton.textContent;
            console.log("This is LS value: " + valueLS);
            localStorage.setItem(keyLS, valueLS);
            

            //show the results area (right hand side)
            results.setAttribute("style", "display: block");
            

            // var todayBody = document.createElement("div");
            // todayBody.setAttribute("class", "card-body col-12 col-sm-6 col-md-4 col-lg-2 mx-2")
            // todayBody.setAttribute("id", "card");
            // currentContainer.append(todayBody);


            // get date from api
            todayTitle = document.createElement("h4");
            todayContainer.append(todayTitle);
            todayDate = (res.daily[0].dt);
            todayTitle.innerHTML = moment.unix(todayDate).format("D" + "/" + "MM" + "/" + "YYYY");
            
            // get icon from api
            todayImg = document.createElement("img");
            todayContainer.append(todayImg);
            todayIcon = res.current.weather[0].icon
            todayURL = `http://openweathermap.org/img/wn/${todayIcon}.png`
            todayImg.setAttribute("src", todayURL);
            todayImg.setAttribute("alt", "current weather icon");

            
            // create card data

            todayCard = document.createElement("div");
            current.append(todayCard);
            todayCard.setAttribute("id", "today-card-body")

            todayTemp = document.createElement("div");
            todayCard.append(todayTemp);
            var todayCelcius = Math.round(parseFloat(res.current.temp)-273.15);
            todayTemp.innerHTML = "Temp : " + todayCelcius + '&deg;' + "C";

            todayWind = document.createElement("div");
            todayCard.append(todayWind);
            todayWind.innerHTML = "Wind : " + (res.current.wind_speed) + " MPH"

            
            todayHumidity = document.createElement("div");
            todayCard.append(todayHumidity);
            todayHumidity.innerHTML = "Humidity : " + res.current.humidity;


            todayUV = document.createElement("div");
            todayCard.append(todayUV);
            todayUV.innerHTML = "UV index : " + res.current.uvi;

            
            forecastContainer = document.createElement("div");
            forecast.append(forecastContainer);
            forecastContainer.setAttribute("id", "forecast-container");
            forecastContainer.setAttribute("class", "row");




                        
            for (var i = 1; i < 6; i++) {
               
                var forecastBody = document.createElement("div");
                forecastBody.setAttribute("id", "forecast-card-body")
                forecastBody.setAttribute("class", " row card-body")
                // forecastBody.setAttribute("id", "card");
                forecastContainer.append(forecastBody);

                // cardText = document.createElement("div");
                // cardText.setAttribute("class", "card-text");

                forecastDate = res.daily[i].dt
                // console.log("This is date in Unix :" + cardUnix);
                forecastTitle = document.createElement("h4");
                forecastBody.append(forecastTitle);
                forecastTitle.innerHTML = moment.unix(forecastDate).format("D" + "/" + "MM" + "/" + "YYYY");
                // console.log("This is converted Unix " + date);

               
                // console.log(cardIconEl);

                // create variables

                forecastDiv = document.createElement("div");
                var forecastIcon = (res.daily[i].weather[0].icon);
                forecastImg = document.createElement("img");
                forecastDiv.append(forecastImg);
                forecastURL = `http://openweathermap.org/img/wn/${forecastIcon}.png`
                forecastImg.setAttribute("src", forecastURL);
                forecastImg.setAttribute("alt", "forecasted weather icon");
                
                forecastTemp = document.createElement("div");
                forecastWind = document.createElement("div");
                forecastHumidity = document.createElement("div");

                forecastContainer.append(forecastImg, forecastTemp, forecastWind, forecastHumidity);

                // variable data
                var forecastCelcius = Math.round(parseFloat(res.daily[i].temp.day)-273.15);
                forecastTemp.innerHTML = "Temp : " + forecastCelcius + '&deg;' + "C";

                forecastWind.innerHTML = "Wind : " + (res.daily[i].wind_speed) + " MPH"
                // console.log("This is CARD wind : " + cardwindEl);
                
                forecastHumidity.innerHTML = "Humidity : " + (res.daily[i].humidity) + " %"
                // console.log("This is CARD humidity : " + cardhumidityEl + "%");

            }
    })
}

var getCityCoord = function (city) {
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
            console.log("NO UV DATA:");
            console.log(data);
            // use math to round to 2 decimal place
            
        
        var lonEl = data.coord.lon;
        console.log("This is lon from 1st api :" + lonEl);
        var latEl = data.coord.lat;
        console.log("This is lat from 1st api :" + lonEl);
        // currentCity.textContent = data.name

        return oneCall(lonEl, latEl);

    });
};

                // cardTempEl.innerHTML = "Temp : " + (res.daily[i].temp-275.15).toFixed(2);
                // console.log("This is current CARDtemp : " + cardTempEl);
            


                // cardIconEl = (res.daily[0].weather[0].icon);
                // console.log("This is the weather icon number : " + cardIconEl);
    
                // cardImgURL = `http://openweathermap.org/img/wn/${cardIconEl}.png`
                // console.log("This is the CARD icon image " + cardImgURL);
  
                //convert kelvin to celsisu -273.15

    // cityButtons.addEventListener('click', buttonClickHandler);

    // // recall local storage for each hour of the day
    // for (var i = dayStart; i <= dayEnd; i++) {
    //     if (localStorage.getItem(i)) {
    //         var timeLSget = localStorage.getItem([i]);
    //         console.log("This is TEST - local storage i recalled via for loop : " + localStorage.getItem(i))
    //         $("#text-" +i).val(localStorage.getItem(i));
    //     };

     // var cardIconEl = res.daily[i].weather[0].icon;
                //     if (res.daily[i].weather[0].icon.indexOf('01d')) {
                //         cardIconEl = "01d";
                //     } else if (res.daily[i].weather[0].icon.indexOf('01n')) {
                //         cardIconEl = "01n"
                //     } else if (res.daily[i].weather[0].icon.indexOf("O2d")) {
                //         cardIconEl = "02d";
                //     } else if (res.daily[i].weather[0].icon.indexOf("O2n")) {
                //         cardIconEl = "02n";
                //     } else if (res.daily[i].weather[0].icon.indexOf('03d')) {
                //         cardIconEl = "03d";
                //         console.log("This is test for 20Jan22 : " + cardIconEl);
                //     } else if (res.daily[i].weather[0].icon.indexOf("03n")) {
                //         cardIconEl = "03n";
                //     } else if (res.daily[i].weather[0].icon.indexOf('04d')) {
                //         cardIconEl = "04d";
                //     } else if (res.daily[i].weather[0].icon.indexOf("04n")) {
                //         cardIconEl = "04n";
                //     } else if (res.daily[i].weather[0].icon.indexOf('09d')) {
                //         cardIconEl = "09d";
                //     } else if (res.daily[i].weather[0].icon.indexOf("09n")) {
                //         cardIconEl = "09n";
                //     } else if (res.daily[i].weather[0].icon.indexOf('10d')) {
                //         cardIconEl = "10d";
                //     } else if (res.daily[i].weather[0].icon.indexOf("10n")) {
                //         cardIconEl = "10n";
                //     } else if (res.daily[i].weather[0].icon.indexOf('11d')) {
                //         cardIconEl = "11d";
                //     } else if (res.daily[i].weather[0].icon.indexOf("11n")) {
                //         cardIconEl = "11n";
                //     } else if (res.daily[i].weather[0].icon.indexOf('13d')) {
                //         cardIconEl = "13d";
                //     } else if (res.daily[i].weather[0].icon.indexOf("13n")) {
                //         cardIconEl = "13n";
                //     } else if (res.daily[i].weather[0].icon.indexOf('50d')) {
                //         cardIconEl = "50d";
                //     } else if (res.daily[i].weather[0].icon.indexOf("50n")) {
                //         cardIconEl = "50n";
                // };
