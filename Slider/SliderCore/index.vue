<template>
  <div class="slider__core">
    <div class="slider__wrapper">
      <transition
        :css="css.use"
        :name="css.animation"
        :mode="mode"
        @enter="css.use ? null : enter"
        @leave="css.use ? null : leave"
      >
        <div
          :key="currentSlide"
          :style="{ background: slides[currentSlide].color }"
          class="slide"
        />
      </transition>
    </div>
    <Controls :current-slide="currentSlide" />
    <Dots :slides="slides" />
    <Counter
      :slides="slides"
      :current-slide="currentSlide"
    />
  </div>
</template>

<script>
import Controls from './Controls';
import Dots from './Dots';
import Counter from './Counter';

export default {
  name: 'SliderCore',

  components: {
    Controls,
    Dots,
    Counter,
  },

  props: {
    slides: {
      type: Array,
      required: true,
    },
    css: {
      type: Object,
      required: false,
      default() {
        return {
          use: false,
          animation: '',
        };
      },
    },
    mode: {
      type: String,
      required: false,
      default: 'in-out',
    },
    enter: {
      type: Function,
      required: false,
      default: (element, done) => { done(); },
    },
    leave: {
      type: Function,
      required: false,
      default: (element, done) => { done(); },
    },
  },

  data() {
    return {
      currentSlide: 0,
      direction: 0,
    };
  },

  mounted() {
    this.$on('slider-prev', this.prev);
    this.$on('slider-next', this.next);
    this.$on('slider-dot', this.dot);
  },

  methods: {
    prev() {
      this.direction = -1;
      if (this.currentSlide === 0) this.currentSlide = this.slides.length - 1;
      else this.currentSlide -= 1;
    },
    next() {
      this.direction = 1;
      if (this.currentSlide === this.slides.length - 1) this.currentSlide = 0;
      else this.currentSlide += 1;
    },
    dot(event) {
      this.direction = event.index > this.currentSlide ? 1 : -1;
      this.currentSlide = event.index;
    },
  },
};
</script>

<style lang="scss" scoped>
.slider__core {
  width: 100%;
  margin: 0 auto;

  .slider__wrapper {
    position: relative;
    width: 400px;
    height: 400px;
    margin: 0 auto;
  }

  .slide {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;

    &:nth-child(1) {
      background-color: teal;
    }

    &:nth-child(2) {
      background-color: goldenrod;
    }

    &:nth-child(3) {
      background-color: brown;
    }
  }
}
</style>
