const yt = require('youtube-ext');
console.log(Object.keys(yt));
async function test() {
  try {
    const res = await yt.search('tiktok bikini');
    console.log("Search result length:", res.videos.length);
    if (res.videos && res.videos.length > 0) {
      const vid = res.videos[0];
      console.log("Downloading:", vid.url);
      const dlRes = await yt.videoInfo(vid.url);
      console.log("Download result keys:", Object.keys(dlRes));
      console.log("Formats:", dlRes.formats.length);
      const mp4Formats = dlRes.formats.filter(f => f.mimeType && f.mimeType.includes('video/mp4'));
      if (mp4Formats.length > 0) {
          console.log("MP4 url:", mp4Formats[0].url);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
