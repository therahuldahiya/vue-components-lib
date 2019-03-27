<template>
  <div class="slider__core">
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
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :style="{ background: slide.color, zIndex: slides.length - index }"
        class="slide"
        :data-active="index === currentSlide ? true : false"
      />
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
      if (!this.multiple) {
        this.$refs.slide.style.transform = `translateX(${event.deltaX}px)`;
      } else {
        this.$el.querySelector('[data-active="true"]').style.transform = `translateX(${event.deltaX}px)`;
      }
    },
    panEnd() {
      if (!this.multiple) {
        this.$refs.slide.style.transform = `translateX(${0}px)`;
      } else {
        this.$el.querySelector('[data-active="true"]').style.transform = `translateX(${0}px)`;
      }
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
