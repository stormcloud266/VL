const request = require('request'),
fs = require('fs');


/////// get and check site data ////////
module.exports.checkSites = (sites, channel) => {
  sites.forEach((site) => {
    sitemapRequest(site, channel);
    getContModDate(site, channel);
  });
}

const sitemapRequest = (link, channel) => {

  const options = {
        url: link + '/sitemap.xml',
        headers: {
          'User-Agent': 'request'
          }
        };

  const fileName = `/${options.url.split('.')[1]}.txt`;

  request(options, ((err, response, body) => {

    if (err) {
      console.log('error with request')
    } else if (response.statusCode !== 200) {
      channel.send(`error retrieving ${options.url} --- status code: ${response.statusCode}`)
    } else {
      read(fileName, body, link, channel)
    }

  })); // end of request
}


const read = (file, requestBody, link, channel) => {

  fs.readFile( __dirname + '/../texts/'+ file, 'utf8', (err, contents) => {

    if (err) {
      channel.send('error with readFile')
    } else if(contents === requestBody){
    	channel.send(`no changes at ${link.split('.')[1]}`);
    } else {
	     channel.send(`**please check ${link}/sitemap.xml**`);
    }
  });

}


const getContModDate = (link, channel) => {

  const todaysMillis = fs.readFileSync(__dirname + '/../texts/millis.txt', 'utf-8'),
  options = {
  url: link + '?format=json',
  headers: {
    'User-Agent': 'request'
    }
  };

  request(options, (error, response, body) => {
    if(error) {console.log('error')}

    if (response.statusCode != 200) {
      channel.send(`error retrieving ${options.url} --- status code: ${response.statusCode}`)
    } else {

      const info = JSON.parse(body),
      millis = info.website.contentModifiedOn;

      if (millis < todaysMillis) {
        channel.send(`no changes at ${link.split('.')[1]}`)
      } else {
        channel.send(`**please check ${link}**`)
      }

    }
});
}
