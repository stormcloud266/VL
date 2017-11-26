const Discord = require('discord.js'),
Twit = require('twit'),
config = require("./config.json"),
request = require('request'),
fs = require('fs'),
bot = new Discord.Client();


let todaysMillis = 1511714385119, replyPhrases, helpText, tumblrInfo, eggplant, sites, derp, crab;

bot.login(config.token);

let T = new Twit({
  consumer_key:         config.consumerkey,
  consumer_secret:      config.consumersecret,
  access_token:         config.accesstoken,
  access_token_secret:  config.accesstokensecret,
  timeout_ms:           60*1000,
})



bot.on('ready', () => { bot.user.setGame('v.help') })


bot.on('message', async message => {



	if(message.content.substr(0,2).toLowerCase() !== config.prefix || message.author.bot) return;

	if(message.content.substr(0,2).toLowerCase() === config.prefix) {

		let messageCont = message.content.split(' ');
		let trigger = messageCont[0].toLowerCase().substr(2);

		

		switch (trigger) {

			case 'cats':
			case 'dogs':
			case 'food':
			case 'coffee':
				let index = Math.floor(Math.random() * 44) + 1;
				message.channel.send({
					"files": ["imgs/" + trigger + "/" + index.toString() + ".jpg"]
				});
				break;

			case 'forgiveme':
			case 'fucktrisk':
				message.channel.send({
					"files": ["imgs/" + trigger + ".jpg"]
				});
				break;

			case 'compliment':
			case 'managementpassword':
				message.reply(replyPhrases[trigger][randNum(trigger)]);
				break;

			case 'vebswisdom':
				let wiseTweet = 'https://twitter.com/VEBaring/status/' + replyPhrases[trigger][randNum(trigger)];
				message.channel.send(wiseTweet);
				break;

			case 'wiki':

				let noSpace = messageCont.splice(0,1)
				let searchTerm = messageCont.toString().replace(/,/g," ");
				getWiki(searchTerm, message.channel);
				break;

			case 'currentderp':
				getTwitter(...derp, message.channel);
				break;

			case 'currentcrab':
				getTwitter(...crab, message.channel);
				break;

			case 'help':
				message.author.send(helpText);
				break;

			case 'sitemap':
				checkSites(message.channel);
				break;

			case 'tumblr':
				getTumblr(message.channel);
				break;

			case 'eggplant':
				message.channel.send(eggplant);
				break;

			case 'brows':
				message.channel.send({
					"files": ["imgs/brows.jpg"]
				});
				break;

			case 'homies':
				message.channel.send({
					"files": ["imgs/homies.gif"]
				});
				break;

			case 'toast':
				let text = replyPhrases[trigger][randNum(trigger)]
				message.channel.send(text, {
					"files": ["imgs/toast/" + (randNum(trigger) + 1) + ".jpg"]
				})
				break;

			default:
				return;
		}

	} 

}); ///////////// end of bot on message /////////////




///////////// get and compare site data /////////////

