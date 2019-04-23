<template>
  <div class="form__file">
    <div
      :class="[
        'c-file',
        focusable ? 'c-file--focus' : false,
      ]"
    >
      <div class="c-file__wrapper">
        <div
          class="c-file__selected"
          v-html="name"
        />

        <div class="c-file__toggle">
          <div class="c-file__toggle__spin">
            <svg viewBox="0 0 38 38">
              <circle
                cx="18"
                cy="18"
                r="17"
              />
              <circle
                class="c-file__toggle__spin--hover"
                cx="18"
                cy="18"
                r="17"
              />
            </svg>
          </div>
          <div class="c-file__toggle__plus" />
        </div>

        <input
          :id="params.id"
          :v-model="params.id"
          :name="params.name"
          :placeholder="params.placeholder"
          :accept="params.accept"
          :capture="params.capture"
          :multiple="params.multiple"
          :required="params.required"
          :aria-required="params.required"
          :aria-disabled="params.disabled"
          type="file"
          tabindex="-1"
          aria-hidden="true"
          @change="change"
          @focus="setFocus(true)"
          @blur="setFocus(false)"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputFile',

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

    focusable: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      name: '&nbsp;',
    };
  },

  methods: {
    change(event) {
      this.name = event.target.value.replace(/.*[/\\]/, '');
      this.setValue(event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
$color-input: #464652;
$color-error: #FA0606;
$color-label: #929292;

input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.c-file {
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  color: $color-input;
  overflow: hidden;

  &__wrapper {
    position: relative;
    width: 100%;
    cursor: pointer;

    &:hover, .c-file--focus & {
      .c-file__toggle__spin--hover {
        stroke-dashoffset: 0px;
      }

      .c-file__toggle__plus::after {
        transform: rotate(90deg);
      }
    }
  }

  &__selected {
    position: relative;
    height: 100%;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 40px;
  }

  &__toggle {
    position: absolute;
    right: 1px;
    top: 50%;
    width: 38px;
    height: 38px;

    z-index: 11;

    transform: translate3d(0, -50%, 0);
    pointer-events: none;

    &__spin {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);

        circle {
          fill: none;
          stroke: rgba($color-label, 0.3);
          stroke-width: 1px;

          &.c-select__toggle__spin--hover {
            stroke: $color-label;
          }
        }
      }

      &--hover {
        stroke-dasharray: 107px;
        stroke-dashoffset: 107px;

        transition: all 0.5s cubic-bezier(.165,.84,.44,1);
      }
    }

    &__plus {
      position: absolute;
      top: 1px;
      left: 0;
      width: 100%;
      height: 100%;

      &::after {
        content: '+';
        position: absolute;
        top: 0px;
        left: -1px;
        width: 100%;
        height: 100%;
        line-height: 36px;
        text-align: center;
        font-size: 16px;
        color: $color-label;

        transition: all 0.5s cubic-bezier(.165,.84,.44,1);
      }
    }
  }
}

</style>
