<template>
  <img
    :data-src="lazy ? picture.src : null"
    :src="!lazy ? picture.src : null"
    :alt="picture.alt"
    :class="[
      'picture__img',
      isImg ? '' : 'picture__hidden',
    ]"
  >
</template>

<script>
export default {
  name: 'PicutreImage',

  props: {
    picture: {
      type: Object,
      required: false,
      default() {
        return {
          src: 'https://picsum.photos/1440/1080',
          alt: 'placeholder',
        };
      },
    },
    lazy: {
      type: Boolean,
      required: false,
      default: true,
    },
    isImg: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>
