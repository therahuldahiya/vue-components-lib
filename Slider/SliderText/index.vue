<template>
  <div
    class="slider__text"
    v-html="text"
  />
</template>

<script>
export default {
  name: 'SliderText',

  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>

</style>
