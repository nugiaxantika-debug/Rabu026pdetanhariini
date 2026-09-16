import pkg from 'api-dylux';
const { tiktok } = pkg;
async function run() {
  const dl = await tiktok('https://www.tiktok.com/@_nanami_1211/video/7391986481745792272');
  console.log(dl);
}
run().catch(console.error);
