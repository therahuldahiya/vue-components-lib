<template>
  <input
    :id="params.id"
    :v-model="params.id"
    :name="params.name"
    :value="params.value"
    :required="params.required"
    type="hidden"
    @change="change"
  >
</template>

<script>
export default {
  name: 'InputHidden',

  props: {
    params: {
      type: Object,
      required: true,
    },

    setValue: {
      type: Function,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
  },

  methods: {
    change(event) {
      this.setValue(event.target.value);
    },
  },
};
</script>

<style>

</style>
