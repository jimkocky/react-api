const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/steamapi',
    createProxyMiddleware({
      target: 'https://api.steampowered.com',
      changeOrigin: true,
      pathRewrite: {
        '^/steamapi': '',
      },
    })
  );
};