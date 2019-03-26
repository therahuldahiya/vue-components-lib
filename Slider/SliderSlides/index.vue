<template>
  <div class="slider__slides">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="slide"
    />
  </div>
</template>

<script>
export default {
  name: 'SliderSlides',

  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.slider__slides {
  width: 400px;
  height: 400px;
  margin: 0 auto;

  .slide {
    width: 100%;
    height: 100%;
    background-color: teal;
    background-size: cover;
    background-position: center center;
  }
}
</style>
