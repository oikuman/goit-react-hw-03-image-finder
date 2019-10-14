module.exports = {
  "src/**/*.{js,jsx}?(x)":
    "yarn run lint:format && yarn run lint:fix && git add .",
  "src/**/*.{json,css}?(x)": "yarn run lint:format && git add ."
};
