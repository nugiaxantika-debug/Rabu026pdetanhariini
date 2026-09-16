const axios = require('axios');
const cheerio = require('cheerio');
async function test() {
  try {
     const res = await axios.get("https://html.duckduckgo.com/html/?q=" + encodeURIComponent("site:youtube.com tiktok bikini compilation"));
     const $ = cheerio.load(res.data);
     const urls = [];
     $('a.result__a').each((i, el) => {
        urls.push($(el).attr('href'));
     });
     console.log("URLs:", urls);
  } catch(e) {
     console.log(e.message);
  }
}
test();
