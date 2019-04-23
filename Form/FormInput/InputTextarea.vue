<template>
  <div>
    <textarea
      :id="params.id"
      :v-model="params.id"
      :name="params.name"
      :placeholder="params.placeholder"
      :value="params.value"
      :cols="params.cols"
      :rows="1"
      :minlength="params.minlength"
      :maxlength="params.maxlength"
      :readonly="params.readonly"
      :required="params.required"
      :aria-required="params.required"
      :aria-disabled="params.disabled"
      spellcheck="false"
      @change="change"
      @focus="setFocus(true)"
      @blur="setFocus(false)"
      @input="typing"
    />
  </div>
</template>

<script>
export default {
  name: 'InputTextarea',

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
      length: 0,
      offset: 0,
      canvas: {},
    };
  },

  mounted() {
    this.initCounter();

    window.addEventListener('resize', this.initCounter);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.initCounter);
  },

  methods: {
    change(event) {
      this.setValue(event.target.value);
    },

    typing(event) {
      this.length = event.target.value.length;

      const { width } = this.$el.children[0].getBoundingClientRect();
      const text = Math.round(this.measureFont(event.target.value) + 1);
      if (text <= width) {
        this.offset = event.target.value.length;
      }
      this.fx(text >= width);
    },

    fx(status) {
      if (status) {
        const fontSize = Math.max(100 - (Math.abs(1 - this.length / this.offset) * 100), 50);
        this.$el.children[0].style.fontSize = `${fontSize}%`;
        this.$el.children[0].style.marginTop = '15px';
        this.$el.children[0].style.maxHeight = '69px';
        this.$el.children[0].style.lineHeight = '120%';
      } else {
        this.$el.children[0].style.fontSize = '100%';
        this.$el.children[0].style.lineHeight = '84px';
        this.$el.children[0].style.removeProperty('margin-top');
        this.$el.children[0].style.removeProperty('max-height');
      }
    },

    initCounter() {
      this.canvas = {
        el: document.createElement('canvas'),
        ctx: null,
        size: window.getComputedStyle(this.$el.children[0]).getPropertyValue('font-size'),
        family: window.getComputedStyle(this.$el.children[0]).getPropertyValue('font-family'),
      };

      this.canvas.ctx = this.canvas.el.getContext('2d');
      this.canvas.ctx.font = `${this.canvas.size} ${this.canvas.family}`;
    },

    measureFont(text) {
      this.canvas.ctx.restore();
      return this.canvas.ctx.measureText(text).width;
    },
  },
};
</script>

<style lang="scss" scoped>
$color-input: #464652;
$color-label: #929292;

textarea {
  width: 100%;
  height: 100%;
  -webkit-appearance: none;
  appearance: none;
  border: 0;
  padding: 0;
  box-shadow: none;
  resize: none;
  outline: transparent;

  font-size: 100%;
  line-height: 84px;
  color: $color-input;
}
</style>
