<template>
  <div
    v-if="!$store.state.game.isLoading && acf !== null"
    :class="
      `game game--${isShowingGame ? 'show' : 'hide'} 
        game--${canPlayGame ? 'active' : 'inactive'}`
    "
  >
    <GameScreenIntermediate
      v-if="$store.state.minigame.screen === 'start'"
      :title="acf.title"
      :text="acf.start.text"
      type="start"
    />

    <GamePlayKey
      v-if="acf.game === 'key'"
      :assets="acf.assets_key"
      @hasFinishGame="hasFinishGame"
    />
    <GamePlayDoors v-else-if="acf.game === 'doors'" :assets="acf.assets_doors" />
    <GamePlayValidate v-else-if="acf.game === 'validate'" :assets="acf.assets_validate" />
    <GamePlayEatdrink v-else-if="acf.game === 'eatdrink'" :assets="acf.assets_eatdrink" />
    <GamePlayLeave v-else-if="acf.game === 'leave'" :assets="acf.assets_leave" />

    <GameScreenIntermediate
      v-if="$store.state.minigame.screen === 'finish' && acf.game !== 'key'"
      :title="acf.title"
      :text="acf.finish.text"
      @hasFinishGame="hasFinishGame"
      type="finish"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations } from "vuex";
import axios from "axios";

export default Vue.extend({
  props: {
    id: {
      type: Number,
      default: null
    },
    isShowingGame: {
      type: Boolean,
      default: false
    },
    canPlayGame: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      acf: null as any,
      gameIsVisible: false
    };
  },
  async fetch() {
    const url = `${process.env.apiUrl}/game/${this.id}`;
    this.acf = await axios.get(url).then(response => response.data.acf);
    this.saveGameFields(this.acf);
    this.changeLoading(false);
  },
  mounted() {
    if (this.isShowingGame) this.changeLoading(true);
    this.changeScreen("start");
    this.changeCanPause(false);
  },
  watch: {
    isShowingGame(newValue) {
      if (newValue) this.detectLoading();
      this.changeScreen("start");
      this.changePlayMusic(true);
    }
  },
  methods: {
    detectLoading() {
      if (this.acf === null) this.changeLoading(true);
    },
    hasFinishGame() {
      this.$emit("hasFinishGame");
      if(this.$store.state.game.playMusic) this.changePlayMusic(false);
    },
    toggleGame() {
      this.gameIsVisible = !this.gameIsVisible;
    },
    ...mapMutations({
      changeScreen: "minigame/changeScreen",
      saveGameFields: "minigame/saveGameFields",
      changeLoading: "game/changeLoading",
      changeCanPause: "game/changeCanPause",
      changePlayMusic: "game/changePlayMusic",
    })
  }
});
</script>

<style lang="sass">
.game
    +size(100%)

    &--show
        opacity: 1

    &--hide
        opacity: 0

    &--active
        pointer-events: initial

    &--inactive
        pointer-events: none
</style>
