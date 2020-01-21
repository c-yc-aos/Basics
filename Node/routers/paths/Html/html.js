var file = require("../../../file/file.js");
function GetHtml(parcel,backFunc){
	console.log("Get Html Ok");
	file.GetFile("html",parcel.GetPara("page")+".html",1,function (err,date){
		if(err){
			backFunc({
				"status" : 404,
				"content": "页面未找到!",
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
			 "url":"html",//Html
			 "func" : null,
			 "maze":[
				{
					"url":"page#[a-z]+",
					"func":GetHtml,
					"maze":[],
				}
			 ]
		}
	}
}