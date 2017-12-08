const request = require('request'),
fs = require('fs');


function deleteFiles(sites, channel) {
	for (let i = 0; i < sites.length; i++) {

		let name = __dirname + '/../texts/' + sites[i].split('.')[1] +'.txt'
		fs.unlink(name, function(error) {	
			if (error) {console.log(error);}
			channel.send(sites[i] + ' was deleted')
		});
	}

	write(sites, channel)
}

function write(sites, channel) {

	for (let i = 0; i < sites.length; i++) {

		let options = {
			url: sites[i] + '/sitemap.xml',
			headers: {
			'User-Agent': 'request'
			}
		};

		let fileName = "/../texts/" + sites[i].split('.')[1] + ".txt";

		request(options, function(error, response, body) {
			if(error) {console.log("Error: " + error);}

			fs.writeFile(__dirname + fileName, body, function(err) {
				if(err) {return console.log(err);}

				channel.send(sites[i] + ' was written')
			});

		});
	}
}

module.exports = {deleteFiles}


