<template>
  <label
    :for="params.id"
    :aria-labelledby="params.id"
    :aria-label="params.label"
    :class="[
      'form__label',
      status === 'invalid' ? 'form__label--invalid' : false,
      active ? 'form__label--focus' : false,
    ]"
  >
    <span v-html="params.label" />
    <span
      v-if="params.required"
      :class="['form__required']"
      v-html="'(*)'"
    />
  </label>
</template>

<script>
export default {
  name: 'FormLabel',

  props: {
    params: {
      type: Object,
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

    value: {
      type: [String, Array],
      required: false,
      default: null,
    },
  },

  computed: {
    active() {
      let val = this.value !== null;
      if (Array.isArray(this.value)) {
        val = this.value !== null && this.value.length !== 0;
      } else {
        val = this.value !== null && this.value !== '';
      }
      return this.focusable || val;
    },
  },
};
</script>

<style lang="scss">
$color-label: #929292;
$color-error: #FA0606;

.form__label {
  @at-root [data-theme="default"] & {
    font-weight: 400;
    font-size: 0.875rem;
    color: $color-label;

    position: absolute;
    left: 0;
    top: 50%;
    transform: translate3d(0, -50%, 0);

    transition: all 0.2s cubic-bezier(.165,.84,.44,1);

    &--invalid {
      color: $color-error;
    }

    &--focus {
      top: 0%;
    }

    .form__required {
      display: inline-block;
      margin-left: 5px;
      letter-spacing: 2px;
    }
  }
}
</style>
