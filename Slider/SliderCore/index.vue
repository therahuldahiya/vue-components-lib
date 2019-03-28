<template>
  <div
    class="slider__core"
    :class="{
      'slider__core--single': !multiple,
      'slider__core--multiple': multiple,
    }"
  >
    <div
      v-if="!multiple"
      class="slider__wrapper"
    >
      <transition
        :css="css.use"
        :name="css.animation"
        :mode="mode"
        @enter="css.use ? null : enter"
        @leave="css.use ? null : leave"
      >
        <div
          :key="currentSlide"
          ref="slide"
          :style="{ background: slides[currentSlide].color }"
          class="slide"
        />
      </transition>
    </div>
    <div
      v-else
      class="slider__wrapper"
    >
      <transition
        :css="css.use"
        :name="css.animation"
        :mode="mode"
        @enter="css.use ? null : enter"
        @leave="css.use ? null : enter"
      >
        <div
          :key="currentSlide"
          class="transition-wrapper"
        >
          <div
            v-for="(slide, index) in visibleSlides"
            :key="index"
            :style="{ background: slide.color, zIndex: slides.length - index }"
            class="slide"
            :class="{
              'slide--prev': index - 1 === currentSlide - 1,
              'slide--current': index - 1 === currentSlide,
              'slide--next': index - 1 === currentSlide + 1,
            }"
            :data-active="index === currentSlide ? true : false"
          />
        </div>
      </transition>
    </div>
    <Controls :current-slide="currentSlide">
      <template slot="control-prev">
        <slot name="control-prev" />
      </template>
      <template slot="control-next">
        <slot name="control-next" />
      </template>
    </Controls>
    <Dots :slides="slides" />
    <Counter
      :slides="slides"
      :current-slide="currentSlide"
    />
  </div>
</template>

<script>
import Hammer from 'hammerjs';
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
    multiple: {
      type: Boolean,
      required: false,
      default: true,
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
      hm: null,
    };
  },

  computed: {
    visibleSlides() {
      const visibleSlides = [];
      if (this.currentSlide === 0) visibleSlides.push(this.slides[this.slides.length - 1]);
      this.slides.forEach((slide, index) => {
        if (index === this.currentSlide
        || index === this.currentSlide - 1
        || index === this.currentSlide + 1) {
          visibleSlides.push(slide);
        }
      });
      if (this.currentSlide === this.slides.length - 1) visibleSlides.push(this.slides[0]);
      return visibleSlides;
    },
  },

  mounted() {
    this.$on('slider-prev', this.prev);
    this.$on('slider-next', this.next);
    this.$on('slider-dot', this.dot);

    this.hm = new Hammer.Manager(this.$el);
    if (!this.multiple) {
      const swipe = new Hammer.Swipe();
      this.hm.add(swipe);
      this.hm.on('swiperight', this.prev);
      this.hm.on('swipeleft', this.next);
    } else {
      const pan = new Hammer.Pan();
      this.hm.add(pan);
      this.hm.on('panstart', this.panStart);
      this.hm.on('panmove', this.panMove);
      this.hm.on('panend pancancel', this.panEnd);
    }
  },

  beforeDestroy() {
    this.hm.off('swiperight');
    this.hm.off('swipeleft');
    this.hm = null;
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
    panMove(event) {
      this.$parent.$emit('panmove', event);
    },
    panEnd(event) {
      this.$parent.$emit('panend', event);
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
    overflow: hidden;
  }

  .slide {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
  }
}
</style>
