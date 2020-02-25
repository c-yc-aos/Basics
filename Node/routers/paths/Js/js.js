var file = require("../../../file/file.js");
function GetJs(parcel,backFunc){
	file.GetFile("js",parcel.GetPara("path")+".js",1,function (err,date){
		if(err){
			backFunc({
				"status" : 404,
				"content": "Js File undefined",
				"conType": "text/js",
			});
		}else{
			backFunc({
				"status" : 200,
				"content": date,
				"conType": "text/js",
			});
		}
	});
}
function GetMainJs(parcel,backFunc){
	file.GetFile("js","main/"+parcel.GetPara("path")+".js",1,function (err,date){
		if(err){
			backFunc({
				"status" : 404,
				"content": "Main Js File undefined",
				"conType": "text/js",
			});
		}else{
			backFunc({
				"status" : 200,
				"content": date,
				"conType": "text/js",
			});
		}
	});	
}
module.exports = {
	getpath : function(){
		return {
			 "url":"js",//Html
			 "func" : null,
			 "maze":[
				{
					"url":"path#[a-z]+",
					"func":GetJs,
					"maze":[],
				},{
					"url":"main",
					"func":null,
					"maze":[
						{
							"url":"path#[a-z]+",
							"func":GetMainJs,
							"maze":[],
						}
					]
				}
			 ]
		}
	}
}