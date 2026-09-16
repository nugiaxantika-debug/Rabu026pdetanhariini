import { TikTokSearch } from 'tiktok-search-api';
async function run() {
  const res = await TikTokSearch('cdrama romantis', 5);
  console.log(res);
}
run().catch(console.error);
