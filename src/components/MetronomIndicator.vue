<template>
  <div class="metronom-indicator">
    <div v-bind:class="{ active: isActive }"></div>
  </div>
</template>

<script>
export default {
  name: 'MetronomIndicator',

  props: {
    active: Boolean
  },

  data() {
    return {
      isActive: this.active,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.metronom-indicator {

    div {
        height: 10px;
        width: 10px;
        border: 1px solid #fff;
        border-radius: 50%;
    }

    .active {
        background: #8CB3B0;
    }
}
</style>
