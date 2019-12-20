<template>
<div
  class="sample-pad"
  v-bind:class="{ active, playing }"
  v-bind:style="{ background: active || playing ? highlightColor : null }"
  @click="selectAndPlay"
>
  <div class="sample-pad__settings">
    <div v-if="audio">
      volume: {{ this.audio.volume * 100 }}
    </div>
    sample:
    <input v-model="customAudioUrl" type="text/html">
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SamplePad',

  props: {
    audioPath: {
      type: String,
      required: true,
    },
    sampleId: {
      type: Number,
      required: true,
    },
    highlightColor: {
      type: String,
      default: '#ddd',
    },
  },

  watch: {
    customAudioUrl() {
      this.setAudio();
    },
  },

  computed: {
    ...mapState([
      'stepMode',
      'bpm',
      'activeSample',
    ]),
    active() {
      return this.sampleId === this.activeSample;
    },
  },

  mounted: function() {
    this.setAudio();
  },

  methods: {
    setAudio() {
      if (this.audio) {
        this.$el.removeChild(this.audio);
      }

      const audio = document.createElement('audio');
      const audioSource = document.createElement('source');

      audioSource.src = this.customAudioUrl;
      audio.appendChild(audioSource);

      audio.preload = true;

      this.audio = audio;

      this.$el.appendChild(audio);
    },
    selectAndPlay() {
      requestAnimationFrame(() => {
        this.$store.commit('setActiveSample', this.sampleId);
        this.play();
      });
    },
    play() {
      this.audio.currentTime = 0;
      this.audio.play();

      this.playing = true;

      setTimeout(() => {
        this.playing = false;
      }, (this.audio.duration * 1000));
    },
  },

  data: function() {
    return {
      activeState: this.active,
      activated: false,
      playing: false,
      audio: null,
      customAudioUrl: this.audioPath,
      state: {},
      locked: false,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sample-pad {
  border: 2px solid #ddd;
  background: #eee;
  padding-bottom: 100%;
  min-width: 50px;
  max-width: 100%;
  cursor: pointer;
  opacity: .5;
  box-shadow: 0 10px 5px #000;
  transform: translateY(0);
  transition: box-shadow .1s, transform .1s;

  &:hover {
    background: #ccc;
  }

  &.active {
    opacity: .7;
    background: #aaa;
    box-shadow: 0 5px 2px #000;
    transform: translateY(5px);
  }

  &.playing {
    opacity: 1;
    border-color: red;
  }

  audio {
    display: none;
  }

  &__settings {
    font-size: 12px;
    color: #000;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  input {
    width: 100%;
  }
}
</style>
