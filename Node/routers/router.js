// 路由　驱动 
//路由转发　以及　自动回复头  　１　解释url能力　２　寻找监听能力
//对请求对象的重新封装
var querystring = require('querystring');
var url = require('url');
var util = require('util');

// 树状路由结构
var tree = {} ;
// Into 收集路由表　并对路由进行分组
function Into(){
}
//解释url
function urlExplain(url){
	return url.split("/");
}
//返回信息包装 返回状态  值  响应对象 以及响应类型
function packaging(status,Base,res,ContetnType){
	ContetnType = ContetnType || "text/html" ;
	res.writeHead(status,{"Content-Type":ContetnType+";charset=utf-8"});
	switch (typeof Base){
		case "undefined":
		Base = "";break;
		case "function":
		Base = Base() || "";break;
		case "object" : 
		Base = JSON.stringify(Base); break;
	}
	console.log(status,Base,ContetnType);
	res.end(Base);
}
//寻找路由 
function seek(destination,_Para){
	var intoTree = tree;
	for ( var key in destination ){
		if ( key === "" ) continue;//不计较多余路由 {不存在的路由} //url//get//info 此列 
		if ( !intoTree["maze"] ) break;
		if ( intoTree["maze"][key] ){
			intoTree = intoTree["maze"][key];
		}else{
			//正则路由格式　： /id#正则内容/
			for ( var mazeKey in intoTree["maze"]){
				var keyIndex = mazeKey.indexOf("#")
				if ( keyIndex != -1 && (new RegExp(mazeKey.substring(keyIndex,mazeKey.length))).test(key) ){
					intoTree = intoTree["maze"][mazeKey];
					_Para[mazeKey.substring(0,keyIndex)] = _Para[mazeKey.substring(keyIndex,mazeKey.length)]
					break;
				}
			}
		}
	}
	return intoTree["func"];
}
function GETPara(req,parse,backFunc){
	backFunc(parse.query);
}
function POSTPara(req,parse,backFunc){
	var post = "";
	req.on("data",function(chunk){
		post += chunk;
	})
	req.on("end",function (){
		post = querystring.parse(post);
		backFunc(post);
	})
}
//重新封装的请求及响应对象 
//请求对象中有用的内容提取  请求类型 1  请求参数1   请求来源 请求头 请求将要使用那个驱动1
class parcel {
	constructor(req){
		this._parse = url.parse(req.url, true);
		this._method = req.method;
		this._Para = {};
		const _this = this;
		var PARAFUNCTION = null ;
		switch (this._method) {
			case "GET":
			PARAFUNCTION = GETPara;break;
			case "POST":
			PARAFUNCTION = POSTPara;break;

		}
		PARAFUNCTION(req,this._parse,function(JsonBase){
			for ( var key in JsonBase ){
				_this._Para[key] = JsonBase[key];
				_this.Ready = true;
			}
		});
		this._IntoFunc = seek(urlExplain(this._parse.pathname),this._Para)
		console.log(this._Para);
	};
	GetPara(key,defaults){
		return this._Para[key] || defaults ;
	};
	Into(res){
		if (typeof this._IntoFunc == "function") {
			this._IntoFunc(this,function(base){
				packaging(base["status"],base["content"],res,base["conType"]);
			})
		}else{
			packaging(404,"页面不存在",res);
		}
	}
};
module.exports = {
	//入口方法 
	manage : function (req,res){
		let Parcel = new parcel(req);//处理请求 
		Parcel.Into(res);//处理响应 
	},
}