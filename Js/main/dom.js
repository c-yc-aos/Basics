//dom
//代理事件　　
//为路由跳转提供渲染
//主子关联 
var cssDom , jsDom;
function ReadStyleScript(){
	cssDom = document.getElementById("head_CssList");
	jsDom  = document.getElementById("head_JsList");
	LoadStyleScript();
}
function pushCss_JsOnlyOne(dom,href,type){
	type = type == "css"; 
	var oldDom = dom.getElementsByTagName(type ? "link" : "script");
	for(var i = 0 ; i < oldDom.length ; i ++){
		if( oldDom[i].getAttribute(type ? "href" : "src") == href )
			return
	}
	var  newDom = document.createElement(type ? "link" : "script");
	newDom.setAttribute(type ? "href" : "src",href);
	newDom.setAttribute(type ? "rel"  : "type", type ? "stylesheet" : "text/javascript");
	dom.appendChild(newDom);
}
function LoadStyleScript(){//加载css ｜ js　文件
	var cssList = document.getElementsByTagName("aoscss");
	for(var cssindex = 0 ; cssindex < cssList.length ; cssindex ++){
		pushCss_JsOnlyOne(cssDom,cssList[cssindex].getAttribute("href"),"css");
	}
	var jsList = document.getElementsByTagName("aosjs");
	for(var jsindex = 0 ; jsindex < jsList.length ; jsindex ++){
		pushCss_JsOnlyOne(jsDom,jsList[jsindex].getAttribute("src"),"js");
	}
}