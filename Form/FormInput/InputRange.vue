<template>
  <input
    :id="params.id"
    :v-model="params.id"
    :name="params.name"
    :value="params.value"
    :step="params.step"
    :min="params.min"
    :max="params.max"
    :readonly="params.readonly"
    :required="params.required"
    :aria-required="params.required"
    :aria-disabled="params.disabled"
    type="range"
    @change="change"
    @focus="setFocus(true)"
    @blur="setFocus(false)"
  >
</template>

<script>
export default {
  name: 'InputRange',

  props: {
    params: {
      type: Object,
      required: true,
    },

    setValue: {
      type: Function,
      required: true,
    },

    setFocus: {
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
