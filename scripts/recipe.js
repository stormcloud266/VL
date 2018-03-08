const request = require('request'),
config = require('../config.json')


module.exports.getTumblr = (website, channel) => {

	const fullURL = `https://api.tumblr.com/v2/blog/${website}.tumblr.com/posts?api_key=${config.tumblr_api_key}&limit=1`;

	request(fullURL, (error, request, body) => {
		if (error) {console.log(error)};
		const resp = JSON.parse(body);
		channel.send(`http://${website}.tumblr.com/` + resp.response.posts[0].id);
	});
}
