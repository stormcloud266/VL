const request = require('request'),
fs = require('fs');


module.exports.updateMillis = (channel) => {
  
  try {
    fs.unlinkSync('../texts/millis.txt');
  }
  catch(e) {
    console.log('writing new file')
  }
  let currentMillis = +new Date();
  fs.writeFile(__dirname + '/../texts/millis.txt', currentMillis, function(err) {
        if(err) {return console.log(err);}
      });
  channel.send("Time updated");

}

////////// deletes text files and calls write function //////////
module.exports.deleteFiles = (sites, channel) => {
	for (let i = 0; i < sites.length; i++) {

		let name = __dirname + '/../texts/' + sites[i].split('.')[1] +'.txt'
		fs.unlink(name, function(error) {	
			if (error) {
				console.log(error);
			} else {
				channel.send(sites[i] + ' was deleted')
			}
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
			if(error) {
				console.log("Error: " + error);
			} else {
				fs.writeFile(__dirname + fileName, body, (err) => {
					if(err) {
						return console.log(err);
					} else {
						channel.send(sites[i] + ' was written')
					}
				});
			}
			

		});
	}
}



