import axios from 'axios';
async function run() {
  try {
    const res = await axios.head('https://cdn401.savetube.vip/media/uPmcpr-sDc4/tiktok-japanese-summer-bikini-360-ytshorts.savetube.me.mp4');
    console.log(res.headers);
  } catch (e) {
    console.log("Error:", e.message);
  }
}
run();
