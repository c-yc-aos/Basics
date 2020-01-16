//file
var fs = require("fs");
var path = {
	"html" : "../../Html/"
	"js"   : "../../Js/"
	"Css"  : "../../Css/"
	"i"    : "../../Css/i/"
	"img"  : "../../Img/"
}
var cache = {};
module.exports = {
	GetFile : function (Type,Absolute,v,func) {
		if (cache[Type+Absolute+v]) return func(null,cache[Type+Absolute+v]);
		fs.readFile(path[Type]+Absolute,"utf-8",function ( err , data ){
			console.log(data)
			if (err) {
				console.log("readFile Error !",path[Type]+Absolute,err);
				func(err,"");
			}else{
				cache[Type+Absolute+v] = data.toString();
				func(err,cache[Type+Absolute+v]);
			}
		});
	}
	
}