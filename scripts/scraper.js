const request = require('request'),
fs = require('fs');

let todaysMillis = 1512420506359;



/////// get and check site data ////////
module.exports.checkSites = (sites, channel) => {

  for (let i = 0; i < sites.length; i++) {
   sitemapRequest(sites[i], channel)
   getContModDate(sites[i], channel)
  }
}

function sitemapRequest(link, channel) {

  let options = {
        url: link + '/sitemap.xml',
        headers: {
          'User-Agent': 'request'
          }
        };

  let fileName = "/" + options.url.split('.')[1] + ".txt";

  request(options, (function(error, response, body) {

    if(error) {console.log('err request')}
    read(fileName, body, link, channel)
  })); // end of request 
}


function read(file, requestBody, link, channel){

  fs.readFile( __dirname + '/../texts/'+ file, 'utf8', function(err, contents) {

    if(err) {console.log('err readFile')}

    if(contents === requestBody){
    	channel.send('no changes at ' + link.split('.')[1]);
      
    } else {
	     channel.send('**please check ' + link + '/sitemap.xml**'); 
    }

  });
}


function getContModDate(link, channel) {
  
    let options = {
    url: link + '?format=json',
    headers: {
      'User-Agent': 'request'
      }
    };

    request(options, function(error, response, body) {
      if(error) {console.log('error')}
      let info = JSON.parse(body);
      let millis = info.website.contentModifiedOn;

      if (millis < todaysMillis) {
        channel.send('no changes at ' + link.split('.')[1])
      } else {
        channel.send('**please check ' + link + '**')
      }
  });
}












