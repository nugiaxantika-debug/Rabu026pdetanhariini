const btch = require('btch-downloader');
async function test() {
   try {
      console.log("yts:", btch.yts);
      const res = await btch.yts('tiktok bikini');
      console.log("BTCH yts length:", res.length);
      if (res.length > 0) {
          const v = res[0];
          console.log("URL:", v.url);
          const dl = await btch.youtube(v.url);
          console.log("DL keys:", Object.keys(dl));
          if (dl.mp4) console.log("MP4:", dl.mp4);
      }
   } catch (e) {
      console.error(e.message);
   }
}
test();
