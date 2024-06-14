const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/api/wss",
        createProxyMiddleware({ target: "https://dongwoossltest.shop", wss: true })
    );
};