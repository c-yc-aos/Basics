var file = require("../../../file/file.js");
function GetI(parcel,backFunc){
	file.GetImage("i",parcel.Url("iName"),1,function (err,date){
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
			 "url":"i",//Html
			 "func" : null,
			 "maze":[
				{
					"url":"iName#[a-z]+",
					"func":GetI,
					"maze":[],
				}
			 ]
		}
	}
}