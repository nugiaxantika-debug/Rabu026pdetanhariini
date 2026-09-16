import ytext from 'youtube-ext';
async function run() {
  const info = await ytext.videoInfo('https://youtube.com/watch?v=m1FziaTttQk');
  console.log(info.formats.filter(f => f.hasAudio && f.hasVideo));
}
run().catch(console.error);
