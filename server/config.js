const path = require("path");

module.exports = {
  static_root: path.resolve(__dirname, "../"),
  proxyConfig: {
    target: "http://192.168.1.246:10437",
    pathRewrite: {
      "^/api": ""
    },
    secure: false,
  },
  api_prefix: "/api",
  port: 10426,
};
