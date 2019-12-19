import Vue from 'vue';
import Vuex from 'vuex';

import { SOUND_LIST } from './constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bpm: 120,
    activeStep: 0,
    activeSample: 0,
    stepMode: false,
    totalSteps: 16,
    stepSamples: {},
    play: false,
    sounds: SOUND_LIST,
    patterns: [],
  },
  getters: {
    getPattern(state, value) {
      return state.patterns[value];
    },
  },
  mutations: {
    setPattern(state, value) {
      state.stepSamples = JSON.parse(state.patterns[value]);
    },
    addPattern(state) {
      const stringifiedState = JSON.stringify(state.stepSamples);
      state.patterns.push(stringifiedState);
    },
    setBPM(state, value) {
      state.bpm = value;
    },
    setPlay(state, value) {
      state.play = value;
    },
    setStepMode(state, value) {
      state.stepMode = value;
    },
    increaseActiveStep(state) {
      state.activeStep = state.activeStep >= state.totalSteps
        ?
        1 : state.activeStep + 1;
    },
    resetStep(state) {
      state.activeStep = 0;
    },
    setSteps(state, value) {
      state.steps = value;
    },
    setStepSamples(state, value) {
      state.stepSamples = value;
    },
    setActiveSample(state, value) {
      state.activeSample = value;
    },
    toggleStepSample(state, step) {
      // { stepNumber: [samples]}

      if (!state.stepSamples[step]) {
        state.stepSamples[step] = [state.activeSample];
        return;
      }

      if (state.stepSamples[step].includes(state.activeSample)) {
        state.stepSamples[step]
          .splice(state.stepSamples[step].indexOf(state.activeSample), 1);
        return;
      }

      state.stepSamples[step].push(state.activeSample);
    },
    clearStepSamples(state) {
      state.stepSamples = {};
    },
  },
  actions: {
    setupSteps({ commit }, payload) {
      const samples = {};

      for(let i = 1; i < payload; i++) {
        samples[i] = [];
      }

      commit('setStepSamples', samples)
      commit('setSteps', payload);
    },
  },
});
