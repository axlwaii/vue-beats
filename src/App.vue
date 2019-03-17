<template>
<div id="vue-beats">
  <!-- Header -->
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
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'vue-beats',
  components: {
    HelloWorld
  },

}
</script>

<style lang="scss">
$background: #111;
$foreground: #fff;

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

#vue-beats {
}
</style>
