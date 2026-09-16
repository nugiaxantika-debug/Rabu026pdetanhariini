const { ytsearch, ytmp4 } = require('api-dylux');
async function test() {
  try {
    const res = await ytsearch('tiktok bikini');
    console.log("Search result length:", res.length);
    if (res && res.length > 0) {
      const vid = res[0];
      console.log("Downloading:", vid.url);
      const dlRes = await ytmp4(vid.url);
      console.log("Download result:", JSON.stringify(dlRes, null, 2));
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
