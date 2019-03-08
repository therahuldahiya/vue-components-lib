<template>
  <footer class="c-template c-template--footer">
    <slot
      v-for="slot in slots"
      :name="slot"
    />
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
      required: false,
      default() {
        return ['heading', 'content'];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.c-template.c-template--footer {
  
}
</style>
