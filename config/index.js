exports.isIpHost = true;
exports.isHttps = false;
exports.port = "8080";
exports.proxy = [
  {
    context: ["/api"],
    target: "http://localhost:10426/",
    secure: false,
    // pathRewrite:{
    //   '^/api': ""
    // },
  },
];
