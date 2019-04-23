<template>
  <input
    :id="params.id"
    :v-model="params.id"
    :name="params.name"
    :step="params.step"
    :min="params.min"
    :max="params.max"
    :value="params.value"
    :readonly="params.readonly"
    :required="params.required"
    :aria-required="params.required"
    type="date"
    @change="change"
  >
</template>

<script>
export default {
  name: 'InputDate',

  props: {
    params: {
      type: Object,
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
