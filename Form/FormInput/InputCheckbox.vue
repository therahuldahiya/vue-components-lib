<template>
  <div class="form__checkbox">
    <div
      v-for="input in params.choices"
      :key="input.id"
      class="form__checkbox__choices"
    >
      <input
        :id="input.id"
        :v-model="input.id"
        :name="params.name"
        :value="input.value"
        :checked="input.checked"
        :aria-checked="input.checked"
        :required="params.required"
        :aria-required="params.required"
        type="checkbox"
        role="checkbox"
        class="c-hidden"
        @change="change"
      >
      <label
        :for="input.id"
        :class="['form__label']"
      >
        <span class="form__input--checkbox__input" />
        <span v-html="input.label" />

        <span
          v-if="params.required"
          :class="['form__required']"
          v-html="'(*)'"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputCheckbox',

  props: {
    params: {
      type: Object,
      required: true,
    },

    setValue: {
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
      choices: [],
      checked: [],
    };
  },

  mounted() {
    this.choices = Array.from(this.$el.querySelectorAll(`input[name="${this.params.name}"]`));
  },

  methods: {
    change() {
      this.checked = [];

      this.choices.forEach((choice) => {
        if (choice.checked) this.checked.push(choice.name);
      });

      this.setValue(this.checked);
    },
  },
};
</script>

<style lang="scss" scoped>
$color-input: #464652;
$color-label: #929292;
$color-error: #FA0606;

.form__input--checkbox {
  @at-root [data-theme="default"] & {
    .form__label {
      top: 0;
      transform: none;
      position: relative;
      padding: 0 0 12px 0;

      cursor: pointer;
    }

    .form__required {
      display: inline-block;
      margin-left: 5px;
      letter-spacing: 2px;
    }

    input {
      &:checked + label {
        .form__input--checkbox__input {
          &::after {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
          }
        }
      }
    }

    &__input {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 1px solid $color-label;
      margin: 0 8px 0 0;
      vertical-align: text-bottom;

      &::after {
        content: '';
        position: absolute;
        top: 4px;
        left: 4px;
        width: 8px;
        height: 8px;

        background: $color-input;

        opacity: 0;
        visibility: hidden;
        transform: scale(0);

        border-radius: 50%;


        transition: all 0.2s cubic-bezier(.165,.84,.44,1);
      }
    }
  }

  &.form__input--invalid {
    .form__input--checkbox__input {
      border-color: $color-error;
    }

    .form__required {
      color: $color-error;
    }
  }
}

</style>
