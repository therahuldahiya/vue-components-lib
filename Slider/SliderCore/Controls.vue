<template>
  <div class="slider__controls">
    <div
      class="slider__control slider__control--prev"
      tabindex="1"
      aria-roledescription="Move to prev slide"
      @click="prev"
      @keypress.enter="prev"
    >
      <slot name="control-prev" />
    </div>
    <div
      class="slider__control slider__control--next"
      tabindex="1"
      aria-roledescription="Move to nex slide"
      @click="next"
      @keypress.enter="next"
    >
      <slot name="control-next" />
    </div>
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

    &:focus {
      outline: none;
    }
  }
}
</style>
