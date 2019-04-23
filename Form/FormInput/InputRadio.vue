<template>
  <div
    class="form__radio"
    role="radiogroup"
    :data-direction="params.layout.direction ? params.layout.direction : 'horizontal'"
    :data-align="params.layout.direction === 'horizontal' ? params.layout.align : false"
  >
    <div
      v-for="input in params.choices"
      :key="input.id"
      class="form__radio__choices"
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
        type="radio"
        class="c-hidden"
        @change="change"
      >
      <label
        :for="input.id"
        :class="['form__label']"
      >
        <span class="form__input--radio__input" />
        <span v-html="input.label" />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputRadio',

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
@import '../../style/index';
$color-input: #464652;
$color-label: #929292;
$color-error: #FA0606;

.form__radio {
  display: flex;
  flex-flow: row wrap;

  &[data-direction="horizontal"] {
    flex-direction: row;

    .form__radio__choices {
      margin-right: 100px;
    }

    &[data-align="space-between"] {
      @include mq(ipadP) {
        justify-content: space-between;

        .form__radio__choices {
          margin-right: 0px;
        }
      }
    }
  }

  &[data-direction="vertical"] {
    .form__radio__choices {
      flex: 0 0 100%;

      &:first-child {
        margin-top: 10px;
      }
    }
  }
}

.form__input--radio {
  @at-root [data-theme="default"] & {
    .form__label {
      top: 0;
      transform: none;
      position: relative;

      cursor: pointer;
    }

    input {
      &:checked + label {
        .form__input--radio__input {
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
      border-radius: 50%;

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
    .form__input--radio__input {
      border-color: $color-error;
    }

    .form__required {
      color: $color-error;
    }
  }
}

</style>

<style lang="scss">
.form__input--radio.form__radio[data-direction="vertical"] {
  height: auto;
  line-height: 1;

  // & + label {
  //   padding-top: 20px;
  // }
}
</style>
