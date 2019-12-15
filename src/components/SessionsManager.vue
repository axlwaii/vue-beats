<template>
<div class="patterns-manager">
  <div class="patterns-manager__patterns">
    <div v-for="pattern in Object.keys(patterns)" :key="pattern" class="patterns-manager__item">
      <button @click="setPattern(pattern)">P {{ pattern }}</button>
    </div>
  </div>
  <button class="patterns-manager__add" @click="savePattern">+ Add Pattern</button>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SessionsManager',

  computed: {
    ...mapState([
      'patterns',
    ]),
  },

  methods: {
    savePattern() {
      this.$store.commit('addPattern');
    },
    setPattern(patternNumber) {
      this.$store.commit('setPattern', patternNumber);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.patterns-manager {
  position: relative;
  display: flex;
  padding: 20px 12px;
  justify-content: space-between;

  &__patterns {
    display: flex;
  }

  &__item {
    align-self: flex-start;

    button {
      cursor: pointer;
      background: rgb(200, 76, 58);
      color: #fff;
      font-weight: bold;
      border: 1px solid #111;
      padding: 10px 20px;
    }
  }

  &__add {
    cursor: pointer;
    background: darken(rgb(52, 207, 122), 20);
    color: #fff;
    font-weight: bold;
    border: 1px solid #111;
    padding: 10px 20px;
  }
}
</style>
