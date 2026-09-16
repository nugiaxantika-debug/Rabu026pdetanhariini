import pkg from 'betabotz-tools';
const { aio } = pkg;
async function run() {
  const res = await aio('https://youtube.com/watch?v=m1FziaTttQk');
  console.log(res);
}
run().catch(console.error);
