const request = require('request');

module.exports.getWiki = (term, channel) => {

	const searchTermHere = term,
	url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchTermHere

	if (searchTermHere.length > 0){

		request({
		    url: url,
		    json: true
			},
			function (error, response, body) {

			    if (!error && response.statusCode === 200) {
			    	if (body[3][0] !== undefined) {
			    		channel.send(body[3][0]);
			    	} else {
			    		channel.send('please check search terms')
			    	}
			    } else {
			    	channel.send('there was an error')
			    }
			});
	} else {
		channel.send('```v.wiki search terms here```')
	}

}
