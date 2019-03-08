<template>
  <footer class="c-template c-template--footer">
    <!-- Footer template slots -->
  </footer>
</template>

<script>
export default {
  name: 'FooterTemplate',

  props: {
    theme: {
      type: String,
      required: false,
      default: 'default',
    },
    slots: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.c-template.c-template--footer {
  
}
</style>
