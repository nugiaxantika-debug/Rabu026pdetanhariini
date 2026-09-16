import ffmpegStatic from 'ffmpeg-static';
import { execFile } from 'child_process';
import util from 'util';
const execFileAsync = util.promisify(execFile);

async function run() {
  console.log("ffmpeg path:", ffmpegStatic);
  try {
     const { stdout, stderr } = await execFileAsync(ffmpegStatic, ['-version']);
     console.log(stdout.split('\n')[0]);
  } catch(e) {
     console.error(e);
  }
}
run();
