var file = require("../../../file/file.js");
function GetCss(parcel,backFunc){
	file.GetFile("css",parcel.Url("FileName")+".css",1,function (err,date){
		if(err){
			backFunc({
				"status" : 404,
				"content": "Css File undefined",
				"conType": "text/css"+";charset=utf-8",
			});
		}else{
			backFunc({
				"status" : 200,
				"content": date.toString(),
				"conType": "text/css"+";charset=utf-8",	
			});
		}
	});
}
module.exports = {
	getpath : function(){
		return {
			 "url":"css",//Html
			 "func" : null,
			 "maze":[
				{
					"url":"FileName#[a-z]+",
					"func":GetCss,
					"maze":[],
				}
			 ]
		}
	}
}