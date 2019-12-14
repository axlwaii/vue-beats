import PromiseWorker from 'promise-worker';
import Worker from 'worker-loader!./worker';

const worker = new Worker();
const promiseWorker = new PromiseWorker(worker);

const onMessage = func => {
  worker.onmessage = (message) => func(message);
};

const send = (delay, lastTick) => promiseWorker.postMessage({
  type: 'message',
  delay,
  lastTick,
});

export default {
  send,
  onMessage,
};
