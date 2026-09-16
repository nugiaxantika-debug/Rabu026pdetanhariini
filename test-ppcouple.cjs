const axios = require('axios');
async function test() {
  try {
    const { data } = await axios.get("https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json");
    const randomCouple = data[Math.floor(Math.random() * data.length)];
    console.log(randomCouple);
  } catch (e) {
    console.error(e);
  }
}
test();
