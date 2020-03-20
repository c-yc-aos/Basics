var file = require("../../../file/file.js");
function PackEntire(htmlBodyText,backFunc,DateBase){
	file.GetFile("html","public/head.html",1,function(HeadErr,headHtmlText){
		file.GetFile("html","public/end.html",1,function(EndErr,endHtmlText){
			backFunc({
				"status" : 200,
				"content": filled(headHtmlText.toString()+htmlBodyText+endHtmlText.toString(),DateBase),
				"conType": "text/html",
				"head"   : {
					"content-encoding" : 'gzip'
				}
			});
		});
	});
}
function GetHtml(parcel,backFunc){
	file.GetFile("html",parcel.Url("page")+".html",1,function (err,date){
		if(err){
			backFunc({
				"status" : 404,
				"content": "Html File undefined",
				"conType": "text/html"+";charset=utf-8",
			});
		}else{
			let incidentalBase = {
				"PageTitle"  : "应用程序名称"　||　parcel.Url("page")　,
				"author"     : "测试内容", 
				"keywords"   : "测试内容",
				"description": "测试内容",
				"icon_href"  : "/i/icon.jpg",
				"userhead"   : "/image/head.jpg",
				"username"   : "雨化作云",
			};
			if(parcel.Get("module") != undefined){
				backFunc({
					"status" : 200,
					"content": filled(date.toString(),{},incidentalBase),
					"conType": "text/html"+";charset=utf-8",
					"head"   : {
						"content-encoding" : 'gzip'
					}
				});	
			}else{
				PackEntire(date.toString(),backFunc,incidentalBase);
			}
		}
	});
}
function filled(TextValue,DateBase){
	for (var key in DateBase){
		var rep = new RegExp( "{{ "+key+" }}", "g");
		TextValue = TextValue.replace(rep,DateBase[key]);
	}
	return TextValue;
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