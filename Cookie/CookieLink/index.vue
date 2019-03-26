<template>
  <a
    class="cookie__link"
    :href="url"
    target="_blank"
  >
    <span
      class="cookie__link-label"
      v-html="label"
    />
  </a>
</template>

<script>
export default {
  name: 'CookieLink',

  props: {
    label: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>

</style>
