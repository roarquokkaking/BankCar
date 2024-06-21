//  const { createProxyMiddleware } = require("http-proxy-middleware");

//  module.exports = function(app) {
//      app.use(
//          "/api/ChattingRoom",  // 프록시할 경로
//          createProxyMiddleware({
//              target: "https://dongwoossltest.shop",  // WebSocket 서버 주소
//              ws: true,
//              secure: true,
//              changeOrigin: true,
//          })
//      );
//  };


//const { createProxyMiddleware } = require("http-proxy-middleware");
//
//module.exports = (app) => {
//    app.use(
//        "/ws",
//        createProxyMiddleware({ target: "http://localhost:8080", ws: true })
//    );
//};