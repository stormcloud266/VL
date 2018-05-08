const request = require('request');
const config = require('../config.json');

// const getRecommendations = (channel, messageCont) => {
module.exports.getRecommendations = (channel, messageCont) => {

  const messageArr = messageCont.filter(word => word.length > 0);
  const isType = messageArr.indexOf('-t') !== -1;
  const isLimit = messageArr.indexOf('-r') !== -1;

	let recSearchTerms,
			type,
      limit,
      typeFlagIndex,
      limitFlagIndex;

	if (isType) {
    typeFlagIndex = messageArr.indexOf('-t');
		type = messageArr.splice(typeFlagIndex + 1, 1).join();
	}
  if (isLimit) {
    limitFlagIndex = messageArr.indexOf('-r');
		limit = messageArr.splice(limitFlagIndex + 1, 1).join();
  }

  if (isType || isLimit) {
    typeFlagIndex = typeFlagIndex === undefined ? messageArr.length : typeFlagIndex;
    limitFlagIndex = limitFlagIndex === undefined ? messageArr.length : limitFlagIndex;

    const searchTermIndex = typeFlagIndex < limitFlagIndex ? typeFlagIndex : limitFlagIndex;

    recSearchTerms = messageArr.splice(0, searchTermIndex).join(' ')
  } else {
    recSearchTerms = messageArr.join(' ')
  }
  const availableTypes = ['music', 'movies', 'shows', 'books', 'authors', 'games']
  type = availableTypes.includes(type) ? type : undefined;

  searchTerms = encodeURI(recSearchTerms);
  handleRequest(channel, recSearchTerms, type, limit)
}

const handleRequest = (channel, searchTerms, type, limit) => {
  type = type ? `&type=${type}` : '';

  if (limit) {
    if (limit > 20) {
      limit = 20
    } else if (limit < 1) {
      limit = 1
    }
  } else {
    limit = 5
  }

  const url = `https://tastedive.com/api/similar?q=${searchTerms}${type}&info=1&k=${config.tastediveAPI}&limit=${limit}`;

  request(url, (err, res, body) => {
    if (!err && res.statusCode == 200) {
      getData(channel, limit, JSON.parse(body));
     }
  })
}

const getData = (channel, limit, data) => {
  data = data.Similar
  let embed = {
    "title": "",
    "description": "",
    "color": 4627620,
    "fields": [

    ]
  };


  if (data.Type !== 'unknown') {

    const searchName = data.Info[0].Name;
    const searchWiki = data.Info[0].wUrl;

    if (data.Results.length > 0) {
      embed.title = `Similar to ${searchName}`;
      embed.description = `<${searchWiki}>\n----------`;

      for (let i = 0; i < limit; i++) {
        result = data.Results[i];
        let value = result.yID;
        if ( value === null) {
          value = result.wUrl
        } else {
          value = `https://www.youtube.com/watch?v=${value}`
        }

        embed.fields.push({
          "name": `${result.Name}`,
          "value": `${result.Type}: ${value}`
        });
      }
      channel.send({ embed })
    } else {
      channel.send('I couldn\'t find any results of that type.')
    }
  } else {
    channel.send('I couldn\'t find what you were looking for.');
  }
}
