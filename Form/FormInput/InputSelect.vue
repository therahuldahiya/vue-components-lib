<template>
  <div
    class="form__select"
  >
    <select
      :id="params.id"
      :name="params.name"
      :v-model="params.id"
      :required="params.required"
      :aria-required="params.required"
      tabindex="-1"
      aria-hidden="true"
      class="c-hidden"
    >
      <option
        value=""
        data-placeholder
      />
      <option
        v-for="option in params.choices"
        :key="option.value"
        :value="option.value"
        :selected="option.selected"
        :aria-selected="option.selected"
        :disabled="option.disabled"
        :aria-label="option.label"
        v-html="option.label"
      />
    </select>

    <div
      :class="[
        'c-select',
        toggle ? 'c-select--open' : false,
      ]"
    >
      <div
        class="c-select__wrapper"
        @click="toggle = !toggle"
      >
        <div
          class="c-select__selected"
          v-html="selectValue"
        />
        <div class="c-select__toggle">
          <div class="c-select__toggle__spin">
            <svg viewBox="0 0 38 38">
              <circle
                cx="18"
                cy="18"
                r="17"
              />
              <circle
                class="c-select__toggle__spin--hover"
                cx="18"
                cy="18"
                r="17"
              />
            </svg>
          </div>
          <div class="c-select__toggle__plus" />
        </div>
      </div>
      <div
        ref="list"
        :class="['c-select__list', toggle ? 'c-select__list--open' : false ]"
      >
        <div
          class="c-select__list__wrapper"
          role="listbox"
          tabindex="0"
        >
          <div
            v-for="option in params.choices"
            :key="option.value"
            :data-value="option.value"
            :aria-label="option.label"
            :class="[
              'c-select__list__option',
              selected.length > 0 && option.value === selected[0].value ? 'c-select__list__option--selected' : false,
            ]"
            role="option"
            @click="change"
          >
            <span v-html="option.label" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputSelect',

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

    value: {
      type: [String, Array],
      required: false,
      default: null,
    },
  },

  data() {
    return {
      choices: [],
      selected: [],
      values: [],
      toggle: false,
    };
  },

  computed: {
    selectValue() {
      return this.selected.length > 0 && typeof this.selected[0].dataset.placeholder === 'undefined' ? this.selected[0].label : '&nbsp;';
    },
  },

  watch: {
    toggle(n) {
      this.$refs.list.scrollTo(0, 0);

      if (n) {
        window.addEventListener('click', this.detectClickOutside);
      } else {
        window.removeEventListener('click', this.detectClickOutside);
      }
    },
  },

  mounted() {
    this.choices = Array.from(this.$el.querySelectorAll('option'));

    this.choices.forEach((choice) => {
      if (choice.selected) {
        this.selected.push(choice);
      }
    });

    document.addEventListener('keydown', this.setToggle);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.setToggle);
    window.removeEventListener('click', this.detectClickOutside);
  },

  methods: {
    change(event) {
      const data = event.target.dataset.value;

      this.selected = [];

      this.choices.forEach((choice) => {
        if (choice.value === data) {
          choice.selected = true; // eslint-disable-line
          this.selected.push(choice);
          this.values.push(choice.value);
        }
      });

      this.toggle = !this.toggle;

      this.setValue(this.values);
    },

    setToggle() {
      if (this.toggle) this.toggle = !this.toggle;
    },

    detectClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.setToggle();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$color-input: #464652;
$color-error: #FA0606;
$color-label: #929292;

.c-select {
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  color: $color-input;

  &__wrapper {
    position: relative;
    width: 100%;
    cursor: pointer;
    overflow: hidden;

    &:hover {
      .c-select__toggle__spin--hover {
        stroke-dashoffset: 0px;
      }

      .c-select__toggle__plus::after {
        transform: rotate(90deg);
      }
    }
  }

  &--open {
    .c-select__toggle__plus::after {
      transform: rotate(45deg);
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

  &__list {
    position: absolute;
    display: block;
    z-index: 10;
    top: 83px;
    left: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    background: #ffffff;
    opacity: 0;
    visibility: hidden;

    font-size: 1.375rem;
    // line-height: 1;
    width: 100%;
    border: 1px solid $color-label;

    transition: all 0.3s cubic-bezier(.165,.84,.44,1);

    &--open {
      opacity: 1;
      visibility: visible;
    }

    &::-webkit-scrollbar-track {
      background-color: rgba($color-label, 0.1);
    }

    &::-webkit-scrollbar {
      width: 4px;
      background-color: #ffffff;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $color-input;
    }

    &__wrapper {
      position: relative;
      max-height: 205px;
      padding: 0 30px 0 30px;
      overflow-x: hidden;
    }

    &__option {
      position: relative;
      padding: 0 30px 0 0px;
      color: $color-label;
      cursor: pointer;

      span {
        display: block;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        pointer-events: none;
      }

      transition: all 0.3s cubic-bezier(.165,.84,.44,1);

      &:not(:last-child) {
        border-bottom: 1px solid rgba($color-label, 0.25);
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;

        transform: translate3d(-50%, -50%, 0);
        opacity: 0;
        width: 4px;
        height: 4px;
        background: $color-input;
        border-radius: 50%;

        transition: opacity 0.15s cubic-bezier(.165,.84,.44,1), transform 0.3s cubic-bezier(.165,.84,.44,1);
      }

      &:hover, &--selected {
        color: $color-input;
        padding: 0 30px 0 20px;
        border-color: $color-label;

        &::after {
          opacity: 1;
          transform: translate3d(0%, -50%, 0);
          transition-delay: 0.1s;
        }
      }
    }
  }
}

.form__input--invalid {
  .c-select__toggle__spin svg circle {
    stroke: rgba($color-error, 0.5);
  }

  .c-select__toggle__plus::after {
    color: $color-error;
  }
}
</style>
