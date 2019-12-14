import registerPromiseWorker from 'promise-worker/register';

registerPromiseWorker((message) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      postMessage('next_tick');
      resolve();
    }, message.delay);
  });
});
