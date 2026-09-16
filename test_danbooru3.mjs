import axios from 'axios';
async function run() {
  try {
    const res = await axios.get(`https://danbooru.donmai.us/posts.json?tags=rating:explicit&limit=10&random=true`);
    const item = res.data.find(x => x.file_url || x.large_file_url);
    const imageUrl = item.file_url || item.large_file_url;
    console.log("Image URL:", imageUrl);
    const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    console.log("Image length:", imgRes.data.length);
  } catch (e) {
    console.log("Error:", e.message);
  }
}
run();
