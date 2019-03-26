<template>
  <div class="cookie__button">
    <button
      class="cookie__button-label"
      tabindex="0"
      role="button"
      aria-pressed="true"
      @click="accept"
    >{{ label }}</button>
  </div>
</template>

<script>
export default {
  name: 'CookieButton',

  props: {
    label: {
      type: String,
      required: true,
    },
  },

  methods: {
    accept() {
      localStorage.setItem('cookie:accepted', '1');
      this.$parent.$emit('cookie-accepted');
    },
  },
};
</script>

<style lang="scss" scoped>
.cookie__button button {
  cursor: pointer;

  @at-root [data-theme="default"] & {
    margin-left: 20px;
    padding: 5px 15px;
    background-color: black;
    color: white;
    text-align: center;
    border: none;
    -webkit-appearance: none;
    appearance: none;
  }
}
</style>
