import pkg from 'ruhend-scraper';
const { ytmp4 } = pkg;
async function run() {
  const dl = await ytmp4('https://youtube.com/watch?v=uPmcpr-sDc4');
  console.log(dl);
}
run().catch(console.error);
