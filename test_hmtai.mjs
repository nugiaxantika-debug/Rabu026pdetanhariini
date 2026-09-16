import hmtai from 'hmtai';
const hm = new hmtai();
async function run() {
  console.log("nsfw.hentai:", await hm.nsfw.hentai());
}
run().catch(console.error);
