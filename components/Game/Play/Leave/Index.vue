<template>
  <div class="game-leave" ref="container">

    <img :src="assets.background" class="game-leave-background" />

    <GamePlayLeaveAnimation
      :index="currentAnimation"
      :json="assets.bodymoving"
      :playIntro="$store.state.minigame.screen == 'game'"
      classToAdd="game-leave__animation"
    />

    <div class="game-leave__buttons">
      <GamePlayLeaveButtons
        :step="step"
        :index="currentAnimation"
        @wrong="wrong"
        @next="next"
        @stop="stop"
      />
    </div>

    <audio :src="sound" ref="audio" autoplay></audio>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  props: {
    assets: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      currentAnimation: 0,
      step: 0,
      $container: null as unknown as HTMLElement,
      sound: ""
    };
  },
  mounted() {
    this.$container = this.$refs.container as HTMLElement;
  },
  methods: {
    wrong() {
      this.sound = this.$store.state.app.assets.effects.wrong
      this.updatePlayer();
      const $animation = this.$container.childNodes[2];
      $animation.classList.add("incorrect");

      setTimeout(() => {
        $animation.classList.remove("incorrect");
      }, 500);
    },
    next() {
      this.sound = this.$store.state.app.assets.effects.good
      this.updatePlayer();
      this.currentAnimation++;
      this.updateStep();
    },
    updateStep() {
      if (this.currentAnimation == 4) this.step = 1;
      if (this.currentAnimation == 8) this.step = 2;
      if (this.currentAnimation == 12) this.step = 3;
    },
    stop() {
      this.sound = this.$store.state.app.assets.effects.good
      this.updatePlayer();
      this.finish();
    },
    finish() {
      this.changeScreen("finish");
    },
    updatePlayer() {
      const $audio = this.$refs.audio as HTMLAudioElement;
      if (this.$store.state.game.hasSound) $audio.play();
      else $audio.pause();
    },
    ...mapMutations({
      changeScreen: "minigame/changeScreen",
    }),
  },
});
</script>

<style lang="sass">
.game-leave
  &__background
    +absolute(0, 0)
    +size(100%)
    z-index: -1

  &__icon
    +absolute(0, 0)
    +flex-center
    z-index: 3

  &__animation
    +absolute(0, 0)
    +size(100%)
    z-index: 1

    &.incorrect
      animation: wizz 0.5s ease-in-out

  &__buttons
    +absolute(0, 0)
    +size(100%)
    z-index: 2

@keyframes wizz
    0%
        transform: translateX(0)
    10%
        transform: translateX(rem(1))
    20%
        transform: translateX(0)
    30%
        transform: translateX(rem(-1))
    40%
        transform: translateX(0)
    50%
        transform: translateX(rem(1))
    60%
        transform: translateX(0)
    70%
        transform: translateX(rem(-1))
    80%
        transform: translateX(0)
    90%
        transform: translateX(rem(1))
    100%
        transform: translateX(0)
</style>