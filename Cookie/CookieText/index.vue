<template>
  <span class="cookie__text" v-html="text"></span>
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
