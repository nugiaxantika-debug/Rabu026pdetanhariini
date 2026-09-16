const vredenYt = require('@vreden/youtube_scraper');
async function test() {
  try {
    const res = await vredenYt.search('tiktok bikini');
    console.log("Search result:", JSON.stringify(res, null, 2));
    if (res.results && res.results.length > 0) {
      const vid = res.results.find(v => v.type === 'video');
      console.log("Downloading:", vid.url);
      const dlRes = await vredenYt.ytmp4(vid.url);
      console.log("Download result:", JSON.stringify(dlRes, null, 2));
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
