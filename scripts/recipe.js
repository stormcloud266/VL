const request = require('request'),
config = require('../config.json')


module.exports.getTumblr = (website, channel) => {

	let fullURL = `https://api.tumblr.com/v2/blog/${website}.tumblr.com/posts?api_key=${config.tumblr_api_key}&limit=1`
	request(fullURL, function(error, request, body) {
	if (error) {console.log(error)};
	let resp = JSON.parse(body)
	channel.send(`http://${website}.tumblr.com/` + resp.response.posts[0].id);
});
}


