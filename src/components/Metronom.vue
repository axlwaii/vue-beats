<template>
<div class="metronom">
  Latency: {{ tickDelay }}ms
  <div class="metronom__rythm">
    BPM:
    <input type="number" v-model="customBpm">
  </div>
  <div class="metronom__feedback">
    <MetronomIndicator :active="isActivateIndicator(1)" :key="activeIndicator" />
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import worker from '../service-worker/tickWorker';
import MetronomIndicator from './MetronomIndicator.vue';

export default {
  name: 'Metronom',

  components: {
    MetronomIndicator
  },

  computed: {
    ...mapState([
      'bpm',
      'play',
    ]),
    delay() {
      return 60000/(this.customBpm * 4);
    },
  },

  watch: {
    play(newValue) {
      if(newValue) {
        this.run();
      } else {
        worker.postMessage({
          action: 'stop',
        });
        this.activeIndicator = null;
      }
    },
    delay() {
      if (this.play) {
        worker.postMessage({
          action: 'update',
          type: 'message',
          delay: this.delay,
        });
      }
    },
  },

  mounted() {
    worker.onmessage = () => {
      this.$store.commit('increaseActiveStep');
      this.activeIndicator = this.getNextActiveIndicator();

      this.tickDelay = Math.ceil(Date.now() - this.lastTick - this.delay);
      this.lastTick = Date.now();

      if (this.soundEnabled) this.beep();
    };
  },

  methods: {
    run: function() {
      this.lastTick = Date.now();

      worker.postMessage({
        action: 'start',
        type: 'message',
        delay: this.delay,
      });
    },

    getNextActiveIndicator: function() {
      return this.activeIndicator === null || this.activeIndicator >= this.indicators
        ?
        1 : this.activeIndicator + 1;
    },

    /* Returns the true if given number equals the active indicator */
    isActivateIndicator: function(number) {
      return this.activeIndicator === number;
    },

    /* Returns beep sound */
    beep: function() {
      const context = new AudioContext();
      const oscillator = context.createOscillator(); // Oscillator defaults to sine wave

      if (this.activeIndicator === 1) {
        oscillator.type = 'square';
      }

      oscillator.connect(context.destination);
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 50);
    }
  },

  data() {
    return {
      customBpm: 120,
      lastTick: Date.now(),
      tickDelay: 0,
      activeIndicator: null,
      indicators: 4,
      soundEnabled: false,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  box-sizing: border-box;
}

.metronom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  padding: 0;

  &__feedback {
    display: flex;
    margin-left: 20px;
    align-items: center;
  }

  &__rythm {
    font-size: 12px;
    text-align: left;
    padding: 0;
    margin-left: 20px
  }

  select,
  &__rythm input {
    margin-left: 10px;
    background: #111;
    color: #fff;
    border: 1px solid #111;
    padding: 5px 0 5px 10px;
    width: 80px;
    text-align: center;
    box-shadow: 5px 5px 10px
                    rgba(255, 255, 255, 0.2) inset;
    height: 32px;
  }
}

</style>
