<template>
  <transition
    :css="animation.css"
    :name="animaton.name"
    :mode="animation.mode"
    @enter="animation.css ? null : animation.enter"
    @leave="animation.css ? null : animation.leave"
  >
    <div class="c-template c-template--loader">
      <slot
        v-for="slot in slots"
        :name="slot"
      />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LoaderTemplate',

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
        return ['core'];
      },
    },
    animation: {
      type: Object,
      required: false,
      default() {
        return {
          css: false,
          name: '',
          mode: 'in-out',
          enter: (element, done) => { done(); },
          leave: (element, done) => { done(); },
        };
      },
    },
  },

  mounted() {
    this.$on('loadingstarted', event => this.$parent.$emit('loadingstarted', event));
    this.$on('resourceloaded', event => this.$parent.$emit('resourceloaded', event));
    this.$on('loadingdone', event => this.$parent.$emit('loadingdone', event));
  },
};
</script>

<style lang="scss" scoped>
@import '../style/index';

</style>
