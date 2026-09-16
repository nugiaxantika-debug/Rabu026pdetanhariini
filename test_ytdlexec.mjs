import youtubedl from 'youtube-dl-exec';
async function run() {
  const output = await youtubedl('https://youtube.com/watch?v=m1FziaTttQk', {
    dumpJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'
  });
  console.log(output.url);
}
run().catch(console.error);
