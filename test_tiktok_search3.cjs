const { TikTokSearch } = require('tiktok-search-api');
async function test() {
   const tt = new TikTokSearch();
   console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(tt)));
}
test();
