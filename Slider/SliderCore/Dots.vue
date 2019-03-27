<template>
  <div class="slider__dots">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      :data-index="index"
      class="dot"
      @click="clicked"
    />
  </div>
</template>

<script>
export default {
  name: 'SliderDots',

  props: {
    slides: {
      type: Array,
      required: true,
    },
  },

  methods: {
    clicked(event) {
      this.$parent.$emit('slider-dot', {
        index: parseInt(event.currentTarget.dataset.index, 10),
        el: event.currentTarget,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.slider__dots {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  margin: 0 auto;

  .dot {
    width: 10px;
    height: 10px;
    background-color: lightcoral;
    border-radius: 100%;
    cursor: pointer;
  }
}
</style>
