<template>
  <div class="form__row">
    <slot
      v-for="slot in slots"
      :name="slot"
    />
  </div>
</template>

<script>
export default {
  name: 'FormRow',

  props: {
    slots: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>

</style>
