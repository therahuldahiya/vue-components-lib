<template>
  <div class="slider__counter">
    <div class="counter__wrapper">
      <span>{{ currentSlide + 1 }}</span>
      <span> / </span>
      <span>{{ slides.length }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SliderCounter',

  props: {
    slides: {
      type: Array,
      required: true,
    },
    currentSlide: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
