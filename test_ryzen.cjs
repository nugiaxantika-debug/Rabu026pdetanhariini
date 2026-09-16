const axios = require('axios');
async function test() {
  try {
    const res = await axios.get('https://api.ryzendesu.vip/api/search/youtube?search=tiktok%20bikini');
    let arr = Array.isArray(res.data) ? res.data : Object.values(res.data);
    console.log("arr[0]:", typeof arr[0], arr[0]);
  } catch(e) {
    console.error(e.message);
  }
}
test();
