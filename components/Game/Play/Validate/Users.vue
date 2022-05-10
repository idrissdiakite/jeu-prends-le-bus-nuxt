<template>
  <div class="game-validate-users" ref="image">
      <inline-svg
        v-if="!ok"
        ref="svg"
        :src="users.ko[index].image"
        class="game-validate-users__svg"
        @loaded="loaded"
      >
      </inline-svg>

      <inline-svg
        v-else
        ref="svg"
        :src="users.ok[index].image"
        class="game-validate-users__svg"
      >
      </inline-svg>

    <div class="game-validate-users__outside">
      <img
        v-if="svg1"
        :src="users.ko[index + 1].image"
        class="game-validate-users__image"
      />

      <img
        v-if="svg2"
        :src="users.ko[index + 2].image"
        class="game-validate-users__image"
      />
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import InlineSvg from "vue-inline-svg";

export default Vue.extend({
  props: {
    users: {
      type: Array,
      default: [],
    },
    index: {
      type: Number,
      default: 0,
    },
    ok: {
      type: Boolean,
      default: false,
    },
    svg1: {
      type: Boolean,
      default: true,
    },
    svg2: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    InlineSvg,
  },
  methods: {
    loaded() {
      const $image = this.$refs.image;
      $image
        .querySelector("#ticket")
        .addEventListener("click", this.founded.bind(this));
    },
    founded() {
      this.$emit("founded");
    },
  }
});
</script>

<style lang="sass">
.game-validate-users

  &__svg
    +absolute(0, 0)
    +size(100%)
    z-index: 1
    height: 25rem
    margin-top: 2.5rem
    margin-right: 10rem

  &__outside
    +absolute(120px, 50px, auto, auto)
    +size(50%)
    display: flex
    align-items: center
    justify-content: center
    z-index: 0

  &__image 
    height: 25rem

</style>