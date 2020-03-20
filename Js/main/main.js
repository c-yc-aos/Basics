//main 
//全局加载核心
// alert("main.js ready Ok");
window.onload = function (e){
	ReadStyleScript();
}
document.onclick = function(e){
	var obj = e['target'];
	try{
		window[obj.getAttribute("aos-click")](obj);
	}catch(e){
		
	}
	return false;
}