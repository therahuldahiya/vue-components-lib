<template>
  <section class="form__thanks">
    <div class="form__thanks__wrapper">
      <div class="form__row form__row--thanks">
        <div
          class="form__group"
          data-size="auto"
        >
          <p>Thanks</p>
          <div class="form__line" />
        </div>
      </div>
      <div class="form__row form__row--thanks">
        <div
          class="form__group"
          data-size="auto"
        >
          <p v-html="name" />
          <div class="form__line" />
        </div>
      </div>
      <div class="form__row form__row--thanks">
        <div
          class="form__group"
          data-size="auto"
        >
          <p>We respond you, as soon as possible.</p>
          <div class="form__line" />
        </div>
      </div>
    </div>

    <div class="form__back">
      Back to <a href="#!"><bdi>Homepage</bdi></a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FormThanks',

  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$color-input: #464652;
$color-error: #FA0606;
$color-label: #929292;

.form__thanks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row wrap;
  align-items: center;

  &__wrapper {
    position: relative;
  }

  p {
    margin: 0;
    font-size: 3.125rem;
    line-height: 84px;
    color: $color-input;
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
  }
}

.form__back {
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 0.875rem;

  color: $color-label;

  a {
    display: inline-block;
    vertical-align: sub;
    margin-left: 2px;
  }
}
</style>
