import akaneko from 'akaneko';

async function run() {
  console.log("hentai:", await akaneko.nsfw.hentai());
  console.log("bdsm:", await akaneko.nsfw.bdsm());
  console.log("pussy:", await akaneko.nsfw.pussy());
}
run().catch(console.error);
