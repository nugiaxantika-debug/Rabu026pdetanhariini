import pkg from 'ruhend-scraper';
const { ytsearch, ytmp4 } = pkg;
async function run() {
  const search = await ytsearch('tiktok bikini japan');
  console.log(search[0].url);
  const dl = await ytmp4(search[0].url);
  console.log(dl);
}
run().catch(console.error);
