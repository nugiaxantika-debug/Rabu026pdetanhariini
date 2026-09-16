import axios from 'axios';
async function run() {
  try {
    const res = await axios.get(`https://danbooru.donmai.us/posts.json?tags=rating:explicit&limit=10&random=true`);
    console.log("Success", res.data.length);
  } catch (e) {
    console.log("Error:", e.message);
  }
}
run();
