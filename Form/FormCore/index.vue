<template>
  <form
    ref="form"
    :data-theme="theme"
    role="form"
    aria-label="Form name"
    novalidate="novalidate"
    method="post"
    class="c-template c-template--form"
    @submit.prevent="sendForm"
  >
    <slot
      v-for="slot in slots"
      :name="slot"
    />
  </form>
</template>

<script>
export default {
  name: 'FormCore',

  props: {
    theme: {
      type: String,
      required: false,
      default: 'default',
    },
    slots: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
    };
  },

  mounted() {
  },

  methods: {
    sendForm() {
      const validation = this.checkValidate();

      if (validation) {
        this.state = 'sending';
        const formData = new FormData(this.$refs.form);

        for (let value of formData.values()) { // eslint-disable-line
          console.log(value);
        }

        this.name = formData.get('fname');

        // const user = {
        //   email: formData.get('email'),
        //   fname: formData.get('fname'),
        //   lname: formData.get('lname'),
        // };

        // mailchimp(this.mcConfig, user)
        //   .then(response => response.json()
        //     .then((json) => {
        //       console.log('json: ', json);
        //       if (json.result === 'success') {
        //         this.state = 'sent';
        //       }
        //     }).catch((ex) => {
        //       console.log('ex: ', ex);
        //     }));
      }
    },

    checkValidate() {
      let status = true;
      this.$children.forEach((input) => {
        if (input.type === 'submit') return;

        const check = input.checkValue();
        if (check === 'invalid') status = false;
      });

      return status;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/index';
$color-input: #464652;
$color-label: #929292;

form {
  display: flex;
  flex-flow: row wrap;

  .form__row {
    min-width: 0;

    & > .form__group {
      margin: 0 0 40px 0;

      &--thanks {
        margin: 0 0 20px 0;
      }

      @include mq(ipadP) {
        margin: 0;

        &--thanks {
          margin: 0;
        }
      }
    }

    @include mq(ipadP) {
      padding: 20px 0;

      &--thanks {
        padding: 10px 0;
      }
    }
  }

  .form__row, .form__group {
    position: relative;
    display: flex;
    flex: 0 0 100%;
    flex-flow: row wrap;

    justify-content: space-between;
    align-items: baseline;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s cubic-bezier(.165,.84,.44,1) 0.7s,
    transform 0.5s cubic-bezier(.165,.84,.44,1) 0.7s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate3d(0%, 100%, 0%);
}

a {
  text-decoration: none;
  color: inherit;
  display: inline-block;
  margin-left: 2px;

  @at-root [data-theme="default"] & {
    bdi {
      position: relative;
      display: inline-block;
      vertical-align: top;
      color: $color-input;
      padding: 0 0 12px 0;
      overflow: hidden;

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

    &:hover {
      bdi {
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
  }
}
</style>
