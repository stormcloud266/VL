

// vebswisdom
module.exports.twitterMessage = (trigger, userURL, channel) => {
	let tweet = userURL + replyPhrases[trigger][randNum(trigger)];
	channel.send(tweet);
}


// toast
module.exports.textAndPhoto = (trigger, channel) => {
	let text = replyPhrases[trigger][randNum(trigger)]
	channel.send(text, {
		"files": [`imgs/${trigger}/` + (randNum(trigger) + 1) + ".jpg"]
	})
}


// compliment, managementpassword
module.exports.textOnly = (trigger, message) => {
	message.reply(replyPhrases[trigger][randNum(trigger)]);
}


function randNum(arg) {
	return index = Math.floor(Math.random() * replyPhrases[arg].length)
}


let replyPhrases = {
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