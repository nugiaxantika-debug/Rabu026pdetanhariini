import vredenYt from "@vreden/youtube_scraper";
async function run() {
  const ytSearch = await vredenYt.search('tiktok bikini japan');
  const dlRes = await vredenYt.ytmp4(ytSearch.results[0].url, '720p');
  console.log(dlRes.download.url);
}
run().catch(console.error);
