// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Proxy only paths that start with '/api'
    createProxyMiddleware({
      target: 'https://didactic-space-guide-69g79xrq5xjr25466-5000.app.github.dev',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api': '/api' } // Rewrite to maintain the '/api' path
    })
  );
};
