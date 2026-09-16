const axios = require('axios');
async function test() {
  try {
     const res = await axios.get("https://api.ryzendesu.vip/api/maker/sertifikat?text=test&type=baik");
     console.log(res.status);
  } catch(e) {
     console.log(e.message);
  }
}
test();
