const Discord = require('discord.js'),
Twit = require('twit'),
config = require("./config.json"),
request = require('request'),
fs = require('fs'),

scraper = require('./scripts/scraper'),
recipe = require('./scripts/recipe'),
astrology = require('./scripts/astrology'),
deleteAndWrite = require('./scripts/deleteAndWrite'),
twitter = require('./scripts/twitter'),
wiki = require('./scripts/wiki'),
replyPhrases = require('./scripts/replyPhrases'),
weather = require('./scripts/weather'),

bot = new Discord.Client();


let helpText, tumblrInfo, eggplant, sites, derp, crab;

bot.login(config.token);


bot.on('ready', () => { bot.user.setActivity('v.help') });


bot.on('message', async message => {


	if(message.content.substr(0,2).toLowerCase() !== config.prefix || message.author.bot) return;

	if(message.content.substr(0,2).toLowerCase() === config.prefix) {

		let messageCont = message.content.split(' ');
		let trigger = messageCont[0].toLowerCase().substr(2);

		let noSpace = messageCont.splice(0,1);
		let searchTerm = messageCont.toString().replace(/,/g," ");



		switch (trigger) {

/////////// sends photos and gifs///////////
			case 'cats':
			case 'dogs':
			case 'food':
			case 'coffee':
				getPhotos(trigger, message.channel);
				break;

			case 'forgiveme':
				let num = Math.floor(Math.random() * 10);
				if (num === 6) {
					message.channel.send({
						"files": [`imgs/noforgiveness.jpg`]
					});
				} else {
					message.channel.send({
						"files": [`imgs/forgiveme.jpg`]
					});
				}
				break;

			case 'fucktrisk':
			case 'brows':
				message.channel.send({
					"files": [`imgs/${trigger}.jpg`]
				});
				break;

			case 'homies':
			case 'boom':
				message.channel.send({
					"files": [`imgs/${trigger}.gif`]
				});
				break;

			case 'toast':
				replyPhrases.textAndPhoto(trigger, message.channel)
				break;


/////////// sends text ///////////
			case 'compliment':
			case 'managementpassword':
				replyPhrases.textOnly(trigger, message)
				break;

			case 'help':
				message.author.send({ embed });
				message.react("354089417461334018");
				break;

			case 'eggplant':
				message.channel.send(eggplant);
				break;


/////////// weather ///////////
		case 'weather':
			weather.getWeather(searchTerm, message);
			break;


/////////// horoscope ///////////
		case 'aries':
		case 'taurus':
		case 'gemini':
		case 'cancer':
		case 'leo':
		case 'virgo':
		case 'libra':
		case 'scorpio':
		case 'sagittarius':
		case 'capricorn':
		case 'aquarius':
		case 'pisces':
			astrology.fetchHoroscope(trigger, message.channel);
			break;


/////////// twitter, tumblr, and wikipedia ///////////
			case 'currentderp':
				twitter.getTwitter(...derp, message.channel);
				break;

			case 'currentcrab':
				twitter.getTwitter(...crab, message.channel);
				break;

			case 'vebswisdom':
				replyPhrases.twitterMessage(trigger, 'https://twitter.com/VEBaring/status/', message.channel)
				break;

			case 'recipe':
				recipe.getTumblr('daily-deliciousness', message.channel);
				break;

			case 'wiki':
				wiki.getWiki(searchTerm, message.channel);
				break;


/////////// sitemap and scraper ///////////
			case 'sitemap':
				scraper.checkSites(sites, message.channel);
				break;

			case 'deleteandwrite':
				if (message.author.id == '308072773320835092') {
					deleteAndWrite.deleteFiles(sites, message.channel)
				} else (message.channel.send('you do not have permission to do this'))
				break;

			case 'updatemillis':
				if (message.author.id == '308072773320835092') {
					scraper.updateMillis(message.channel)
				} else (message.channel.send('you do not have permission to do this'))
				break;



/////////// default ///////////
			default:
				return;

		} /////// end of switch ///////

	}

}); ///////////// end of bot on message /////////////


function getPhotos(trigger, channel) {
	let index = Math.floor(Math.random() * 44) + 1;
	channel.send({
		"files": [`imgs/${trigger}/${index.toString()}.jpg`]
	});
}


derp = [16796841, 'thederpydailycrow','https://twitter.com/margotg/status/'];
crab = [864156437496307712, 'CrabADay', 'https://twitter.com/HussarArg/status/'];



eggplant =  ":eggplant: :eggplant: :eggplant: :eggplant: :eggplant: :eggplant:\n" +
			":eggplant: :eggplant: :eggplant: :eggplant: :eggplant: :eggplant:\n" +
			":eggplant: :eggplant: :eggplant: :eggplant: :eggplant: :eggplant:\n" +
			":eggplant: :eggplant: :eggplant: :eggplant: :eggplant: :eggplant:\n" +
			":eggplant: :eggplant: :eggplant: :eggplant: :eggplant: :eggplant:\n" +
			":eggplant: :eggplant: :eggplant: :eggplant: :eggplant: :eggplant:\n";
sites = [
  'http://www.corvusfolio.com',
  'http://www.thesilentlibrary.org',
  'http://www.thesmokingcrow.com',
  'http://www.bigraven.com'
];


const embed = {
  "title": "May Veb's Light shine upon you.",
  "description": "Hello! Do you want to find hot singles in your area?\nIf so, please click [here](https://www.fbi.gov/)!\nOtherwise, continue reading to learn all about this mostly useless bot.\n\n",
  "color": 4627620,
  "timestamp": "2017-12-08T22:01:15.013Z",
  "footer": {
    "icon_url": "https://pbs.twimg.com/profile_images/886441041993244672/6O2s50bx_400x400.jpg",
    "text": "You put the 'rad' in comrade. <3"
  },
  "fields": [
    {
      "name": "Eat, drink, and pet an animal.",
      "value": "v.food\nv.recipe\nv.coffee\nv.cats\nv.dogs\nv.brows"
    },
    {
      "name": "Useful things",
      "value": "v.sitemap\n\tGets that good shit from the main sites.\nv.weather [city or postal code]\n\tgets current weather and tomorrow's forecast\nv.wiki search terms here\n\tSearches wikipedia for... things."
    },
    {
      "name": "Twitter related adventures",
      "value": "v.currentderp\nv.currentcrab\nv.vebswisdom"
    },
    {
      "name": "Horoscope",
      "value": "v.yoursign (e.g., v.scorpio)"
    },
    {
      "name": "The rest",
      "value": "v.homies\nv.toast\nv.eggplant\nv.compliment\nv.managementpassword\nv.forgiveme\nv.fucktrisk\nv.boom"
    }
  ]
};
