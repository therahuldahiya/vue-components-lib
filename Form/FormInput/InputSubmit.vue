<template>
  <div class="form__input__wrapper">
    <div
      :class="[
        'form__input__text',
        state !== null ? `form__input__text--${state}` : false,
      ]"
      :data-sending="params.sending"
      :data-sent="params.sent"
    >
      {{ params.text }}
    </div>
    <input
      type="submit"
    >
    <div class="form__input__line" />
  </div>
</template>

<script>
export default {
  name: 'InputSubmit',

  props: {
    params: {
      type: Object,
      required: true,
    },

    state: {
      type: String,
      required: false,
      default: null,
    },
  },

  data() {
    return {
      text: null,
    };
  },
};
</script>

<style lang="scss" scoped>
$color-input: #464652;
$color-label: #929292;

input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-appearance: none;
  appearance: none;
  border: 0;
  padding: 0;
  box-shadow: none;
  outline: transparent;
  opacity: 0;

  cursor: pointer;

  &:hover + .form__input__line {
    &::before {
      transform: translate3d(102%, 0, 0);
      opacity: 1;
    }

    &::after {
      transition: transform 0.4s cubic-bezier(.165,.84,.44,1);
      transition-delay: 0.3s;
      transform: translate3d(0%, 0, 0);
      opacity: 1;
    }
  }
}

.form__input {
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1 0 0;

  &__wrapper {
    position: relative;
    overflow: hidden;
  }

  &__text {
    position: relative;
    transition: transform 0.3s cubic-bezier(.165,.84,.44,1);

    &::before,
    &::after {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
    }

    &::before {
      content: attr(data-sending);
      transform: translate3d(0, 102%, 0);
      opacity: 0;
      transition: opacity 0.2s cubic-bezier(.165,.84,.44,1);
    }

    &::after {
      content: attr(data-sent);
      transform: translate3d(0, 204%, 0);
      opacity: 0;
      transition: opacity 0.2s cubic-bezier(.165,.84,.44,1);
    }

    &--sending {
      transform: translate3d(0, -102%, 0);

      &::before {
        opacity: 1;
      }
    }

    &--sent {
      transform: translate3d(0, -204%, 0);

      &::after {
        opacity: 1;
      }
    }
  }

  &__line {
    @at-root [data-theme="default"] & {
      display: block;
      position: absolute;
      bottom: 1px;
      left: 0;
      width: 100%;
      height: 1px;

      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;

        background: $color-label;
      }

      &::before {
        transform: translate3d(0%, 0, 0);
        opacity: 1;
        transition: transform 0.4s cubic-bezier(.165,.84,.44,1);
      }

      &::after {
        transform: translate3d(-102%, 0, 0);
        opacity: 0;
      }
    }
  }
}
</style>
