<template>
  <div :class="`game-doors-cards game-doors-cards--${color} ${classToAdd}`">
    <img :src="cards[index].image" class="game-doors-cards__image" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    cards: {
      type: Array,
      default: []
    },
    classToAdd: {
      type: String,
      default: ""
    },
    index: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: "transparent"
    }
  }
});
</script>

<style lang="sass">
.game-doors-cards
    +flex-center

    &--red
        filter: hue-rotate(175deg)

    &--green
        filter: hue-rotate(305deg)

    &__image
        margin-bottom: 4rem
        transform: rotate(6deg)
        +size(12rem)
</style>
