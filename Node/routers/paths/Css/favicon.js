var file = require("../../../file/file.js");
var path=require('path');
function GetIcon(parcel,backFunc){
	file.GetImage("i","icon.jpg",1,function (err,date){
		if(err){
			backFunc({
				"status" : 404,
				"content": "img File undefined",
				"conType": "text/text",
			});
		}else{
			backFunc({
				"status" : 200,
				"content": date["data"],
				"conType": date["info"]["mimeType"],
				"head"   : {
					"Content-Disposition":"inline",
					"accept-ranges":"bytes",
				}
			});
		}
	});
}
module.exports = {
	getpath : function(){
		return {
			 "url":"favicon.ico",//Html
			 "func" : GetIcon,
			 "maze":[
			 ]
		}
	}
}