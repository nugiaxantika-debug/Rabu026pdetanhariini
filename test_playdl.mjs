import play from 'play-dl';

async function run() {
  const search = await play.search('tiktok bikini japan', { limit: 1 });
  console.log(search[0].url);
}
run().catch(console.error);
