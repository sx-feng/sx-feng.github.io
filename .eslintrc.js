module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021, // ✅ 改成数字，不要写 'latest'
    sourceType: 'module'
  },
  rules: {
    'no-undef': 'off',
    'vue/script-setup-uses-vars': 'off'
  }
}
