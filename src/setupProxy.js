// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/authorItems', '/topSellers', '/newItems'],
    createProxyMiddleware({
      target: 'https://us-central1-nft-cloud-functions.cloudfunctions.net',
      changeOrigin: true,
      logLevel: 'debug',           // you’ll see proxy logs in your terminal
    })
  );
};
