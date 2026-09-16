import vredenYt from "@vreden/youtube_scraper";
import { execFile } from 'child_process';
import util from 'util';
const execFileAsync = util.promisify(execFile);

async function run() {
  const ytSearch = await vredenYt.search('cdrama romantis klip pendek sub indo');
  const videos = ytSearch.results.filter(v => v.type === 'video');
  const dlRes = await vredenYt.ytmp4(videos[0].url, '360p');
  console.log(dlRes.download.url);
  try {
     const { stdout } = await execFileAsync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', dlRes.download.url]);
     console.log(stdout.split('\n').filter(l => l.startsWith('codec_name=v') || l.startsWith('codec_name=a') || l.startsWith('codec_name=')));
  } catch (e) {
     console.error(e.message);
  }
}
run().catch(console.error);
