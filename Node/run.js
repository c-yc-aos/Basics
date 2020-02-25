//run  Node服务启动文件
var http = require("http");
var router = require("./routers/router.js");
router.Into();
http.createServer(router.manage).listen(8080);
console.log("已开启服务　0.0.0.0:8080/");