const yt = require('youtube-ext');
async function test() {
  try {
    const res = await yt.search('tiktok bikini');
    if (res.videos && res.videos.length > 0) {
      const vid = res.videos[0];
      const dlRes = await yt.videoInfo(vid.url);
      console.log("Stream keys:", Object.keys(dlRes.stream || {}));
      console.log("Formats:", (dlRes.stream?.formats || []).length);
      const mp4Formats = (dlRes.stream?.formats || []).filter(f => f.mimeType && f.mimeType.includes('video/mp4'));
      if (mp4Formats.length > 0) {
          console.log("MP4 url:", mp4Formats[0].url);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
