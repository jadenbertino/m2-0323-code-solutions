import fetch from './fetch.js';

// Keep track of app load time so each log message can be timed.
// Log messages should all be approximately 1 second apart.
const startTime = Date.now();
const getElapsedTime = () => `${Math.round((Date.now() - startTime) / 1000)}s -`;

async function fetchOnce() {
  const msg = await fetch('foo/bar.html')
  console.log(getElapsedTime(), 'fetchOnce:', msg);
}

async function fetchSeveral() {
  const msg1 = await fetch('foo1/bar.html')
  console.log(getElapsedTime(), 'fetchSeveral1:', msg1);

  const msg2 = await fetch('foo2/bar.html');
  console.log(getElapsedTime(), 'fetchSeveral2:', msg2);

  const msg3 = await fetch('foo3/bar.html');
  console.log(getElapsedTime(), 'fetchSeveral3:', msg3);
}

async function fetchChained() {
  const msg1 = await fetch('foo-chain/bar.html')
  console.log(getElapsedTime(), 'fetchChained1:', msg1);
  
  const msg2 = await fetch(msg1)
  console.log(getElapsedTime(), 'fetchChained2:', msg2);

  const msg3 = await fetch(msg2)
  console.log(getElapsedTime(), 'fetchChained3:', msg3);
}

async function fetchAll() {
  await fetchOnce()
  await fetchSeveral()
  await fetchChained()
}

fetchAll()