<template>
  <div class="cookie__content">
    <CookieText :text="text" />
    <CookieLink :url="url" :label="label" />
  </div>
</template>

<script>
import CookieText from '../CookieText';
import CookieLink from '../CookieLink';

export default {
  name: 'CookieContent',
  
  components: {
    CookieText,
    CookieLink,
  },

  props: {
    text: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>

</style>
