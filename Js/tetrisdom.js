window.onload = function(){
	document.onclick = function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		var obj = e['target'];
		try{
            window[obj.getAttribute('data-fun')](obj);
        }catch (e){
        }
	}
	if(typeof window['into'] == 'function'){
		window['into']();
	}
}