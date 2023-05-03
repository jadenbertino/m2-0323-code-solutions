import fetch from './fetch.js';

// Keep track of app load time so each log message can be timed.
// Log messages should all be approximately 1 second apart.
const startTime = Date.now();
const getElapsedTime = () => `${Math.round((Date.now() - startTime) / 1000)}s -`;

async function throwOnce() {
  try {
    const msg = await fetch('foo', true);
    console.log(getElapsedTime(), 'throwOnce:', msg)
  } catch (error) {
    console.log(getElapsedTime(), 'throwOnce Error:', error.message);
  }
}

async function throwSeveral() {
  try {
    const msg = await fetch('foo1', true)
    console.log(getElapsedTime(), 'throwSeveral1:', msg);

    const msg2 = await fetch('foo2', true);
    console.log(getElapsedTime(), 'throwSeveral2:', msg2);

    const msg3 = await fetch('foo3', true);
    console.log(getElapsedTime(), 'throwSeveral3:', msg3)
  } catch (error) {
    console.log(getElapsedTime(), 'throwSeveral Error:', error.message);
  }
}

async function throwChained() {
  try {
    const msg1 = await fetch('foo-chain', true);
    console.log(getElapsedTime(), 'throwChained1:', msg1);

    const msg2 = await fetch(msg1, true);
    console.log(getElapsedTime(), 'throwChained2:', msg2);

    const msg3 = await fetch(msg2, true);
    console.log(getElapsedTime(), 'throwChained3:', msg3)
  } catch (error) {
    console.log(getElapsedTime(), 'throwChained Error:', error.message)
  }
}

async function throwAll() {
  await throwOnce()
  await throwSeveral()
  await throwChained()
}

throwAll()