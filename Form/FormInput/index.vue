<template>
  <div
    :data-size="params.size || 'auto'"
    :class="[
      'form__group',
      `form__group--${type}`,
      state !== null ? `form__group--${state}` : false
    ]"
  >
    <component
      :is="componentsMap[type]"
      :params="params"
      :status="status"
      :set-value="type !== 'submit' ? setValue : false"
      :focusable="focusable"
      :set-focus="type !== 'submit' && type !== 'checkbox' && type !== 'radio' ? setFocus : false"
      :value="type === 'select' ? value : false"
      :state="type === 'submit' ? state : false"
      :class="[
        'form__input',
        `form__input--${type}`,
        status === 'invalid' ? 'form__input--invalid' : false
      ]"
    />
    <FormLabel
      v-if="params.label"
      :params="params"
      :status="status"
      :focusable="focusable"
      :value="value"
      :class="[`form__label--${type}`,]"
    />
    <!-- <FormRequired
      v-if="params.required"
      :params="params.type"
      :status="status"
    />
    <FormError
      :params="params.type"
      :status="status"
    /> -->

    <div
      v-if="params.type !== 'checkbox' && params.type !== 'radio' && params.type !== 'submit'"
      :class="[
        'form__line',
        status === 'invalid' ? 'form__line--invalid' : false
      ]"
    />
  </div>
</template>

<script>
import InputCheckbox from './InputCheckbox.vue';
import InputDate from './InputDate.vue';
import InputEmail from './InputEmail.vue';
import InputFile from './InputFile.vue';
import InputHidden from './InputHidden.vue';
import InputNumber from './InputNumber.vue';
import InputPassword from './InputPassword.vue';
import InputRadio from './InputRadio.vue';
import InputRange from './InputRange.vue';
import InputSelect from './InputSelect.vue';
import InputSubmit from './InputSubmit.vue';
import InputTel from './InputTel.vue';
import InputText from './InputText.vue';
import InputTextarea from './InputTextarea.vue';
import InputUrl from './InputUrl.vue';

import FormLabel from '../FormExtra/FormLabel.vue';
// import FormError from '../FormExtra/FormError.vue';
// import FormRequired from '../FormExtra/FormRequired.vue';

