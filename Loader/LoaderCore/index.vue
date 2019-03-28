<template>
  <div class="loader__core">
    <Indicator :progress="progress" />
  </div>
</template>

<script>
import Indicator from './Indicator';

export default {
  name: 'LoaderCore',

  components: {
    Indicator,
  },

  props: {
    resources: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },

  data() {
    return {
      promises: [],
      resolved: 0,
    };
  },

  computed: {
    progress() {
      return (100 / this.resources.length) * this.resolved;
    },
  },

  mounted() {
    this.resources.forEach((resource) => {
      let promise = null;
      let data = null;
      if (resource.type === 'image') {
        promise = new Promise((resolve, reject) => {
          const i = new Image();
          data = i;
          i.src = resource.url;
          i.onload = resolve;
          i.onerror = reject;
        });
      }
      promise.then(() => {
        this.$parent.$emit('resourceloaded', { id: resource.id, payload: data });
        this.resolved += 1;
      });
      this.promises.push(promise);
    });
  },
};
</script>

<style lang="scss" scoped>
.loader__core {
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0px;
  left: 0px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
