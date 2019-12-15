<template>
<div
  class="sample-pad"
  v-bind:class="{ active, playing }"
  v-bind:style="{ background: active || playing ? highlightColor : null }"
  @click="selectAndPlay"
>
  <input v-model="customAudioUrl" type="text/html">
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
    active: {
      type: Boolean,
      default: false,
    },
    playing: {
      type: Boolean,
      default: false,
    },
    highlighted: {
      type: Boolean,
      default: false,
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
    ]),
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

      this.audio = audio;

      this.$el.appendChild(this.audio);
    },
    selectAndPlay() {
      this.$store.commit('setActiveSample', this.sampleId);
      this.play();
    },
    play() {
      this.audio.fastSeek(0);
      this.audio.play();
    },
  },

  data: function() {
    return {
      activeState: this.active,
      activated: false,
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

  audio,
  input {
    display: none;
  }
}
</style>