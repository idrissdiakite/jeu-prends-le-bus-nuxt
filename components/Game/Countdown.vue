<template>
  <div class="countdown" ref="container">
    <audio :src="sound" ref="audio" autoplay></audio>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import lottie from "lottie-web";

export default Vue.extend({
  data() {
    return {
      anim: {} as any,
      sound: ""
    };
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.container as Element,
      renderer: "canvas",
      loop: false,
      autoplay: false,
      path: this.$store.state.app.assets.bodymovings.countdown
    });

    this.anim.play();
    this.anim.addEventListener("complete", () => {
      this.$emit("finish");
    });

    this.sound = this.$store.state.app.assets.effects.countdown
    this.updatePlayer();
  },
  methods: {
    updatePlayer() {
      const $audio = this.$refs.audio as HTMLAudioElement;
      if (this.$store.state.game.hasSound) $audio.play();
      else $audio.pause();
    },
    ...mapMutations({
      changeCanPause: "game/changeCanPause"
    })
  },
  destroyed() {
    this.anim.destroy();
    this.changeCanPause(true);
  }
});
</script>

<style lang="sass">
.countdown
    +size(100%)
    +absolute(0, 0)
    z-index: 4
    +flex-center
    padding-bottom: rem(4)
    overflow: hidden
</style>
