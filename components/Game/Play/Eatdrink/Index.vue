<template>
  <div class="game-eatdrink">
    <audio :src="sound" ref="audio" autoplay></audio>

    <img :src="assets.background" class="game-eatdrink__background" />
    <img :src="assets.bus" class="game-eatdrink__bus" />

    <div v-if="filter">
      <img :src="assets.filter" class="game-eatdrink__filter" />
      <img :src="assets.light" class="game-eatdrink__light" />
      <p class="game-eatdrink__text">OU</p>
      <GameCircleAnimation animation="blink" classToAdd="game-eatdrink__animation" />
    </div>

    <div v-else>
      <div class="game-eatdrink__icon">
        <img :src="ok ? assets.icon[0].image : assets.icon[1].image" />
      </div>

      <div @click="nextPerso" class="game-eatdrink__btn">
      <ButtonMain
        size="medium"
        color="blue"
        label="Suivant"
      />
      </div>
    </div> 

    <div class="game-eatdrink__content">
      <GamePlayEatdrinkPerso 
      side="left"
      :filter="filter"
      :perso="assets.group.left"
      :index="currentPerso"
      @clicked="verifyPerso"
      />

      <GamePlayEatdrinkPerso 
      side="right"
      :filter="filter"
      :perso="assets.group.right"
      :index="currentPerso"
      @clicked="verifyPerso"
      />
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  props: {
    assets: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      ok: "",
      filter: true,
      currentPerso: 0,
      lastPersoIndex: null,
      sound: ""
    };
  },
  mounted() {
    this.lastPersoIndex = this.assets.group.left.length - 1;
  },
  methods: {
    verifyPerso(status: String) {
      if (status == "ok") {
        this.ok = true;
        this.sound = this.$store.state.app.assets.effects.good
        this.updatePlayer();
      } else {
        this.ok = false;
        this.sound = this.$store.state.app.assets.effects.wrong
        this.updatePlayer();
        }

      this.filter = false;
      this.currentPerso++;
    },
    nextPerso() {
      const isLast = this.currentPerso == this.lastPersoIndex;

      if (isLast) this.finish();
      else {
        this.filter = true;
        this.currentPerso++;
      }
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
      changeScreen: "minigame/changeScreen"
    })
  }
});
</script>

<style lang="sass">
.game-eatdrink
    &__background
        +absolute(0, 0)
        +size(100%)
        z-index: 1

    &__bus
        +absolute(0, 0)
        +size(100%)
        z-index: 2

    &__filter
        +absolute(0, 0)
        +size(100%)
        z-index: 3

    &__light
        +absolute(0, 0)
        +size(100%)
        z-index: 4

    &__text
      color: white
      font-family: $main
      font-size: 1.3rem
      position: absolute
      bottom: 184px
      left: 433px
      z-index: 3

    &__animation
      +absolute(0, 0)
      top: 40%
      right: 50%
      opacity: 0.3
      z-index: 3

    &__icon
      position: absolute
      bottom: 165px
      left: 420px
      width: 60px
      z-index: 3

    &__btn 
      position: absolute
      right: 25px
      bottom: 25px
      z-index: 4

    &__content
        margin-top: 1rem
</style>