function checkSites(channel) {
  for (var i = 0; i < sites.length; i++) {
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

  fs.readFile(__dirname + '/texts/'+ file, 'utf8', function(err, contents) {

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
      let info = JSON.parse(body)
      let millis = info.website.contentModifiedOn

      if (millis < todaysMillis) {
        channel.send('no changes at ' + link.split('.')[1])
      } else {
        channel.send('**please check ' + link + '**')
      }
  });

  
}



///////////// end of site data /////////////




function randNum(arg) {
	return index = Math.floor(Math.random() * replyPhrases[arg].length)
}



function getWiki(term, channel) {

	let searchTermHere = term;
	let url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchTermHere

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



function getTumblr(channel){

	for (let i = 0; i < tumblrInfo.length; i++) {
	let url = "https://api.tumblr.com/v2/blog/"+ tumblrInfo[i].url +"/info?api_key=" + config.tumblr_api_key
	request({
	    url: url,
	    json: true
		}, 
	function (error, response, body) {

		if(body.response.blog.posts === tumblrInfo[i].postNum) {
			channel.send('no new posts at ' + tumblrInfo[i].url);
		} else {
			channel.send('**please check ' + tumblrInfo[i].url + '**');
		}

	});
			
		}
}




function getTwitter(userID, term, link, channel) {
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






derp = [16796841, 'thederpydailycrow','https://twitter.com/margotg/status/']
crab = [864156437496307712, 'CrabADay', 'https://twitter.com/HussarArg/status/']


replyPhrases = {
	'managementpassword' : [
		'mango',
		'figure it out already omg',
		'it really isn\'t that hard',
		'um... password1?',
		'i forget...',
		'the what?',
		'the password is: sexyrav3n420',
		'idk my bff Jill',
		'*extremely VEB voice*: cow hummus grits',
		'only the dead have seen the end of management',
		'ask c0d3. he knows',
		'*flexing in the mirror...* who\'s a big strong raven? i\'m a- whoa jeez guys knock first wtf.'
	],
	'compliment' : [
		'you are so funny!',
		'you look great in that color',
		'you could make a raven blush ;)',
		'is it hot in here or is it just you',
		"you're so fine you blow my mind",
		'Your smile is contagious.',
		'You look great today.',
		'You have impeccable manners.',
		'I like your style.',
		'I appreciate you.',
		'You are the most perfect you there is.',
		'You are enough.',
		'You\'re strong.',
		'Your perspective is refreshing.',
		'You\'re an awesome friend.',
		'You light up the room.',
		'You deserve a hug right now.',
		'You should be proud of yourself.',
		'You\'re more helpful than you realize.',
		'You have a great sense of humor.',
		'You\'ve got all the right moves!',
		'Is that your picture next to "charming" in the dictionary?',
		'Your kindness is a balm to all who encounter it.',
		'On a scale from 1 to 10, you\'re a 69.',
		'You are brave.',
		'You\'re even more beautiful on the inside than you are on the outside.',
		'You have the courage of your convictions.',
		'Your eyes are breathtaking.',
		'If cartoon bluebirds were real, a bunch of them would be sitting on your shoulders singing right now.',
		'You are making a difference.',
		'You bring out the best in other people.',
		'You\'re a great listener.',
		'How is it that you always look great, even in sweatpants?',
		'Everything would be better if more people were like you!',
		'I bet you sweat glitter.',
		'You were cool way before hipsters were cool.',
		'Hanging out with you is always a blast.',
		'You always know -- and say -- exactly what I need to hear when I need to hear it.',
		'You smell really good.',
		'Being around you makes everything better!',
		'When you say, "I meant to do that," I totally believe you.',
		'When you\'re not afraid to be yourself is when you\'re most incredible.',
		'Colors seem brighter when you\'re around.'

	],
	'vebswisdom' : [
		'903996458755600384',
		'902325874162323456',
		'895454029811138560',
		'891467997247942656',
		'891463298763378689',
		'891385159429218304',
		'888034078775287809',
		'882059915665313792',
		'880212292335529985',
		'876684751322714112',
		'876640836083212289',
		'876638421988630528',
		'876574734309367812',
		'876225860856143873',
		'875542733976248320',
		'872209138238935040',
		'871920615321743361',
		'871189728019832837',
		'870824271353966592',
		'870641257038700544',
		'870589446240043009',
		'870162595830878212',
		'867640488320421888',
		'867640224850956288',
		'867059035589283842',
		'867052317908062208',
		'863911775032541184',
		'863220253656068097',
		'903870984452661248',
		'903870804982611968',
		'903868491446362112',
		'903561389330931713',
		'903558704976379905',
		'903557429849231360',
		'903557339151663105',
		'903234603971887104',
		'903225025041276928',
		'903224548149137408',
		'902772070962135040',
		'902769649728856064',
		'902339682423496704',
		'902337801513041920',
		'902337232224354304',
		'900980734462238720',
		'899804190397972481',
		'888203096714653697',
		'878109325851537408',
		'878006997903388676',
		'875606068054769665',
		'868256837090541568',
		'868130348823179264'
	],
		'toast': [
		"May the road rise up to meet you. May the wind be always at your back. May the sun shine warm upon your face; the rains fall soft upon your fields and until we meet again, may Veb hold you in the palm of His hand.",
		"Here's to those who've seen us at our best and seen us at our worst and can't tell the difference.",
		"May we get what we want, but never what we deserve.",
		"May you be in heaven half an hour before the devil knows you're dead.",
		"May your ciphers be short and your clues cryptic",
		"Here's to that long straight piece in Tetris.",
		"Here's to nights we'll never remember with friends we'll never forget.",
		"Fuck Trisk, let's get twisted",
		"Let's get slothed",
		"Fad saol agat, gob fliuch, agus bas in Eireann!",
		"Na zdrowie!",
		"I'm hella blitzed, where am I",
		"May Veb cut the toes off our foes, that we may know them by their limping."
	]

};

helpText = "\nhello! want to find hot singles in your area? lmao good luck. so type..." +
			"\n\nv.sitemap\n\tto get them cloos" +
			"\n\nv.tumblr\n\tto check some blogs" +
			"\n\nv.food\n\tto satisfy that craving" +
			"\n\nv.coffee\n\tto get your fix *bzzzzzzzzzz*" + 
			"\n\nv.cats\n\tfor a purrfect picture" + 
			"\n\nv.dogs\n\tfor a h*cking good photo" + 
			"\n\nv.brows\n\tto see them browsss" +
			"\n\nv.toast\n\tto honor your comrades" +
			"\n\nv.homies\n\tto pour one out" +
			"\n\nv.eggplant\n\tfor a nice surprise" +
			"\n\nv.compliment\n\tto light up your day" +
			"\n\nv.currentderp\n\tto see your latest dose of derp" +
			"\n\nv.currentcrab\n\tto see some longg crab" +
			"\n\nv.managementpassword\n\tfor, well, you know ;)" +
			"\n\nv.vebswisdom\n\tfor enlightment" +
			"\n\nv.forgiveme\n\tto have your sins washed away" +
			"\n\nv.fucktrisk\n\tto tell em what you think" +
			"\n\nv.wiki *your search terms*\n\tto receive knowledge" +
			"\n\tex... v.wiki red vienna";


tumblrInfo = [
	{
		url: 'oddsince1946.tumblr.com',
		postNum: 86
	},
	{
		url: 'morigganxschema.tumblr.com',
		postNum: 4
	},
	{
		url: 'paradisemasked.tumblr.com',
		postNum: 0
	},
	{
		url: 'yahdystopia.tumblr.com',
		postNum: 15
	}
]

eggplant =  ":eggplant: :eggplant: :eggplant: :eggplant: :eggplant: :eggplant:\n" +
			":eggplant: :eggplant: :eggplant: :eggplant: :eggplant: :eggplant:\n" +
			":eggplant: :eggplant: :eggplant: :eggplant: :eggplant: :eggplant:\n" +
			":eggplant: :eggplant: :eggplant: :eggplant: :eggplant: :eggplant:\n" +
			":eggplant: :eggplant: :eggplant: :eggplant: :eggplant: :eggplant:\n" +
			":eggplant: :eggplant: :eggplant: :eggplant: :eggplant: :eggplant:\n" 
sites = [
  'http://www.corvusfolio.com',
  'http://www.thesilentlibrary.org',
  'http://www.thesmokingcrow.com',
  'http://www.bigraven.com'
]
















