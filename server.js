let currentDate = moment().format('DD-MM-YYYY');
let APIkey = 'db5d6c660c9863a97f6c659839fd236d';
let searchZip = [];

//get localStorage
if (localStorage.getItem('locations') == null) {
	searchZip = JSON.parse(localStorage.getItem('locations'));
	let data = '';
}

//current data city search
let searchWeatherData = function(data) {
	let queryURL =
		'api.openweathermap.org/data/2.5/forecast?zip=' + data + '&appid=' + APIkey;
		$.ajax({
		url: queryURL,
		method: 'GET'
	}).then(function(res) {
		console.log(res);

//render html
	$('.currentCity').html('<h2>' + res.name + '&nbsp' + currentDate);
	$('.currentHum').html('<p>' + 'Humidity: ' + res.main.humidity + ' %');
	$('.currentWind').html('<p>' + 'Wind: ' + res.wind.speed + ' MPH');
	$('.currentTemp').html('<p>' + 'Temperature: ' + res.main.temp);
});
};

//5-day forecast data
function fullForecast(fiveDay) {
	queryURLforecast =
		'https://api.openweathermap.org/data/2.5/forecast?q=' + fiveDay + '&appid=' + APIkey;
	console.log(queryURLforecast);

	$.ajax({
		url: queryURLforecast,
		method: 'GET'
	}).then(function(res) {
		console.log(res);
		
		$('.dayOne').html('<h4>' + 'Date:' + moment(). add(1,'days'). format('DD-MM-YYYY'));
		$('.tempOne').html('<p>' + 'Tempature: ' + res.list[0].main.temp);
		$('.windOne').html('<p>' + 'Wind: ' + res.wind.speed + ' MPH');
		$('.humOne').html('<p>' + 'Humidity: ' + res.list[0].main.humidity);

		$('.dayTwo').html('h4>' + 'Date:' + moment(). add(2,'days'). format('DD-MM-YYYY'));
		$('.tempTwo').html('<p>' + 'Tempature: ' + res.list[1].main.temp);
		$('.windTwo').html('<p>' + 'Wind: ' + res.wind.speed + ' MPH');
		$('.humTwo').html('<p>' + 'Humidity: ' + res.list[1].main.humidity);

		$('.dayThree').html('<h4>' + 'Date:' + moment(). add(3,'days'). format('DD-MM-YYYY'));
		$('.tempThree').html('<h4>' + 'Tempature: ' + res.list[2].main.temp);
		$('.windThree').html('<p>' + 'Wind: ' + res.wind.speed + ' MPH');
		$('.humThree').html('<p>' + 'Humidity: ' + res.list[2].main.humidity);

		$('.dayFour').html('<h4>' + 'Date:' + moment(). add(4,'days'). format('DD-MM-YYYY'));
		$('.tempFour').html('<p>' + 'Tempature: ' + res.list[3].main.temp);
		$('.windFour').html('<p>' + 'Wind: ' + res.wind.speed + ' MPH');
		$('.humFour').html('<p>' + 'Humidity: ' + res.list[3].main.humidity);

		$('.dayFive').html('<h4>' + 'Date:' + moment(). add(5,'days'). format('DD-MM-YYYY'));
		$('.tempFive').html('<p>' + 'Tempature: ' + res.list[4].main.temp);
		$('.windFive').html('<p>' + 'Wind: ' + res.wind.speed + ' MPH');
		$('.humFive').html('<p>' + 'Humidity: ' + res.list[4].main.humidity);
	});
}

fullForecast('23220');

let searchZipInput = document.querySelector('#city-text');
let searchZipForm = document.querySelector('#city-form');
let searchZipList = document.querySelector('#city-list');

$('#searchForm').on('click', function(event) {
	event.preventDefault();
	let li = $('<li>');
	$('#cityList').append(li);

	//create localStorage
	let cityInput = $('#searchInput').val().trim();
	li.text(cityInput);

	localStorage.setItem('searchInput', JSON.stringify(searchInput));

	searchWeatherData(cityInput);
	fullForecast(cityInput);

	$('#searchInput').val('');
});
