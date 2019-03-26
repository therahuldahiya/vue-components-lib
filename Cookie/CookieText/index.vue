<template>
  <span
    class="cookie__text"
    v-html="text"
  />
</template>

<script>
export default {
  name: 'CookieText',

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
