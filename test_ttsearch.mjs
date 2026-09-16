import TTSearch from 'tiktok-search-api';
async function run() {
  const res = await TTSearch.search('cdrama romantis', { number: 5 });
  console.log(res);
}
run().catch(console.error);
