import pkg from 'api-dylux';
const { ytv } = pkg;
async function run() {
  const dl = await ytv('https://youtube.com/watch?v=uPmcpr-sDc4');
  console.log(dl);
}
run().catch(console.error);
