const webpack = require('webpack');

module.exports = {
  // other webpack configuration options...
  plugins: [
    // other plugins,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
  ],
};
