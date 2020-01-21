var file = require("../../../file/file.js");
function GetCss(parcel,backFunc){
	console.log("Get Css Ok");
	file.GetFile("css",parcel.GetPara("FileName")+".css",1,function (err,date){
		if(err){
			backFunc({
				"status" : 404,
				"content": "Css File undefined",
				"conType": "text/html",
			});
		}else{
			backFunc({
				"status" : 200,
				"content": date,
				"conType": "text/html",
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