//file
var fs = require("fs");
var path = require("path");
var imageinfo = require("./imageinfo.js");
var _path = {
	"html" : "../../Html/",
	"js"   : "../../Js/",
	"css"  : "../../Css/",
	"i"    : "../../Css/i/",
	"img"  : "../../Img/",
}
var cache = {};
var cacheOpen = false ;//缓存服务是否开启
module.exports = {
	GetFile : function (Type,Absolute,v,func) {
		if (cacheOpen && cache[Type+Absolute+v] ) return func(null,cache[Type+Absolute+v]);
		fs.readFile(path.join(__dirname,_path[Type]+Absolute),function ( err , data ){
			if (err) {
				console.log("readFile Error !",_path[Type]+Absolute,err);
				func(err,"");
			}else{
				cache[Type+Absolute+v] = data;
				func(err,cache[Type+Absolute+v]);
			}
		});
	},
	GetImage: function (Type,Absolute,v,func) {
		if (cacheOpen && cache[Type+Absolute+v] ) return func(null,cache[Type+Absolute+v]);
		fs.readFile(path.join(__dirname,_path[Type]+Absolute),function ( err , data ){
			if (err) {
				console.log("readFile Error !",_path[Type]+Absolute,err);
				func(err,"");
			}else{
				cache[Type+Absolute+v] = {
					"data":data,
					"info":imageinfo(data),
				};
				func(err,cache[Type+Absolute+v]);
			}
		});
	}
}