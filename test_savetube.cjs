const axios = require('axios');
const url = "https://cdn406.savetube.vip/media/gvkPCHIBgn8/cute-pinay-tiktok-compilation-tiktok-trends-360-ytshorts.savetube.me.mp4";
axios.get(url, { responseType: 'stream' })
  .then(res => {
     console.log("Status:", res.status);
     console.log("Headers:", res.headers['content-type']);
  })
  .catch(err => {
     console.error("Error:", err.response ? err.response.status : err.message);
  });
