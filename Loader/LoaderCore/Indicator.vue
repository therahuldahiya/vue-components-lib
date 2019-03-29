<template>
  <div class="loader__indicator">
    <span>{{ fixedValues ? Math.round(progress) : progress }}</span>
  </div>
</template>

<script>
export default {
  name: 'LoaderIndicator',

  props: {
    progress: {
      type: Number,
      required: false,
      default: 0,
    },
    fixedValues: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.loader__indicator {
  font-size: 32px;
  font-weight: bold;
}
</style>
