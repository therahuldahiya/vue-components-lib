<template>
  <input
    :id="params.id"
    :v-model="params.id"
    :name="params.name"
    :placeholder="params.placeholder"
    :value="params.value"
    :required="params.required"
    :aria-required="params.required"
    :aria-disabled="params.disabled"
    :autocomplete="params.autocomplete"
    spellcheck="false"
    type="text"
    @change="change"
    @focus="setFocus(true)"
    @blur="setFocus(false)"
  >
</template>

<script>
export default {
  name: 'InputText',

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

  data() {
    return {
      focusable: false,
    };
  },

  methods: {
    change(event) {
      this.setValue(event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
