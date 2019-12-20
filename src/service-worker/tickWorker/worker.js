let interval = null;
let delay = 0;
let running = false;
let lastTick = null;
let currentTick = null;

const run = () => {
  if(!running) return;

  interval = setInterval(() => {
    currentTick = Date.now();

    if (currentTick >= (lastTick + delay)) {
      lastTick = currentTick;
      postMessage('next_tick');
    }
  }, 1);
};

self.addEventListener('message', (message) => {
  if(message.data.action === 'start') {
    lastTick = Date.now();
    delay = message.data.delay;
    running = true;
    run();
  }
  if(message.data.action === 'stop') {
    running = false;
    clearInterval(interval);
  }
  if(message.data.action === 'update') {
    delay = message.data.delay;
  }
});
