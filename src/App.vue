<template>
<div id="vue-beats" class="vue-beats">
  <!-- Header -->
  <div class="vue-beats__header">
    <Metronom />
    <button class="vue-beats__play" v-on:click="playSet">{{playLabel}}</button>
  </div>
  <StepSequenzer />
  <SessionsManager />
  <!-- Metronom / -->
  <!-- Controls / -->
  <!-- Time / -->
  <!-- / Header -->

  <!-- Content -->
  <!-- StepSequenzer -->
  <!-- /Content -->
</div>
</template>

<script>
import { mapState } from 'vuex';
import Metronom from './components/Metronom.vue';
import StepSequenzer from './components/StepSequenzer.vue';
import SessionsManager from './components/SessionsManager.vue';

export default {
  name: 'vue-beats',
  components: {
    Metronom,
    StepSequenzer,
    SessionsManager,
  },
  computed: {
    ...mapState([
      'play',
    ]),
    playLabel: function() {
      return this.play ? "Stop" : "Play";
    }
  },
  mounted() {
    this.$store.dispatch('setupSteps', 16);
  },
  methods: {
    playSet: function() {
      if (this.play) {
        this.$store.commit('resetStep');
        this.$store.commit('setPlay', false);
        return;
      }

      this.$store.commit('setPlay', true);
    },
  }
}
</script>

<style lang="scss">
$background: #2f4154;
$foreground: #fff;

html {
  background: $background;
}

body {
  background: $background;
  color: $foreground;
  padding: 0;
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

.vue-beats__play {
  background: #444;
  color: #fff;
  height: 42px;
  width: 42px;
  font-size: 10px;
  border-radius: 50%;

  &:focus,
  &:active {
    outline: 0;
  }
}

.vue-beats__header {
  display: flex;
  background: #2f4154;
  padding: 20px;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-bottom: 10px solid darken(#2f4154, 10);
}
</style>