export default {
  name: 'FormInput',

  components: {
    InputCheckbox,
    InputDate,
    InputEmail,
    InputFile,
    InputHidden,
    InputNumber,
    InputPassword,
    InputRadio,
    InputRange,
    InputSelect,
    InputSubmit,
    InputTel,
    InputText,
    InputTextarea,
    InputUrl,

    FormLabel,
    // FormError,
    // FormRequired,
  },

  props: {
    type: {
      type: String,
      required: true,
    },

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
      value: null,
      status: 'valid',
      focusable: false,

      componentsMap: {
        checkbox: 'InputCheckbox',
        date: 'InputDate',
        email: 'InputEmail',
        file: 'InputFile',
        hidden: 'InputHidden',
        number: 'InputNumber',
        password: 'InputPassword',
        radio: 'InputRadio',
        range: 'InputRange',
        select: 'InputSelect',
        submit: 'InputSubmit',
        tel: 'InputTel',
        text: 'InputText',
        textarea: 'InputTextarea',
        url: 'InputUrl',
      },
    };
  },

  mounted() {
    if (typeof this.params.value !== 'undefined') {
      this.value = this.params.value;
    } else if (this.params.type === 'checkbox' || this.params.type === 'radio' || this.params.type === 'select') {
      this.value = [];

      this.params.choices.forEach((choice) => {
        if (choice.checked || choice.selected) {
          this.value.push(choice.value);
        }
      });
    }
  },

  methods: {
    setValue(value) {
      this.value = value;
      this.checkValue();
    },

    setFocus(value) {
      this.focusable = value;
    },

    checkValue() {
      if ((this.value !== null && this.value !== '')) {
        this.status = 'valid';
      } else if (this.params.required) {
        this.status = 'invalid';
      }

      if (this.type === 'email') {
        if (this.checkEmail(this.value)) {
          this.status = 'valid';
        } else if ((this.value !== null && this.value !== '')) {
          this.status = 'invalid';
        }
      }

      if (this.type === 'url') {
        if (this.checkUrl(this.value)) {
          this.status = 'valid';
        } else if ((this.value !== null && this.value !== '')) {
          this.status = 'invalid';
        }
      }

      if (this.type === 'number' || this.type === 'tel') {
        if (this.checkNumber(this.value)) {
          this.status = 'valid';
        } else if ((this.value !== null && this.value !== '')) {
          this.status = 'invalid';
        }
      }

      if (this.params.type === 'checkbox' || this.params.type === 'radio' || this.params.type === 'select') {
        if (Array.isArray(this.value)) {
          this.status = 'valid';

          if (this.params.required && this.value.length === 0) {
            this.status = 'invalid';
          }
        } else {
          this.status = 'invalid';
        }
      }

      return this.status;
    },

    checkEmail(value) {
      const pattern = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
      return pattern.test(value);
    },

    checkUrl(value) {
      const pattern = new RegExp(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i);
      return pattern.test(value);
    },

    checkNumber(value) {
      const pattern = new RegExp(/^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*$/);
      return pattern.test(value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/index';

$color-input: #464652;
$color-error: #FA0606;
$color-label: #929292;

[data-size] {
  flex: 0 0 100%;
  max-width: 100%;
}

@include mq(ipadP) {
  [data-size="25"] {
    flex: 0 0 calc(25% - (#{$gutter} / 2));
    max-width: calc(25% - (#{$gutter} / 2));
  }

  [data-size="33"] {
    flex: 0 0 calc(33% - (#{$gutter} / 2));
    max-width: calc(33% - (#{$gutter} / 2));
  }

  [data-size="50"] {
    flex: 0 0 calc(50% - (#{$gutter} / 2));
    max-width: calc(50% - (#{$gutter} / 2));
  }

  [data-size="66"] {
    flex: 0 0 calc(66% - (#{$gutter} / 2));
    max-width: calc(66% - (#{$gutter} / 2));
  }

  [data-size="75"] {
    flex: 0 0 calc(75% - (#{$gutter} / 2));
    max-width: calc(75% - (#{$gutter} / 2));
  }

  [data-size="100"] {
    flex: 0 0 100%;
    max-width: 100%;
  }

  [data-size="auto"] {
    flex: 0 0 auto;
    max-width: 100%;
  }
}

.form__group {
  @at-root [data-theme="default"] & {
    position: relative;
    min-height: 84px;

    display: flex;
    flex-flow: column wrap;
    justify-content: flex-end;

    &--checkbox {
      @include mq(ipadP) {
        .form__group + .form__group {
          margin-left: 100px;
        }
      }
    }

    &--submit {
      min-height: 0;
    }

    &--sent {
      transform: translate3d(0, 50%, 0);
      opacity: 0;
      pointer-events: none;

      transition: opacity 0.7s cubic-bezier(.165,.84,.44,1),
        transform 0.5s cubic-bezier(.165,.84,.44,1);

      &.form__group--submit {
        transition-delay: 0.7s;
      }
    }
  }
}

.form__input {
  @at-root [data-theme="default"] & {
    position: relative;
    flex: 1 0 0;
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    appearance: none;
    border: 0;
    padding: 0;
    box-shadow: none;
    outline: transparent;

    font-size: 3.125rem;
    line-height: 84px;
    color: $color-input;

    &--invalid {
      border-color: $color-error;
    }

    &--submit {
      flex: 0 0 auto;
      height: auto;
      padding: 0 0 12px 0;

      font-size: 0.875rem;
      line-height: 1rem;
      cursor: pointer;
    }

    &--textarea {
      line-height: 1;
      height: 84px;
    }

    &--checkbox {
      line-height: 1;
      height: 66px;
    }

    &--select, &--file {
      display: flex;
      flex-flow: row wrap;
    }

    &--radio {
      order: 1;
      // min-height: 66px;
      line-height: 1;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus
    &:-webkit-autofill,
    &:-webkit-autofill:hover
    &:-webkit-autofill:focus,
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-box-shadow: 0 0 0px 1000px white inset !important;
      transition: background-color 0s 50000s;
    }
  }
}

.form__label {
  &--radio {
    order: 0;
    top: 0;
    transform: none;
    position: relative;

    transform: translate3d(0, -50%, 0);
  }
}

.form__line {
  display: none;

  @at-root [data-theme="default"] & {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;

    background: $color-label;

    &--invalid {
      background: $color-error;
    }
  }
}
</style>
