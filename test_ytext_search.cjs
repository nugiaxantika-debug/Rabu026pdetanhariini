const yt = require('youtube-ext');
async function test() {
  try {
    const res = await yt.search('tiktok bikini');
    console.log("Search result length:", res.videos.length);
    if (res.videos.length > 0) {
       console.log("First video URL:", res.videos[0].url);
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
