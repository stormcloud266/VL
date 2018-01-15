const axios = require('axios');
const config = require('../config.json');

let celsius = (temp) => {
	let celsRaw = (temp - 32) * 5/9;
	let celsRounded = Math.round(celsRaw * 100) / 100;
	return celsRounded;
}



module.exports.getWeather = (address, message) => {

	let encodedAddress = encodeURIComponent(address);
	let geoDataURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

	axios.get(geoDataURL).then((response) => {

		if (response.data.status !== 'OK') {
			throw new Error('Unable to find that address. Please try again')
		}

		let lat = response.data.results[0].geometry.location.lat;
		let lng = response.data.results[0].geometry.location.lng;
		let weatherURL = `https://api.darksky.net/forecast/${config.weatherAPI}/${lat},${lng}`;

		return axios.get(weatherURL);

	}).then((response) => {

		// current conditions
		let currentObj = {
			temperatureF: response.data.currently.temperature,
			temperatureC: celsius(response.data.currently.temperature),
			apparentTemperatureF: response.data.currently.apparentTemperature,
			apparentTemperatureC: celsius(response.data.currently.apparentTemperature),
			summary: response.data.currently.summary,
		}

		// forecast
		let forecastObj = {
			tempHighF: response.data.daily.data[0].temperatureHigh,
			tempHighC: celsius(response.data.daily.data[0].temperatureHigh),
			tempLowF: response.data.daily.data[0].temperatureLow,
			tempLowC: celsius(response.data.daily.data[0].temperatureLow),
			forecastSummary: response.data.daily.data[0].summary
		}

		let weatherResult = {
		  "title": "Weather",
		  "color": 4627620,
		  "fields": [
		    {
		      "name": "Current Temperature",
		      "value": `${currentObj.temperatureF} F\n${currentObj.temperatureC} C`
		    },
		    {
		      "name": "Feels Like",
		      "value": `${currentObj.apparentTemperatureF} F\n${currentObj.apparentTemperatureC} C`
		    },
		    {
		      "name": "Conditions",
		      "value": `${currentObj.summary}`
		    },
		    {
		      "name": "Tomorrow's High",
		      "value": `${forecastObj.tempHighF} F\n${forecastObj.tempHighC} C`
		    },
		    {
		      "name": "Tomorrow's Low",
		      "value": `${forecastObj.tempLowF} F\n${forecastObj.tempLowC} C`
		    },
		    {
		      "name": "Tomorrow's Conditions",
		      "value": `${forecastObj.forecastSummary}`
		    }
		  ]
		}

		message.reply({embed: weatherResult})

	}).catch((error) => {
		if (error.code === 'ENOTFOUND') {
			message.channel.send('Unable to connect to API servers.')
		} else {
			message.channel.send(error.message);
		}
	});
}



























