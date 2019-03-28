<template>
  <div class="video__player">
    <video
      v-if="video.type === 'video'"
      :src="video.src"
      class="player"
    />
    <iframe
      v-if="video.type === 'iframe'"
      :src="video.src"
      allowfullscreen
      allowtransparency
      allow="autoplay"
      class="player"
    />
  </div>
</template>

<script>
import Plyr from 'plyr';


export default {
  name: 'VideoPlayer',

  props: {
    video: {
      type: Object,
      required: true,
      default() {
        return {
          type: 'video',
          src: '',
          options: {},
        };
      },
    },
  },

  data() {
    return {
      player: null,
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      this.player = new Plyr('.player');
      console.log('this.player: ', this.player);
    },
  },
};
</script>

<style lang="scss">
@import '../style/plyr.scss';
</style>
