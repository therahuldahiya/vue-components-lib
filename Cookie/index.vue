<template>
  <transition
    :css="css.use"
    :name="css.animation"
    @enter="css.use ? null : enter"
    @leave="css.use ? null : leave"
  >
    <div
      v-if="show"
      class="c-template c-template--cookie"
      :data-theme="theme"
    >
      <slot
        v-for="slot in slots"
        :name="slot"
      />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CookieTemplate',

  props: {
    theme: {
      type: String,
      required: false,
      default: 'default',
    },
    slots: {
      type: Array,
      required: false,
      default() {
        return ['content', 'button'];
      },
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
      show: true,
    };
  },

  created() {
    if (localStorage.getItem('cookie:accepted')) {
      this.show = false;
    }
    this.$on('cookie-accepted', () => { this.show = false; });
  },
};
</script>

<style lang="scss" scoped>
@import '../style/index';

.c-template.c-template--cookie {
  position: fixed;
  width: 80%;
  left: 10%;

  @include mq($from: ipadP) {
    width: 600px;
    left: 50%;
    margin-left: -300px;
  }

  &[data-theme="default"] {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    bottom: 20px;
    border: 1px solid black;
    padding: 15px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
