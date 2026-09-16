const ytdl = require('@distube/ytdl-core');
const ytSearch = require('youtube-ext');

async function run() {
  const search = await ytSearch.search('tiktok bikini japan', { limit: 1 });
  console.log(search.videos[0].url);
  const info = await ytdl.getInfo(search.videos[0].url);
  const format = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'audioandvideo' });
  console.log(format.url);
}
run().catch(console.error);
