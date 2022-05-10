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
      default: "",
    },
    classToAdd: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      anim: null,
    };
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.container as HTMLElement,
      renderer: "canvas",
      loop: true,
      autoplay: true,
      path: this.url,
    });
  },
  destroyed() {
    this.anim.destroy();
  },
});
</script>
