<template>
  <div class="slider__controls">
    <div
      class="slider__control slider__control--prev"
      @click="prev"
    />
    <div
      class="slider__control slider__control--next"
      @click="next"
    />
  </div>
</template>

<script>
export default {
  name: 'SliderControls',

  props: {
    currentSlide: {
      type: Number,
      required: true,
    },
  },

  methods: {
    prev() {
      this.$parent.$emit('slider-prev');
    },
    next() {
      this.$parent.$emit('slider-next');
    },
  },
};
</script>

<style lang="scss" scoped>
.slider__controls {
  position: absolute;
  top: 50%;
  margin-top: -40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .slider__control {
    width: 80px;
    height: 80px;
    background-color: red;
  }
}
</style>
