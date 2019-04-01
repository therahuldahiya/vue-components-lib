<template>
  <div
    :data-theme="theme"
    class="c-template c-template--video"
  >
    <slot
      v-for="slot in slots"
      :name="slot"
    />
  </div>
</template>

<script>
export default {
  name: 'VideoTemplate',

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
        return ['header', 'core', 'footer'];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~sass-mq/mq';
@import '../style/index';
</style>
