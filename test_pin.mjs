import pkg from 'betabotz-tools';
const { pinterest } = pkg;
async function run() {
  const search = await pinterest('bikini japan');
  console.log(search);
}
run().catch(console.error);
