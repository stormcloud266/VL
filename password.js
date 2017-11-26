const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

nightmare
  .goto('http://www.thesilentlibrary.org/enlightenment', {'User-Agent': 'request'})
  .type('input[type=password]', 'lyre')
  .wait(1000)
  .type('input[type=password]', '\u000d')
  // .wait('#r1-0 a.result__a')
  // .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
  // .end()
  // .then(console.log)
  .catch((error) => {
    console.error('Search failed:', error);
  });

