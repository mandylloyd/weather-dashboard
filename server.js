let currentDate = moment().format('DD-MM-YYYY');
let APIkey = 'db5d6c660c9863a97f6c659839fd236d';
let searchZip = [];
let searchZipInput = document.querySelector('#city-text');
let searchZipForm = document.querySelector('#city-form');
let searchZipList = document.querySelector('#city-list');

// get localStorage
if (localStorage.getItem('locations') == null) {
    searchZip = JSON.parse(localStorage.getItem('locations'));
    let data = '';
}

// current data city search
let searchWeatherData = function (city) {
    let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIkey + '&units=imperial';
    $.ajax({url: queryURL, method: 'GET'}).then(function (res) {
		console.log("current data", res);

		let iconCode = res.weather[0].icon; 
	
        // render html
		$('.currentIcon').attr("src", "https://openweathermap.org/img/wn/"+ iconCode + "@2x.png");
        $('.currentCity').html(res.name + '&nbsp');
        $('.currentDay').html('Date: ' + moment().format('DD-MM-YYYY'));
        $('.currentHum').html('Humidity: ' + res.main.humidity + ' %');
        $('.currentWind').html('Wind: ' + res.wind.speed + ' MPH');
		$('.currentTemp').html('Temperature: ' + res.main.temp);
		// $('.currentUV').html('UV Index: ' + );
    });
};

// 5-day forecast data
function fullForecast(fiveDay) {
	queryURLforecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + fiveDay + '&appid=' + APIkey + '&units=imperial';

    $.ajax({url: queryURLforecast, method: 'GET'}).then(function (res) {
		console.log('5 day results', res)
		
        $('.dayOne').html('Date: ' + moment().add(1, 'days').format('DD-MM-YYYY'));
        $('.tempOne').html('Temperature: ' + res.list[0].main.temp);
        $('.windOne').html('Wind: ' + res.list[0].wind.speed + ' MPH');
        $('.humOne').html('Humidity: ' + res.list[0].main.humidity);

        $('.dayTwo').html('Date: ' + moment().add(2, 'days').format('DD-MM-YYYY'));
        $('.tempTwo').html('Temperature: ' + res.list[1].main.temp);
        $('.windTwo').html('Wind: ' + res.list[1].wind.speed + ' MPH');
        $('.humTwo').html('Humidity: ' + res.list[1].main.humidity);

        $('.dayThree').html('Date: ' + moment().add(3, 'days').format('DD-MM-YYYY'));
        $('.tempThree').html('Temperature: ' + res.list[2].main.temp);
        $('.windThree').html('Wind: ' + res.list[2].wind.speed + ' MPH');
        $('.humThree').html('Humidity: ' + res.list[2].main.humidity);

        $('.dayFour').html('Date: ' + moment().add(4, 'days').format('DD-MM-YYYY'));
        $('.tempFour').html('Temperature: ' + res.list[3].main.temp);
        $('.windFour').html('Wind: ' + res.list[3].wind.speed + ' MPH');
        $('.humFour').html('Humidity: ' + res.list[3].main.humidity);

        $('.dayFive').html('Date: ' + moment().add(5, 'days').format('DD-MM-YYYY'));
        $('.tempFive').html('Temperature: ' + res.list[4].main.temp);
        $('.windFive').html('Wind: ' + res.list[4].wind.speed + ' MPH');
        $('.humFive').html('Humidity: ' + res.list[4].main.humidity);
    });
}
searchWeatherData('Richmond');
fullForecast('Richmond');

$('#searchForm').on('click', function (event) {
    event.preventDefault();
    let li = $('<li class="list-group-item" id="cityHistory">');


    // let li = $('<li class="list-group-item #cityHistory">')
	$('#cityList').append(li);
	
	let existingHistory;

	if(localStorage.getItem('searchInput')) {
		existingHistory = JSON.parse(localStorage.getItem('searchInput'))
	} else {
		console.log('no')
	}

    // create localStorage
    let cityInput = $('#searchInput').val().trim();
    li.text(cityInput);

    localStorage.setItem('searchInput', JSON.stringify(existingHistory + cityInput));

    searchWeatherData(cityInput);
    fullForecast(cityInput);

    $('#searchInput').val('');
});

$('#cityList').on("click", "#cityHistory", function() {
	let cityname = $(this).text();
    searchWeatherData(cityname);
    fullForecast(cityname);
})
