const request = require('request'),
fs = require('fs');


module.exports.updateMillis = (channel) => {

  try {
    fs.unlinkSync('../texts/millis.txt');
  }
  catch (e) {
    console.log('writing new file')
  }
  let currentMillis = +new Date();
  fs.writeFile(__dirname + '/../texts/millis.txt', currentMillis, (err) => {
        if(err) {return console.log(err);}
      });
  channel.send("Time updated");

}

////////// deletes text files and calls write function //////////
module.exports.deleteFiles = (sites, channel) => {

  for (const site of sites) {

    const name = __dirname + '/../texts/' + site.split('.')[1] +'.txt';

    fs.unlink(name, (err) => {

			if (err) {
				console.log(err);
			} else {
				channel.send(site + ' was deleted')
			}
      write(site, channel)
		});
 }
 console.log('hi');
}

const write = (site, channel) => {

    const options = {
			url: site + '/sitemap.xml',
			headers: {
			'User-Agent': 'request'
			}
		};

    const fileName = "/../texts/" + site.split('.')[1] + ".txt";

    request(options, (err, response, body) => {
			if(err) {
				console.log("Error: " + err);
			} else {
				fs.writeFile(__dirname + fileName, body, (err) => {
					if(err) {
						return console.log(err);
					} else {
						channel.send(site + ' was written')
					}
				});
			}

		}); // end of request

}
