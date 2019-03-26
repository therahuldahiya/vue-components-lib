module.exports = {
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'vue/no-v-html': 'off',
  }
}