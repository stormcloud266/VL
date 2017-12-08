const Twit = require('twit'),
config = require("../config.json");

const T = new Twit({
  consumer_key:         config.consumerkey,
  consumer_secret:      config.consumersecret,
  access_token:         config.accesstoken,
  access_token_secret:  config.accesstokensecret,
  timeout_ms:           60*1000
});

// let derp, crab;

module.exports.getTwitter = (userID, term, link, channel) => {
	T.get('search/tweets', { q: term + ' since:2011-07-11', count: 20 }, 
		function(err, data, response) {
					let x = 0;
					var checkID = function() {
						
						if ((data.statuses[x].user.id) === userID) {

							tweet = link + data.statuses[0].id_str;
							channel.send(tweet);
							x = 0;

						} else {

							if (x < 5) {
								x++;
								checkID();
							} else {
								channel.send('i can\'t do that right now. i\'m sorry. i\'m trying my best.');
							}
						}
					};
					checkID();
				});
}

// derp = [16796841, 'thederpydailycrow','https://twitter.com/margotg/status/']
// crab = [864156437496307712, 'CrabADay', 'https://twitter.com/HussarArg/status/']

