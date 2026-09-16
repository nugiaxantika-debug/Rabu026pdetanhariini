const scraper = require('@bochilteam/scraper');
async function test() {
  try {
    const res = await scraper.youtubeSearch('tiktok bikini');
    console.log("Search result length:", res.video.length);
    if (res && res.video && res.video.length > 0) {
      const vid = res.video[0];
      console.log("Downloading:", vid.url);
      const dlRes = await scraper.youtubedlv2(vid.url);
      console.log("Download result keys:", Object.keys(dlRes));
      const videoDict = dlRes.video;
      const vKeys = Object.keys(videoDict);
      console.log("Video resolutions:", vKeys);
      if (vKeys.length > 0) {
          const dlUrl = await videoDict[vKeys[0]].download();
          console.log("Download URL:", dlUrl);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
