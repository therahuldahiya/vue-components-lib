<template>
  <div
    class="c-template c-template--form"
    :data-theme="theme"
  >
    <slot
      v-for="slot in slots"
      :name="slot"
    />
  </div>
</template>

<script>
export default {
  name: 'FormTemplate',

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
        return ['core'];
      },
    },
  },

  mounted() {
    console.log(this.slots);
  },
};
</script>

<style lang="scss" scoped>
@import '../style/index';

.c-template.c-template--form {
  &[data-theme="default"] {
    position: relative;
  }
}
</style>
