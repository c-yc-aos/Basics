var file = require("../../../file/file.js");
function GetI(parcel,backFunc){
	console.log("Get i Ok");
	file.GetFile("i",parcel.GetPara("iName"),1,function (err,date){//如何无视扩展名读文件未完成.
		if(err){
			backFunc({
				"status" : 404,
				"content": "Css File undefined",
				"conType": "image/png",
			});
		}else{
			backFunc({
				"status" : 200,
				"content": date,
				"conType": "image/png",
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
					"url":"iName#[a-z]+",
					"func":GetI,
					"maze":[],
				}
			 ]
		}
	}
}