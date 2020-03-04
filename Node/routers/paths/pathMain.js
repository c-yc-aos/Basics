var htmlPath = require("./Html/html.js");
var jsPath = require("./Js/js.js");
var cssPath = require("./Css/css.js");
var iPath = require("./Css/i.js");
var imgPath = require("./Img/img.js");
//路由  可分组 指向function  
module.exports = {
	getpath : function(){
		return {	
			 "maze":[
			 htmlPath.getpath(),
			 jsPath.getpath(),
			 cssPath.getpath(),
			 iPath.getpath(),
			 imgPath.getpath(),
			 ]
		}
	}
}