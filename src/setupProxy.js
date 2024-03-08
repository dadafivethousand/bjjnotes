const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // This is the api prefix you want to proxy to the target URL
    createProxyMiddleware({
      target: process.env.REACT_APP_API_URL, // Target host
      changeOrigin: true, // Needed for virtual hosted sites
    })
  );
};
