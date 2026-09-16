import xnxx from 'xnxx-scraper';
async function run() {
  const search = await xnxx.search('japan bikini');
  console.log("Search length:", search.length);
  if (search.length > 0) {
     const dl = await xnxx.download(search[0].link);
     console.log(dl);
  }
}
run().catch(console.error);
