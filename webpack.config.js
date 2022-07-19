const path = require('path');

module.exports = {
  entry: './public/js/api.js',
  output: {
    path: path.resolve(__dirname, 'public/webpack'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [{ test: /\.css$/, use:['style-loader','css-loader'] },],
  },
  mode:'production',
};