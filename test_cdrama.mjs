import vredenYt from "@vreden/youtube_scraper";
async function run() {
  const ytSearch = await vredenYt.search('cdrama romantis klip pendek sub indo');
  const videos = ytSearch.results.filter(v => v.type === 'video');
  console.log("Found:", videos[0].url);
}
run().catch(console.error);
