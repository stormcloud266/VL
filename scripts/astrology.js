const request = require('request');


module.exports.fetchHoroscope  = (sign, channel) => {
	// if main site is down
	// let horoscopeURL = `http://horoscope-api.herokuapp.com/horoscope/today/${sign}`;

	// main site
	const horoscopeURL = `http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today/`;

	request({
		url: horoscopeURL,
		json: true
	}, (error, response, body) => {
		if (error) {
			channel.send('there was an error with the request')
		} else if (response.statusCode === 404) {
			channel.send('there was an error fetching horoscope. *run*')
		} else {

			channel.send({embed: {
			  color: 9251444,
			  fields: [{
			  	name: "Horoscope",
			  	value: body.horoscope
			  }]
			 }});

		}
	});
}
