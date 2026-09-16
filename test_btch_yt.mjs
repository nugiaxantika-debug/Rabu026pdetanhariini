import pkg from 'btch-downloader';
const { youtube } = pkg;
async function run() {
  try {
    const res = await youtube('https://youtube.com/watch?v=uPmcpr-sDc4');
    console.log(res);
  } catch (e) {
    console.log("Error:", e.message);
  }
}
run();
