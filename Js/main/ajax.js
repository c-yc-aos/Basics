//ajax - 
//1　顺序执行
//2　格式封装
var _Ajax = {
	$xmlhttp : null ,
	get xmlhttp (){return null;},
	set xmlhttp (xmlHttpRequest){
		 if ( this.$xmlhttp === null ) {
			this.$xmlhttp = xmlHttpRequest	
			this.$xmlhttp.onreadystatechange = function(){
				switch( this.readyState ){
				case 4 :
					console.log(this.status);
					switch( this.status ){
					case 200:
						console.log(this.responseText);
					}
				default:
					console.log(this.status);
				}
			}
		}
		return true;
	},
	appEnd : function (url , Type , input ){
		this.$xmlhttp.open(Type,url,true);
		this.$xmlhttp.send();
	}
}
if (window.XMLHttpRequest){
	_Ajax.xmlhttp = new XMLHttpRequest();
}else{
	_Ajax.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}