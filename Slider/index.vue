<template>
  <div
    class="c-template c-template--slider"
    :data-theme="theme"
  >
    <slot
      v-for="slot in slots"
      :name="slot"
    />
  </div>
</template>

<script>
export default {
  name: 'SliderTemplate',

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
        return ['title', 'text', 'core'];
      },
    },
  },

  mounted() {
    this.$on('panmove', event => this.$parent.$emit('panmove', event));
    this.$on('panend', event => this.$parent.$emit('panend', event));
  },
};
</script>

<style lang="scss" scoped>
@import '../style/index';

.c-template.c-template--slider {
  &[data-theme="default"] {
    position: relative;
  }
}
</style>
