import axios from 'axios';
async function run() {
  try {
    const res = await axios.post('https://tikwm.com/api/feed/search', { keywords: 'bikini japan', count: 10 });
    console.log(res.data.data.videos.length);
    console.log(res.data.data.videos[0].play);
  } catch (e) {
    console.log("Error:", e.message);
  }
}
run();
