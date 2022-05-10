<template>
  <div :class="classToAdd" ref="container"></div>
</template>

<script lang="ts">
import Vue from "vue";
import lottie from "lottie-web";

export default Vue.extend({
  props: {
    url: {
      type: String,
      default: ""
    },
    classToAdd: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      anim: null,
      segments: {
        enter: [0, 128],
        leave: [129, 259]
      }
    };
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.container as Element,
      renderer: "canvas",
      loop: false,
      autoplay: false,
      path: this.url
    });

    this.anim.addEventListener("DOMLoaded", () => {
      this.anim.goToAndStop(1, true);
    });

    this.anim.addEventListener("complete", () => {
      this.$emit("animationComplete")
    });
  },
  methods: {
    playAnimationDoor(doorName: String) {
      const segmentToPlay =
        doorName === "enter" ? this.segments.enter : this.segments.leave;

      this.anim.playSegments(segmentToPlay, true);
    }
  },
  destroyed() {
    this.anim.destroy();
  }
});
</script>
