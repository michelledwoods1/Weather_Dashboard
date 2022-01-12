
//set default information
var city = 'sydney';
var apiKey = '0efb3c8f25a5e0eb6c284292538858f4';

//convert kelvin to celsisu -273.15
var userInput = document.getElementById("input");
var searchButton = document.getElementById("searchButton");
var currentCity = document.getElementById("currentCity");

console.log("This Search Button text:  " + searchButton.textContent);

searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    

    // if (userInput === "") {
    //     console.log("No input value");
    //     return;
    // }
 
    var city = userInput.value;
    console.log("This is chosen city before forced city :" + city);
    var li = document.createElement("li")
    searchButton.appendChild(li);
    li.textContent = city;
    console.log("This is li text content: " + li.textContent);
    li.setAttribute("data-index", "cityName - " + city);
    li.setAttribute("id","cityName -" + city);

    





});
var city = 'sydney';
// ('<i class="far fa-save"></i>');

// get the lon & lat for the search item
function oneCall(lon, lat){
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then((res) => res.json())
        .then(function(res){
            console.log("THIS IS UV DATA: ");
            console.log(res);
            var daily = res.daily
            for (var i = 0; i < 5; i++) {
                var previousDays = daily[i];
                console.log(previousDays);
                
            }
        })

}

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
            console.log("NO UV DATA:");
            console.log(data);
            // use math to round to 2 decimal place
        
        var tempLabel = document.getElementById("#temp");
        var temp = (data.main.temp-275.15).toFixed(2);
        console.log((data.main.temp-273.15).toFixed(2));
        tempLabel = temp + "C";
        console.log(tempLabel);

        
        var windLabel = document.getElementById("#wind");
        var wind = data.wind.speed
        console.log(data.wind.speed);
        windLabel = wind + "MPH";
        console.log(windLabel);


        var humdityLabel = document.getElementById("humidity");
        var humidity = data.main.humidity;
        console.log(data.main.humidity);
        humdityLabel = humidity;
        console.log(data.main.humidity + "%");



        //var dailyUV = 


        
        // ....
        
        return oneCall(data.coord.lon, data.coord.lat)
    })

    // // recall local storage for each hour of the day
    // for (var i = dayStart; i <= dayEnd; i++) {
    //     if (localStorage.getItem(i)) {
    //         var timeLSget = localStorage.getItem([i]);
    //         console.log("This is TEST - local storage i recalled via for loop : " + localStorage.getItem(i))
    //         $("#text-" +i).val(localStorage.getItem(i));
    //     };