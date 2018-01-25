module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "commonjs": true,
    "mocha": true
  },
  "rules": {
    "no-underscore-dangle": "off",
    "react/jsx-filename-extension": "off",
    "react/forbid-prop-types": "off",
    "max-len": "off",
    "react/no-array-index-key": "off",
  }
};
