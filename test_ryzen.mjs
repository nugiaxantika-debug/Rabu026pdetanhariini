async function run() {
  const res = await fetch('https://api.ryzendesu.vip/api/downloader/ytmp4?url=https://youtube.com/watch?v=m1FziaTttQk');
  const json = await res.json();
  console.log(json);
}
run().catch(console.error);
