import ytext from 'youtube-ext';
async function run() {
  const info = await ytext.videoInfo('https://youtube.com/watch?v=m1FziaTttQk');
  const formats = info.formats || [];
  console.log("Formats:", formats.length);
  const mp4AudioVideo = formats.filter(f => f.mimeType && f.mimeType.includes('video/mp4') && f.hasAudio && f.hasVideo);
  console.log(mp4AudioVideo.map(f => f.url).filter(Boolean));
}
run().catch(console.error);
