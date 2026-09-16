import pkg from 'api-dylux';
async function run() {
  console.log(Object.keys(pkg));
}
run().catch(console.error);
