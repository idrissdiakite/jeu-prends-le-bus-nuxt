<template>
  <button type="button" @click="click" class="game-doors-button">
    <ButtonMain
      v-if="door == 'enter'"
      size="medium"
      color="blue"
      label="Avant"
      class="game-doors-button--btn"
    />
    <ButtonMain
      v-else
      size="medium"
      color="blue"
      label="Arrière"
      class="game-doors-button--btn"
    />
  </button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    door: {
      type: String,
      default: "",
    },
  },
  methods: {
    click() {
      this.$emit("clicked", this.door);
    },
  },
});
</script>

<style lang="sass">
.game-doors-button
  +flex-center
  
  &--btn   
    padding: rem(0.5) rem(1.25)
</style>
