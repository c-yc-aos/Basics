var file = require("../../../file/file.js");
function GetJs(parcel,backFunc){
	file.GetFile("js",parcel.Url("path")+".js",1,function (err,date){
		if(err){
			backFunc({
				"status" : 404,
				"content": "Js File undefined",
				"conType": "text/js"+";charset=utf-8",
			});
		}else{
			backFunc({
				"status" : 200,
				"content": date,
				"conType": "text/js"+";charset=utf-8",
			});
		}
	});
}
function GetMainJs(parcel,backFunc){
	file.GetFile("js","main/"+parcel.Url("path")+".js",1,function (err,date){
		if(err){
			backFunc({
				"status" : 404,
				"content": "Main Js File undefined",
				"conType": "text/js"+";charset=utf-8",
			});
		}else{
			backFunc({
				"status" : 200,
				"content": date.toString(),
				"conType": "text/js"+";charset=utf-8",
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