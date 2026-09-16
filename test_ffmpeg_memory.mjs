import ffmpegStatic from 'ffmpeg-static';
import { spawn } from 'child_process';
import vredenYt from "@vreden/youtube_scraper";
import axios from 'axios';

async function run() {
  const ytSearch = await vredenYt.search('cdrama romantis klip pendek sub indo');
  const videos = ytSearch.results.filter(v => v.type === 'video');
  const dlRes = await vredenYt.ytmp4(videos[0].url, '360p');
  console.log("Downloading:", dlRes.download.url);
  
  const res = await axios.get(dlRes.download.url, { responseType: 'stream' });
  
  const ffmpeg = spawn(ffmpegStatic, [
    '-i', 'pipe:0',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-c:a', 'aac',
    '-t', '30', // limit to 30s to keep it fast
    '-f', 'mp4',
    '-movflags', 'frag_keyframe+empty_moov',
    'pipe:1'
  ]);
  
  res.data.pipe(ffmpeg.stdin);
  
  const chunks = [];
  ffmpeg.stdout.on('data', chunk => chunks.push(chunk));
  
  ffmpeg.on('close', code => {
    console.log("Finished with code", code);
    const buffer = Buffer.concat(chunks);
    console.log("Output size:", buffer.length);
  });
}
run().catch(console.error);
