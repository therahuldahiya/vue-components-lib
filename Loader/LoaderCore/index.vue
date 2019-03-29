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
    this.resources.forEach((resource, index) => {
      let promise = null;
      switch (true) {
        case resource.type === 'image':
          promise = new Promise((resolve, reject) => {
            const i = new Image();
            i.src = resource.url;
            i.onload = () => resolve(i);
            i.onerror = reject;
          });
          break;

        case resource.type === 'json':
          promise = fetch(resource.url).then(response => response.json());
          break;

        case resource.type === 'encoded':
          promise = fetch(resource.url).then(response => response.text());
          break;

        case resource.type === 'binary':
          promise = fetch(resource.url).then(response => response.text());
          break;

        case resource.type === 'custom':
          promise = resource.resolver;
          break;

        default:
          break;
      }
      if (index === 0) {
        this.$nextTick(() => { this.$parent.$emit('loadingstarted'); });
      }
      promise.then(() => {
        this.$parent.$emit('resourceloaded', { id: resource.id });
        this.resolved += 1;
      });
      this.promises.push(promise);
    });

    Promise.all(this.promises).then((responses) => {
      this.$parent.$emit('loadingdone', responses);
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
