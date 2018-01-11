const request = require('request');

module.exports.fetchHoroscope  = (sign, channel) => {
	request(`http://horoscope-api.herokuapp.com/horoscope/today/${sign}`, function(error, response, body) {
		if (error) { console.log(error) }

		let prediction = JSON.parse(body).horoscope;

		channel.send({embed: {
		  color: 9251444,
		  fields: [{
		  	name: "Horoscope",
		  	value: prediction
		  }]
		}});

	
	});
}

