module.exports = {
    extends: ['airbnb-typescript/base'],
    parserOptions: {
        project: './tsconfig.json',
    },
    "rules": {
        "max-len": ["warn", {"code": 150}],
        "no-underscore-dangle": "off",
        "no-console": "off",
        "no-unused-vars": "off"
    }
};