const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/wss",
        createProxyMiddleware({ target: "https://dongwoossltest.shop/api", wss: true })
    );
};