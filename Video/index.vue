<template>
  <div
    class="c-template c-template--video"
  >
    <slot
      v-for="slot in slots"
      :name="slot"
    />
  </div>
</template>

<script>
import Plyr from 'plyr';

export default {
  name: 'VideoComponent',

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
        return ['player', 'controls'];
      },
    },
  },

  mounted() {
    console.log(Plyr);
  },
};
</script>

<style lang="scss" scoped>
@import '~sass-mq/mq';
</style>
