module.exports = {
    root: true,
    env: {
        es6: true,
        node: true
    },
    extends: 'eslint:recommended',
    rules: {
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        'no-console': ['off'],
        'linebreak-style': ['error', 'windows'],
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module'
    },
};
