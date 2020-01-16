//run  Node服务启动文件
var http = require("http");
var router = require("./routers/router.js");

http.createServer(router.manage).listen(8080);