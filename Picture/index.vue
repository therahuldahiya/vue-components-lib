<template>
  <figure
    class="c-template c-template--picture picture"
    :data-theme="theme"
  >
    <slot
      v-for="slot in slots"
      :name="slot"
    />
    <figcaption v-if="slots.length > 0">
      <slot
        v-for="slot in slotsFigcaption"
        :name="slot"
      />
    </figcaption>
  </figure>
</template>

<script>
export default {
  name: 'Picture',

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
        return ['image'];
      },
    },
    slotsFigcaption: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },

  methods: {
    loadPicture(callback = () => {}) {
      return new Promise((resolve, reject) => {
        const img = this.$el.querySelector('.picture__img');
        const div = this.$el.querySelector('.picture__div-img');
        const image = new Image();
        let src = '';

        if (typeof img !== 'undefined') {
          src = img.getAttribute('data-src');
        } else if (typeof div !== 'undefined') {
          src = div.getAttribute('data-src');
        }

        image.src = src;

        if (typeof img !== 'undefined') img.removeAttribute('data-src');
        if (typeof div !== 'undefined') div.removeAttribute('data-src');

        const errorHandler = () => {
          reject(new Error(`Failed to load image's URL: ${src}`));
        };

        const imageHandler = () => {
          image.removeEventListener('load', imageHandler);
          image.removeEventListener('error', errorHandler);
          if (typeof img !== 'undefined') img.src = image.src;
          if (typeof div !== 'undefined') div.style.backgroundImage = `url(${image.src})`;
          image.remove();

          resolve();
        };

        image.addEventListener('load', imageHandler());
        image.addEventListener('error', errorHandler());
      }).then(callback());
    },
  },
};
</script>

<style lang="scss" scoped>
.picture {
  position: relative;

  &__div-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }

  &__img {
    display: block;

    position: relative;
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  &__hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }
}
</style>
