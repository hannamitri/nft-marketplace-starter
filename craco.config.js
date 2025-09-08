const webpack = require('webpack');

module.exports = {
  webpack: {
    plugins: {
      add: [
        // other plugins,
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
        }),
      ]
    }
  }
};