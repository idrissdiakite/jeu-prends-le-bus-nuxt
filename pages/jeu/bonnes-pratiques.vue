<template>
  <div class="good-practices">
    <DialogueSlideshow
      v-if="$store.state.progress.game === 0"
      :id="$store.state.app.steps.future.dialogues_start"
    />
    <Hub
      v-else
      :acf="acf"
      :isShowingGame="isShowingGame"
      :currentDialogue="currentDialogue"
      :differenceIndex="differenceIndex"
      @startTransition="startTransition"
      @preloadGame="preloadGame"
      @newDialogue="newDialogue"
      classToAdd="good-practices__hub"
    />
    <Game
      v-if="gameId !== null"
      :isShowingGame="isShowingGame"
      :canPlayGame="canPlayGame"
      :id="gameId"
      class="good-practices__game"
      @hasFinishGame="hasFinishGame"
    />
    <BMTransitionGame
      :informations="transition"
      @togglePlayGame="togglePlayGame"
      @toggleShowingGame="toggleShowingGame"
      classToAdd="good-practices__transition"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  data() {
    return {
      gameId: null,
      isShowingGame: false,
      canPlayGame: false,
      acf: this.$store.state.app.steps.future.hub,
      transition: {},
      currentDialogue: -1,
      differenceIndex: -1
    };
  },
  mounted() {
    this.changeLoading(false);
    this.changeCanPause(true);
    this.changeCanHelp(false);
  },
  methods: {
    preloadGame(index: number) {
      this.gameId = this.getGameId(index);
    },
    startTransition(transition: Object) {
      this.transition = transition;
      this.changeCanPause(false);
    },
    toggleShowingGame() {
      this.isShowingGame = !this.isShowingGame;
      if (this.isShowingGame === false) this.gameId = null;
    },
    togglePlayGame() {
      this.canPlayGame = !this.canPlayGame;
      if (this.canPlayGame === false) this.backInTheHub();
    },
    getGameId(index: number) {
      let id = null;
      if (index === 0) id = this.$store.state.app.games.enter;
      else if (index === 1) id = this.$store.state.app.games.doors;
      else if (index === 2) id = this.$store.state.app.games.validate;
      else if (index === 3) id = this.$store.state.app.games.eatdrink;
      else if (index === 4) id = this.$store.state.app.games.leave;
      return id;
    },
    newDialogue(index: number) {
      setTimeout(() => {
        this.currentDialogue = index;
      }, 500);
    },
    hasFinishGame() {
      this.transition = {
        color: "orange",
        name: "out"
      };
      this.currentDialogue = -1;
    },
    backInTheHub() {
      this.changeCanPause(true);
      this.changeCanHelp(false);
    },
    ...mapMutations({
      changeLoading: "game/changeLoading",
      changeCanPause: "game/changeCanPause",
      changeScreen: "minigame/changeScreen",
      changeCanHelp: "game/changeCanHelp"
    })
  }
});
</script>

<style lang="sass">
.good-practices
    height: 100%

    &__hub
        +absolute(0, 0)
        z-index: 0

    &__game
        +absolute(0, 0)
        z-index: 1

    &__transition
        +absolute(0, 0)
        z-index: 2

    .dialogues 
        +absolute(0, 0)
</style>
