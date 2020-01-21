var htmlPath = require("./Html/html.js");
//路由  可分组 指向function  
module.exports = {
	getpath : function(){
		return {	
			 "maze":[htmlPath.getpath()]
		}
	}
}