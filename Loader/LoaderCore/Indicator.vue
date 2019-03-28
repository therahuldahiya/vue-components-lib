<template>
  <div class="loader__indicator">
    <span>{{ progress }}</span>
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
  },
};
</script>

<style lang="scss" scoped>
.loader__indicator {
  font-size: 32px;
  font-weight: bold;
}
</style>
