<template>
  <div class="game-doors">
    <audio :src="sound" ref="audio" autoplay></audio>

    <img :src="assets.background" class="game-doors__background" />
    <img :src="assets.bus" class="game-doors__bus" />
    <GamePlayDoorsPropeller
      :url="assets.animations.propeller"
      classToAdd="game-doors__animation"
    />
    <GamePlayDoorsOpen
      ref="animationDoors"
      classToAdd="game-doors__animation"
      :url="assets.animations.bus"
      @animationComplete="changeCard"
    />
    <GamePlayDoorsCards
      :cards="assets.cards"
      :index="currentCardIndex"
      :color="colorCard"
      classToAdd="game-doors__cards"
    />
    <div class="game-doors__container-buttons">
      <GamePlayDoorsButton door="enter" @clicked="verifyCard" />
      <GamePlayDoorsButton door="leave" @clicked="verifyCard" />
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
      default: {}
    }
  },
  data() {
    return {
      currentCardIndex: 0,
      lastCardIndex: null,
      colorCard: "transparent",
      isVerifying: false
    };
  },
  mounted() {
    this.lastCardIndex = this.assets.cards.length - 1;
  },
  methods: {
    verifyCard(doorName: string) {
      if (this.isVerifying) return null;
      this.isVerifying = true;
      
      const isSame =
        doorName === this.assets.cards[this.currentCardIndex].door_to_select;

      if (isSame) this.correctAnswer(doorName);
      else this.wrongAnswer();
    },
    correctAnswer(doorName: string) {
      this.sound = this.$store.state.app.assets.effects.good
      this.updatePlayer();

      this.colorCard = "green";
      this.$refs.animationDoors.playAnimationDoor(doorName);
    },
    wrongAnswer() {
      this.showError = true;
      this.sound = this.$store.state.app.assets.effects.wrong
      
      this.colorCard = "red";
      this.isVerifying = false
    },
    changeCard() {
      const isLast = this.currentCardIndex === this.lastCardIndex;
      if (isLast) this.finish();
      else this.currentCardIndex++;
      this.colorCard = "transparent";
      this.isVerifying = false
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
.game-doors
    background-color: lightgrey

    &__background
        +absolute(0, 0)
        +size(100%)
        z-index: 0

    &__bus
        +absolute(0, 0)
        +size(100%)
        z-index: 1

    &__animation
        +absolute(0, 0)
        +size(100%)
        z-index: 2

    &__cards
        +absolute(0, 0)
        +size(100%)
        z-index: 3

    &__container-buttons
        +absolute(0, 0)
        +size(100%)
        z-index: 4
        padding: 0 5.7rem 1.5rem
        display: flex
        align-items: flex-end
        justify-content: space-between
        flex-direction: row-reverse
</style>
