import ytext from 'youtube-ext';
async function run() {
  const info = await ytext.videoInfo('https://youtube.com/watch?v=m1FziaTttQk');
  console.log(Object.keys(info));
}
run().catch(console.error);
