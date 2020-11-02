const path = require(`path`);

module.exports = {
  entry: [
    `./js/util.js`,
    `./js/sorting.js`,
    `./js/backend.js`,
    `./js/gallery.js`,
    `./js/preview.js`,
    `./js/editor.js`,
    `./js/validation.js`,
    `./js/form.js`,
    `./js/slider.js`,
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
