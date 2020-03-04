var file = require("../../../file/file.js");
function GetImage(parcel,backFunc){
	file.GetImage("img",parcel.Url("iName"),1,function (err,date){
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
			 "url":"image",//Html
			 "func" : null,
			 "maze":[
				{
					"url":"iName#[a-z]+",
					"func":GetImage,
					"maze":[],
				}
			 ]
		}
	}
}