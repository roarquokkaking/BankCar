const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/ws/chat",
        createProxyMiddleware({ target: "http://localhost:8080", ws: true })
    );
};