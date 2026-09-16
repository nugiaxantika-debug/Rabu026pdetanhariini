import pkg from 'btch-downloader';
const { tiktok } = pkg;
async function run() {
  const res = await tiktok('https://www.tiktok.com/@mr.y144/video/7331908226066238725');
  console.log(res);
}
run().catch(console.error);
