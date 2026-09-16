import play from 'play-dl';

async function run() {
  const search = await play.search('tiktok bikini japan', { limit: 1 });
  const info = await play.video_info(search[0].url);
  const format = info.format.find(f => f.hasAudio && f.hasVideo);
  console.log(format.url);
}
run().catch(console.error);
