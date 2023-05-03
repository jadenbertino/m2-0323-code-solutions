/**
 * Simulates a network call by delaying for one second and returning a message.
 * If `doReject` is truthy, it will reject the Promise, otherwise it will resolve.
 * Uses `setTimeout` to mimic a slow network connection.
 */
export default function fetch(url, doReject) {
  return new Promise((resolve, reject) => {
    return setTimeout(() =>
      doReject
        ? reject(new Error(`rejected ${url}`))
        : resolve(`fetched ${url}`), 1000);
  });
}
