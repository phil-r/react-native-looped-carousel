module.exports = {
  "parser": "babel-eslint",
  "env": {
    "es6": true
  },

  "extends": "airbnb",

  "plugins": [
    "react"
  ],

  "rules": {
    // resets
    "no-underscore-dangle": 0,
    "arrow-parens": 0,
    "no-use-before-define": 0,
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "react/sort-comp": 0,
    "react/jsx-filename-extension": 0,
    "react/no-array-index-key": 0,
  }
};
