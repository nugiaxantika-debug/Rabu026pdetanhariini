import ytdl from '@distube/ytdl-core';
async function run() {
  const info = await ytdl.getInfo('https://www.youtube.com/watch?v=uPmcpr-sDc4');
  const format = ytdl.chooseFormat(info.formats, { quality: '18' }); // 360p with audio
  console.log(format.url);
}
run().catch(console.error);
