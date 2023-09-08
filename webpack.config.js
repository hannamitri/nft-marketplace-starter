const webpack = require("webpack");

module.exports = {
  // ...other webpack configuration settings... idk if this is necessary but said in docs

  plugins: [
    // ...other plugins...

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],

  // ...other webpack configuration settings...
};
