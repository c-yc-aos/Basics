//file
var fs = require("fs");
var path = require("path");
var _path = {
	"html" : "../../Html/",
	"js"   : "../../Js/",
	"Css"  : "../../Css/",
	"i"    : "../../Css/i/",
	"img"  : "../../Img/",
}
var cache = {};
module.exports = {
	GetFile : function (Type,Absolute,v,func) {
		if (cache[Type+Absolute+v]) return func(null,cache[Type+Absolute+v]);
		fs.readFile(path.join(__dirname,_path[Type]+Absolute),"utf-8",function ( err , data ){
			if (err) {
				console.log("readFile Error !",_path[Type]+Absolute,err);
				func(err,"");
			}else{
				cache[Type+Absolute+v] = data.toString();
				func(err,cache[Type+Absolute+v]);
			}
		});
	}
}