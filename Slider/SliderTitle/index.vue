<template>
  <h1
    class="slider__title"
    v-html="title"
  />
</template>

<script>
export default {
  name: 'SliderTitle',

  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
