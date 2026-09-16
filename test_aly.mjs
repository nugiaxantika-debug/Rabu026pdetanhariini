async function run() {
  const res = await fetch('https://api.alyachan.dev/api/ytdl?url=https://youtube.com/watch?v=m1FziaTttQk&apikey=alyachan');
  const json = await res.json();
  console.log(json);
}
run().catch(console.error);
