<template>
  <div :class="`game-leave-animation ${classToAdd}`" ref="container"></div>
</template>

<script lang="ts">
import Vue from "vue";
import lottie from "lottie-web";

export default Vue.extend({
  props: {
    classToAdd: String,
    index: Number,
    json: String,
    playIntro: Boolean,
  },
  data() {
    return {
      anim: {} as any,
      animations: [
        [1, 11],
        [12, 23],
        [24, 35],
        [36, 47],
        [48, 71],
        [72, 83],
        [84, 94],
        [95, 106],
        [107, 129],
        [130, 146],
        [147, 158],
        [159, 170],
        [172, 374],
      ],
      maxValue: 9999999,
    };
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.container as Element,
      renderer: "canvas",
      loop: false,
      autoplay: false,
      path: this.json,
    });
  },
  watch: {
    playIntro(newValuePlayIntro: Boolean) {
      if (newValuePlayIntro) this.anim.playSegments(this.animations[this.index], true);
    },
    index(newValueIndex: number) {
      this.anim.playSegments(this.animations[newValueIndex], true);
    },
  },
  destroyed() {
    this.anim.destroy();
  },
});
</script>

<style lang="sass">
</style>