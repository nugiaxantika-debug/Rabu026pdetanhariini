const axios = require('axios');
async function test() {
  try {
    const res = await axios.post('https://tikwm.com/api/feed/search', {
        keywords: 'tiktok bikini',
        count: 10,
        cursor: 0
    });
    console.log("Response:", res.data.code);
    if (res.data && res.data.data && res.data.data.videos) {
       console.log("Videos found:", res.data.data.videos.length);
       if (res.data.data.videos.length > 0) {
          const v = res.data.data.videos[0];
          console.log("Title:", v.title);
          console.log("Play URL:", v.play);
       }
    }
  } catch (e) {
    console.error(e.message);
  }
}
test();
