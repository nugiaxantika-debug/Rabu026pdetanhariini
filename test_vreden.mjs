import vredenYt from "@vreden/youtube_scraper";
async function run() {
  const ytSearch = await vredenYt.search('tiktok bikini japan');
  console.log(ytSearch.results[0].url);
  const dlRes = await vredenYt.ytmp4(ytSearch.results[0].url);
  console.log(dlRes);
}
run().catch(console.error);
