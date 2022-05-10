<template>
  <div v-if="step == 0">
    <span @click="next" class="game-leave-button game-leave-button--1" data-id="999"></span>
    <span @click="next" class="game-leave-button game-leave-button--2" data-id="999"></span>
    <span @click="next" class="game-leave-button game-leave-button--3" data-id="0"></span>
    <span @click="next" class="game-leave-button game-leave-button--4" data-id="1"></span>
    <span @click="next" class="game-leave-button game-leave-button--5" data-id="999"></span>
    <span @click="next" class="game-leave-button game-leave-button--6" data-id="999"></span>
    <span @click="next" class="game-leave-button game-leave-button--7" data-id="2"></span>
    <span @click="next" class="game-leave-button game-leave-button--8" data-id="999"></span>
    <span @click="next" class="game-leave-button game-leave-button--9" data-id="999"></span>
    <span @click="next" class="game-leave-button game-leave-button--10" data-id="999"></span>
    <span @click="next" class="game-leave-button game-leave-button--11" data-id="3"></span>
    <span @click="next" class="game-leave-button game-leave-button--12" data-id="999"></span>
  </div>
  <div v-else-if="step == 1" class="game-leave-buttons">
    <span @click="next" class="game-leave-button game-leave-button--13" data-id="999"></span>
    <span @click="next" class="game-leave-button game-leave-button--14" data-id="4"></span>
    <span @click="next" class="game-leave-button game-leave-button--15" data-id="5"></span>
    <span @click="next" class="game-leave-button game-leave-button--16" data-id="999"></span>
    <span @click="next" class="game-leave-button game-leave-button--17" data-id="999"></span>
    <span @click="next" class="game-leave-button game-leave-button--18" data-id="6"></span>
    <span @click="next" class="game-leave-button game-leave-button--19" data-id="999"></span>
    <span @click="next" class="game-leave-button game-leave-button--20" data-id="7"></span>
  </div>
  <div v-else-if="step == 2" class="game-leave-buttons">
    <span @click="next" class="game-leave-button game-leave-button--21" data-id="8"></span>
    <span @click="next" class="game-leave-button game-leave-button--22" data-id="9"></span>
    <span @click="next" class="game-leave-button game-leave-button--23" data-id="10"></span>
    <span @click="next" class="game-leave-button game-leave-button--24" data-id="11"></span>
  </div>
  <div v-else class="game-leave-buttons">
    <span @click="stop" class="game-leave-button game-leave-button--25" data="12"></span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    step: Number,
    index: Number,
  },
  methods: {
    next(e) {
      const indexBtn = e.target.dataset.id
      if(this.index == indexBtn) {
        this.$emit("next")
      }
      else this.$emit("wrong")
    },
    stop() {
      this.$emit("stop")
    }
  }
});
</script>

<style lang="sass">
.game-leave-button
  position: absolute
  width: 30px
  height: 30px
  background-color: transparent
  cursor: pointer

  &--1
    bottom: 40px
    left: 170px

  &--2
    bottom: 140px
    left: 205px

  &--3
    top: 183px
    left: 225px

  &--4
    top: 100px
    left: 320px

  &--5
    top: 202px
    left: 310px

  &--6
    bottom: 106px
    left: 290px
  
  &--7
    bottom: 90px
    left: 385px
  
  &--8
    top: 185px
    left: 408px
  
  &--9
    top: 138px
    left: 452px
  
  &--10
    top: 88px
    right: 328px
  
  &--11
    top: 198px
    right: 305px

  &--12
    bottom: 100px
    right: 275px
  
  &--13
    bottom: 40px
    left: 170px

  &--14
    bottom: 142px
    left: 205px

  &--15
    bottom: 108px
    left: 288px

  &--16
    bottom: 182px
    left: 308px

  &--17
    bottom: 200px
    left: 408px

  &--18
    top: 136px
    left: 455px

  &--19
    top: 90px
    left: 539px

  &--20
    bottom: 100px
    right: 273px

  &--21
    bottom: 41px
    left: 170.5px

  &--22
    bottom: 184px
    left: 309px

  &--23
    bottom: 198px
    left: 408.5px

  &--24
    top: 90px
    right: 327.5px

  &--25
    height: 90px
    width: 90px
    bottom: 98px
    right: 40px
</style>