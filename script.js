// userInput.setAttribute("style", "height: 1.5");
//askBCS - why is height not working?


// searchButton.setAttribute("style", "padding: 0");
//askBCS - why is padding 0 not working?

//set variables
var apiKey = '0efb3c8f25a5e0eb6c284292538858f4';
today = moment().format("D" + "/" + "MM" + "/" + "YYYY");
var cityInput = document.getElementById("input");
var searchButton = document.getElementById("searchButton");
var currentCity = document.getElementById("currentCity");
var cityButtons = document.getElementById("city-buttons");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvEl = document.getElementById("uv");
var results = document.getElementById("results");

//style variables
cityInput.setAttribute("style", "border-radius: 0.25rem");
tempEl.setAttribute("style", "&#8451");
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
});


// cityButtons.addEventListener("click", function(event) {
//     city = event.target.getAttribute('data-city');
      
//     if (city) {
//         getUserCity(citye);
      
//         }
//     };

console.log("This is today's date :" + today);





    
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

            if (cityName) {
            console.log("This is the city Name : " + cityName);
            currentCity.textContent = cityName;

            } else {
                document.location.replace('./index.html');
            }


            var listButton = document.createElement("button")
            cityButtons.appendChild(listButton);
            listButton.textContent = cityName;
            console.log("This is new button text content: " + listButton.textContent);
            listButton.setAttribute("data-city", "cityName-" + cityInput);
            listButton.setAttribute("id", "city");
            listButton.setAttribute("class", "btn btn-primary col-12 my-3");

            iconEl = (res.current.weather[3])        
            console.log("Thi is the weather icon number : " + iconEl);

            //convert kelvin to celsisu -273.15
            tempEl = (res.current.temp-275.15).toFixed(2);
            console.log("This is current temp : " + tempEl);


            windEl = (res.current.wind_speed) + " MPH"
            console.log("This is current wind : " + windEl);
            
            humidityEl = res.current.humidity;
            console.log("This is current humidity : " + humidityEl + "%");

            uvEl = res.current.uvi;
            console.log("This is current uv : " + uvEl);

            // fetch('http://openweathermap.org/img/wn/10d@2x.png



            // var daily = res.daily
            // for (var i = today; i < 5; i++) {
            //     var previousDays = daily[i];
            //     console.log(previousDays);
            //     console.log("This is lon fron 2nd api: " + lon);
                
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

    