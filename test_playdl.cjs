const play = require('play-dl');
async function test() {
  try {
    const res = await play.search('tiktok bikini', { limit: 1 });
    console.log("Search result length:", res.length);
    if (res && res.length > 0) {
      const vid = res[0];
      console.log("Downloading:", vid.url);
      const stream = await play.stream(vid.url);
      console.log("Stream:", stream.url);
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
