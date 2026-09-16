import { tiktokSearch } from '@bochilteam/scraper';
async function run() {
  const search = await tiktokSearch('bikini japan');
  console.log(search);
}
run().catch(console.error);
