<template>
<div class="step-sequenzer">
  <div class="step-sequenzer__steps">
    <div class="step-sequenzer__step" v-for="step in totalSteps" :key="step">
      <input
        :class="{
                activated: inStepSample(step),
                active: isActivatedStep(step),
                indicator: activeStep === step
        }"
        class="step-sequenzer__sequenz"
        @click="toggleStep(step)"
        type="button"
      />
      <SamplePad
        :ref="'pad-' + step"
        :audio-path='sounds[step-1]'
        :sample-id="step"
        :highlight-color="getColor(step)"
      />
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

import SamplePad from './SamplePad.vue';
import { COLORS } from '../constants';

export default {
  name: 'StepSequenzer',
  components: {
    SamplePad
  },
  computed: {
    ...mapState([
      'totalSteps',
      'activeStep',
      'activeSample',
      'sounds',
      'stepMode',
      'stepSamples',
    ]),
    activeStepSamples() {
      return this.stepSamples[this.activeStep] || [];
    },
  },
  watch: {
    activeStep() {
      this.activeStepSamples.forEach((stepSample) => {
        this.$refs[`pad-${stepSample}`][0].play();
      });
    },
  },
  methods: {
    getColor(step) {
      if(!COLORS[step]) {
        return COLORS[step - COLORS.length];
      }

      return COLORS[step];
    },
    toggleStep(step) {
      this.$store.commit('toggleStepSample', step);
    },
    isActivatedStep(step) {
      if(!this.stepSamples[step]) return;

      return this.stepSamples[step].includes(this.activeSample);
    },
    inStepSample(step) {
      if(!this.stepSamples[step]) return false;

      return this.stepSamples[step].length > 0;
    },
  },

  data: function() {
    return {
      audio: null,
      stepModeCheckbox: this.stepMode,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.step-sequenzer {
  background: darken(#2f4154, 5);
  border-bottom: 10px solid darken(#2f4154, 10);

  .step-sequenzer__steps {
    display: flex;
    flex-wrap: wrap;
  }

  &__sequenz{
    display: block;
    background: red;
    opacity: .5;
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &.active {
      opacity: 1;
      background: rgb(76, 175, 80);
    }

    &:not(.active):not(.indicator).activated {
      opacity: .9;
      background: rgb(244, 67, 54);
    }

    &.indicator {
      opacity: 1;
      background: rgb(3, 169, 244) none repeat scroll 0% 0%;;
    }
  }

  &__step {
    position: relative;
    width: 25%;
    padding: 10px;
  }

  @media all and (min-width: 900px) {

    .step-sequenzer__step {
      position: relative;
      width: 12.5%;
      padding: 10px;
    }
  }
}
</style>
