<template>
  <div
    v-if="show"
    class="c-template c-template--cookie"
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
  name: 'CookieTemplate',

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
        return ['content', 'button'];
      },
    },
  },

  data() {
    return {
      show: true,
    };
  },

  created() {
    if (localStorage.getItem('cookie:accepted')) {
      this.show = false;
    }
    this.$on('cookie-accepted', () => { this.show = false; });
  },
};
</script>

<style lang="scss" scoped>
.c-template.c-template--cookie {
  position: fixed;
  width: 80%;
  left: 10%;
  max-width: 600px;

  &[data-theme="default"] {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    bottom: 20px;
    border: 1px solid black;
    padding: 15px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
