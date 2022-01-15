// userInput.setAttribute("style", "height: 1.5");
//askBCS - why is height not working?


// searchButton.setAttribute("style", "padding: 0");
//askBCS - why is padding 0 not working?

//set variables
var apiKey = '0efb3c8f25a5e0eb6c284292538858f4';
var cityInput = document.getElementById("input");
var searchButton = document.getElementById("searchButton");
var currentCity = document.getElementById("currentCity");
var cityButtons = document.getElementById("city-buttons");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvEl = document.getElementById("uv");
var results = document.getElementById("results");
var imgEl = document.getElementById("img");
var dateEl = document.getElementById("date");
var forecast = document.getElementById("forecast");
var cardTitle = document.querySelector(".card-title");

//style variables
cityInput.setAttribute("style", "border-radius: 0.25rem");
tempEl.setAttribute("style", "&#8451");
results.setAttribute("style", "display: none");
forecastContainer = document.createElement("div");
forecast.append(forecastContainer);
forecastContainer.setAttribute("class", "row card ");

// forecastContainer.setAttribute("class", "card col-12 col-sm-6 col-md-4 col-lg-2");

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
});



    
// need to match to names in api
    // if (cityInput === "") {
    //     console.log("No input value");
    //     return;
//askBCS - why is new button being created when no text is entered into input box
    // }


// var keyLS = listButton.dataset.city;
// console.log("This is local storage key :" + keyLS);
// var valueLS = listButton.textContent;
// console.log("This is LS value: " + valueLS);
// localStorage.setItem(keyLS, valueLS);
// city.value = "";

// var buttonClickHandler = function(event) {
//     var city = event.target.getAttribute('data-city');
//     console.log("This is city from previous searhces: " + city);

//     if (city) {
//         getFeatureCity(city);

//     }
// }   





// ('<i class="far fa-save"></i>');

// get the lon & lat for the search item
function oneCall(lon, lat){
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(function(response) {
            return response.json();
        })
        // .then((res) => res.json())
        .then(function(res){
            console.log("THIS IS UV DATA: ");
            console.log(res);

            results.setAttribute("style", "display: block");


            queryString = res.timezone
            var cityName = queryString.split("/")[1];
            console.log("This is the city Name : " + cityName);
            currentCity.textContent = cityName;
            
            iconEl = (res.current.weather[0].icon)
            console.log("This is the weather icon number : " + iconEl);

            imgURL = `http://openweathermap.org/img/wn/${iconEl}.png`
            img.setAttribute("src", imgURL)
            console.log("This is the icon image " + imgURL);


            


            var listButton = document.createElement("button")
            cityButtons.appendChild(listButton);
            listButton.textContent = cityName;
            console.log("This is new button text content: " + listButton.textContent);
            listButton.setAttribute("data-city", "cityName-" + cityInput);
            listButton.setAttribute("id", "city");
            listButton.setAttribute("class", "btn btn-primary col-12 my-3");

            
            Unix = res.daily[0].dt
            console.log("This is date in Unix :" + Unix);
            dateEl = moment.unix(Unix).format("D" + "/" + "MM" + "/" + "YYYY");
            console.log("This is converted Unix " + dateEl);

            
            //convert kelvin to celsisu -273.15
            tempEl.innerHTML = (res.current.temp-275.15).toFixed(2);
            console.log("This is current temp : " + tempEl);


            windEl.innerHTML = (res.current.wind_speed) + " MPH"
            console.log("This is current wind : " + windEl);
            
            humidityEl.innerHTML = res.current.humidity;
            console.log("This is current humidity : " + humidityEl + "%");

            uvEl.innerHTML = res.current.uvi;
            console.log("This is current uv : " + uvEl);

                        
            for (var i = 1; i < 6; i++) {
                var cardBody = document.createElement("div");
                cardBody.setAttribute("class", "card-body ")
                cardBody.setAttribute("id", "card");
                forecastContainer.append(cardBody);

                



                cardText = document.createElement("div");
                cardText.setAttribute("class", "card-text");

                cardUnix = res.daily[i].dt
                // console.log("This is date in Unix :" + cardUnix);
                cardTitle = document.createElement("h4");
                cardTitle.innerHTML = moment.unix(cardUnix).format("D" + "/" + "MM" + "/" + "YYYY");
                // console.log("This is converted Unix " + date);

                cardImgEl = document.createElement("img");
                cardImgEl.setAttribute("id", "cardImg");

                cardTempEl = document.createElement("div");
                cardWindEl = document.createElement("div");
                cardHumidityEl = document.createElement("div");
                cardBody.append(cardTitle, cardImgEl, cardTempEl, cardWindEl, cardHumidityEl);

                cardIconEl = (res.daily[0].weather[0].icon);
                // console.log("This is the weather icon number : " + cardIconEl);
    
                cardImgURL = `http://openweathermap.org/img/wn/${cardIconEl}.png`
                cardImgEl.setAttribute("src", cardImgURL);
                cardImgEl.setAttribute("alt", "forecasted weather icon");
                // console.log("This is the CARD icon image " + cardImgURL);
  
                cardTempEl.innerHTML = "Temp : " + (res.daily[i].temp-275.15).toFixed(2);
                // console.log("This is current CARDtemp : " + cardTempEl);
            
                cardWindEl.innerHTML = "Wind : " + (res.daily[i].wind_speed) + " MPH"
                // console.log("This is CARD wind : " + cardwindEl);
                
                cardHumidityEl.innerHTML = (res.daily[i].humidity)
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
        currentCity.textContent = data.name

        return oneCall(lonEl, latEl);

    });
};

    // cityButtons.addEventListener('click', buttonClickHandler);

    // // recall local storage for each hour of the day
    // for (var i = dayStart; i <= dayEnd; i++) {
    //     if (localStorage.getItem(i)) {
    //         var timeLSget = localStorage.getItem([i]);
    //         console.log("This is TEST - local storage i recalled via for loop : " + localStorage.getItem(i))
    //         $("#text-" +i).val(localStorage.getItem(i));
    //     };

    