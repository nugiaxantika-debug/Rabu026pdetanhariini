const axios = require('axios');
async function test() {
  try {
     const res = await axios.get("https://api.vreden.my.id/api/sertifikat?text=test&type=baik");
     console.log(res.status, res.headers['content-type']);
  } catch(e) {
     console.log(e.message);
  }
}
test();
