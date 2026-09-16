import pkg from '@xct007/frieren-scraper';
const { youtube } = pkg;
async function run() {
  const res = await youtube.download('https://youtube.com/watch?v=m1FziaTttQk');
  console.log(res);
}
run().catch(console.error);
