async function run() {
  const res = await fetch('https://api.botcahx.eu.org/api/dowloader/ytmp4?url=https://youtube.com/watch?v=m1FziaTttQk&apikey=admin');
  const json = await res.json();
  console.log(json);
}
run().catch(console.error);
