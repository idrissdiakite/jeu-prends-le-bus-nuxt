<template>
  <div :class="classToAdd">
    <span v-if="wait">
      <img :src="validators.neutral" class="game-validate-validators__image" />
    </span>
    <span v-if="ok">
      <img :src="validators.ok" class="game-validate-validators__image" />
    </span>
    <span v-if="ko">
      <img :src="validators.ko" class="game-validate-validators__image" />
    </span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    validators: {
      type: Object,
      default: {},
    },
    classToAdd: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: 0,
    },
    wait: {
      type: Boolean,
      default: true,
    },
    ok: {
      type: Boolean,
      default: false,
    },
    ko: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
});
</script>