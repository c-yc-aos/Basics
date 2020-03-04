// 路由　驱动 
//路由转发　以及　自动回复头  　１　解释url能力　２　寻找监听能力
//对请求对象的重新封装
var querystring = require('querystring');
var url = require('url');
var util = require('util');
var zlib = require('zlib');

var PathMain = require("./paths/pathMain.js");

// 树状路由结构
var tree = {
	url:"/",//根目录
	func:null,
	maze:{},
} ;
// Into 收集路由表　并对路由进行分组
function ComboTree(_Path,_Tree){
	for ( var i = 0 ; i < _Path['maze'].length ; i ++ ){
		_Tree[_Path['maze'][i]["url"]] = {
			"func" : _Path['maze'][i]["func"],
			"maze" : {}
		}
		if ( _Path['maze'][i]["maze"] ){
			ComboTree(_Path['maze'][i],_Tree[_Path['maze'][i]["url"]]["maze"])
		}
	}
}
//解释url
function urlExplain(url){
	return url.split("/");
}
//返回信息包装 返回状态  值  响应对象 以及响应类型
function packaging(Base,res,parcelos){
	Base["conType"] = Base["conType"] || "text/html" ;
	let writeHead = {};
	writeHead["Content-Type"] = Base["conType"];
	switch (typeof Base["content"]){
		case "undefined":
		Base["content"] = "";break;
		case "function":
		Base["content"] = Base["content"]() || "";break;
		case "object" : 
		switch (Object.prototype.toString.call(Base["content"])){
			case "[object Uint8Array]"://二进制文件流
				Base["head"]["accept-ranges"] = "bytes";//强制二进制输出二进制文件
			case "[object String]":
			case "[object Number]":
				break;
			case "[object Array]":
			case "[object Object]":
				Base["content"] = JSON.stringify(Base["content"]); break;
		}
	}
    if(Base["head"]){
    	for (var key in Base["head"]){
    		writeHead[key] = Base["head"][key];
    	}
    }
    let acceptEncoding = parcelos._headers['accept-encoding'];
    if(acceptEncoding.indexOf('gzip')!=-1 && writeHead["content-encoding"] == 'gzip'){
    	Base["content"] = zlib.gzipSync(Base["content"]);
    }else if(acceptEncoding.indexOf('deflate')!=-1 && writeHead["content-encoding"] == 'deflate'){
    	Base["content"] = zlib.deflateSync(Base["content"]);
    }
	res.writeHead(Base["status"],writeHead);
	switch (writeHead["accept-ranges"]){
		case "bytes":
			res.write(Base["content"],'binary');
			break;
		default:
			res.write(Base["content"]);
			break;
	}
	res.end();
}
//寻找路由 
function seek(destination,_Para){
	var intoTree = tree;
	for ( var index in destination ){
		if ( destination[index] === "" ) continue;//不计较多余路由 {不存在的路由} //url//get//info 此列 
		if ( !intoTree["maze"] ) break;

		if ( intoTree["maze"][destination[index]] ){
			intoTree = intoTree["maze"][destination[index]];
		}else{
			//正则路由格式　： /id#正则内容/
			for ( var mazeKey in intoTree["maze"]){
				var keyIndex = mazeKey.indexOf("#");
				if ( keyIndex != -1 && (new RegExp(mazeKey.substring(keyIndex+1,mazeKey.length))).test(destination[index]) ){
					intoTree = intoTree["maze"][mazeKey];
					_Para["url"][mazeKey.substring(0,keyIndex)] = destination[index];
					break;
				}
			}
		}
	}
	return intoTree["func"];
}
function GETPara(parse){
	var getPara = {};
	for ( var key in parse.query ){
		getPara[key] = parse.query[key] || "";
	}
	return getPara;
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
class parcel {
	constructor(req,res){
		this._parse = url.parse(req.url, true);
		this._headers = req.headers;
		this._method = req.method;
		this.Ready = false;
		this._Para = {
			"get" : {},
			"post": {},
			"url" : {},
		};
		let _this = this;
		this._Para["get"] = GETPara(this._parse);
		POSTPara(req,this._parse,function(JsonBase){
			for ( var key in JsonBase ){
				_this._Para["post"][key] = JsonBase[key];
			}
			_this.Ready = true;
		});
		this._IntoFunc = seek(urlExplain(this._parse.pathname),this._Para);
	};
	Get(key,defaults){
		return this._Para["get"][key] == undefined ? defaults : this._Para["get"][key];
	};
	Post(key,defaults){
		return this._Para["post"][key] == undefined ? defaults : this._Para["post"][key];
	};
	Url(key,defaults){
		return this._Para["url"][key] == undefined ? defaults : this._Para["url"][key];
	}
	Into(res){
		let _this = this;
		if (typeof this._IntoFunc == "function") {
			this._IntoFunc(this,function(base){
				packaging(base,res,_this);
			})
		}else{
			packaging({
				"status":404,
				"content":"Not Found",
			},res,_this);
		}
	}
};
module.exports = {
	//入口方法 
	manage : function (req,res){
		let Parcel = new parcel(req);//处理请求 
		Parcel.Into(res);//处理响应 
	},
	//初始化方法
	Into : function() {
		var pathList = PathMain.getpath();
		ComboTree(pathList,tree["maze"]);
	}
}