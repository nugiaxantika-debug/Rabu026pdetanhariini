import { youtubedl, youtubedlv2, youtubeSearch } from '@bochilteam/scraper';
async function run() {
  const search = await youtubeSearch('tiktok bikini japan');
  const url = search.video[0].url;
  console.log(url);
  const dl = await youtubedlv2(url);
  console.log(Object.keys(dl.video));
}
run().catch(console.error);
