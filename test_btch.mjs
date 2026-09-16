import pkg from 'btch-downloader';
const { yts, youtube } = pkg;
async function run() {
  const search = await yts('tiktok bikini japan');
  console.log(search[0]);
  const dl = await youtube(search[0].url);
  console.log(dl);
}
run().catch(console.error);
