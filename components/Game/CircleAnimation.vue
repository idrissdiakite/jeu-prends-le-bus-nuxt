<template>
  <div :class="`circle-animation circle-animation--${animation} ${classToAdd}`">
    <i class="circle-animation__circle"></i>
    <i class="circle-animation__circle"></i>
    <i class="circle-animation__circle"></i>
    <i class="circle-animation__circle"></i>
    <i class="circle-animation__center"></i>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    classToAdd: {
      type: String,
      default: ""
    },
    animation: {
      type: String,
      default: ""
    }
  }
});
</script>

<style lang="sass">
.circle-animation

    &__circle
        background-color: white
        display: block


    &--reveal

        .circle-animation__center
            display: none

        .circle-animation__circle
            +absolute(50%, 50%)
            border-radius: 100%
            transform: translateY(-50%) translateX(50%) scale(1)
            animation: reveal 2s ease-in 0s forwards

            &:nth-child(1)
                +size(500%)
                opacity: 0.33
            &:nth-child(2)
                +size(350%)
                opacity: 0.33
            &:nth-child(3)
                +size(200%)
                opacity: 0.33
            &:nth-child(4)
                +size(100%)
                opacity: 1
                animation-timing-function: ease-out
                animation-duration: 0.25s
                animation-delay: 1.75s

    &--flying
        animation: flying 2s ease-in-out alternate infinite

        .circle-animation__center
            +circle(rem(2))
            background-color: #D3582D
            +absolute(rem(5), 0)
            transform: translateY(-50%) translateX(50%)

    &--bink
        .circle-animation__center
            display: none

    &--blink, &--flying

        .circle-animation__circle
            +absolute(rem(5), 0)
            +circle(rem(15))
            transform: translateY(-50%) translateX(50%) scale(0)
            opacity: 1
            animation: blink 8s linear 2s infinite

            &:nth-child(1)
                animation-delay: 2s
            &:nth-child(2)
                animation-delay: 4s
            &:nth-child(3)
                animation-delay: 6s
            &:nth-child(4)
                animation-delay: 8s

@keyframes blink
    0%
        transform: translateY(-50%) translateX(50%) scale(0)
        opacity: 1
    100%
        transform: translateY(-50%) translateX(50%) scale(1)
        opacity: 0

@keyframes reveal
    100%
        transform: translateY(-50%) translateX(50%) scale(0)

@keyframes flying
    0%
        transform: translateY(rem(-2))
    100%
        transform: translateY(rem(2))

</style>
