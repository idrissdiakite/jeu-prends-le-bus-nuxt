<template>
  <div class="game-validate">
    <audio :src="sound" ref="audio" autoplay></audio>

    <img :src="assets.background" class="game-validate__background" />
    <img :src="assets.background2" class="game-validate__background--front" />

    <GamePlayValidateValidators
      :validators="assets.validators"
      :wait="wait"
      :ok="ok"
      :ko="ko"
      classToAdd="game-validate__validators"
    />

    <GamePlayValidateUsers
      :users="users"
      :index="currentUserIndex"
      :svg1="svg1"
      :svg2="svg2"
      @founded="founded"
      :ok="ok"
      :ko="ko"
    />
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
      raf: null,
      timeOut: null,
      currentUserIndex: 0,
      lastUserIndex: null,
      userLeft: "",
      wait: true,
      users: [],
      ko: false,
      ok: false,
      svg1: true,
      svg2: true,
      sound: ""
    };
  },
  mounted() {
    this.newArray();
    this.raf = window.requestAnimationFrame(this.checkIfHasStarted);
  },
  methods: {
    // on crée un nouveau tableau de users
    newArray() {
      this.users.ok = [...this.assets.users.ok];
      this.users.ko = [...this.assets.users.ko];
    },
    checkIfHasStarted() {
      // on lance la fonction startCountdown une fois qu'on a cliqué sur le bouton "Jouer"
      if (this.$store.state.minigame.screen === "game") this.startCountdown();
      else this.raf = window.requestAnimationFrame(this.checkIfHasStarted);
    },
    startCountdown() {
      this.timeOut = setTimeout(() => {
        // toutes les 5s, on vérifie si le perso est ok ou ko
        this.verifyUser();
      }, 5000);
    },
    founded() {
      this.ok = true;
      this.wait = false;
      this.sound = this.$store.state.app.assets.effects.good
      this.updatePlayer();
      // si le ticket a été trouvé, on coupe le setTimeout
      clearTimeout(this.timeOut);

      setTimeout(() => {
        // on change de perso et relance le compte à rebours
        this.nextUser();
        this.startCountdown();
      }, 1500);
    },
    verifyUser() {
      if (!this.ok) {
        this.wait = false;
        this.ko = true;
        this.sound = this.$store.state.app.assets.effects.wrong
        this.updatePlayer();

        this.pushUser();
        // si le perso est ko, on passe au perso suivant et on relance le compte à rebours
        setTimeout(() => {
          this.nextUser();
          this.startCountdown();
        }, 1500);
      }
    },
    pushUser() {
      this.users.ko.push(this.users.ko[this.currentUserIndex]);
      this.users.ok.push(this.users.ok[this.currentUserIndex]);
    },
    nextUser() {
      this.checkUserLeft();
      const isLast = this.currentUserIndex == this.lastUserIndex;

      if (isLast) this.finish();
      else {
        this.wait = true;
        this.ok = false;
        this.ko = false;
        this.currentUserIndex++;
      }
    },
    checkUserLeft() {
      this.lastUserIndex = this.users.ko.length - 1;
      this.userLeft = this.lastUserIndex - this.currentUserIndex;
      if (this.userLeft == 2) this.svg2 = false;
      if (this.userLeft == 1) this.svg1 = false;
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
.game-validate
    &__background
        +absolute(0, 0)
        +size(100%)
        z-index: 0

        &--front 
          +absolute(0, 0)
          +size(100%)
          z-index: 1

    &__validators
        +absolute(0, 0)
        +size(100%)
        z-index: 1
        
</style>

