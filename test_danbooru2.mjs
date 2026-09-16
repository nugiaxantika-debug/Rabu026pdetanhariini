import axios from 'axios';
async function run() {
  try {
    const res = await axios.get(`https://danbooru.donmai.us/posts.json?tags=rating:explicit&limit=10&random=true`);
    console.log(res.data.map(x => !!(x.file_url || x.large_file_url)));
  } catch (e) {
    console.log("Error:", e.message);
  }
}
run();
