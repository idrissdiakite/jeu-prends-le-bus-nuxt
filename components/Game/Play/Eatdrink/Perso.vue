<template>
<div v-if="filter">
    <img @click="click($event)" :src="perso[this.index].image" :class="`game-eatdrink-image game-eatdrink-image--${side}`" />
</div>

<div v-else>
    <img :src="perso[this.index].image" :class="`game-eatdrink-image game-eatdrink-image--${side}`" />
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        perso: Array,
        side: String,
        index: Number,
        filter: Boolean,
    },
    methods: {
        click(event) {
            this.$emit("clicked", this.perso[this.index].status);
        }
    }
})
</script>

<style lang="sass">
.game-eatdrink-image
    position: absolute
    height: 100%
    z-index: 4

    &--left
        left: 175px

    &--right
        right: 175px

</style>