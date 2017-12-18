const request = require('request');

module.exports.fetchHoroscope  = (sign, channel) => {
	request(`http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today`, function(error, response, body) {
		let prediction = JSON.parse(body)
		channel.send({embed: {
		  color: 9251444,
		  fields: [{
		  	
		  	name: "Horoscope",
		  	value: prediction.horoscope
		  },
		  {
		  	name: "Mood",
		  	value: prediction.meta.mood
		  }]
		}})
	})
	
}

