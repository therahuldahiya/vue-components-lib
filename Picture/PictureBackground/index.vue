<template>
  <div
    :data-src="lazy ? picture.src : null"
    :style="{
      backgroundImage: !lazy ? picture.src : null,
    }"
    :class="[
      'picture__div-img',
      isImg ? 'picture__hidden' : '',
    ]"
  />
</template>

<script>
export default {
  name: 'PictureBackground',

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

<style>

</style>
