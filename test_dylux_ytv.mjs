import pkg from 'api-dylux';
const { ytv } = pkg;
async function run() {
  try {
    const res = await ytv('https://youtube.com/watch?v=uPmcpr-sDc4');
    console.log(res);
  } catch (e) {
    console.log("Error:", e.message);
  }
}
run();
