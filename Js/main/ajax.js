//ajax - 
//1　顺序执行
//2　格式封装
var _Ajax = {
	$xmlhttp : null ,
	$AjaxList : [],
	$run : false,
	$runTime : 0,
	get xmlhttp (){return this.xmlhttp;},
	set xmlhttp (xmlHttpRequest){
		 if ( this.xmlhttp === null ) {
			this.xmlhttp = xmlHttpRequest
			$this = this
			this.xmlhttp.onreadystatechange = function(){
				$this.$AjaxList[$this.$runTime].Log.Append({"status":this.readyState,"time":""});
				switch( this.readyState ){
				case 4 :
					console.log(this.status);
					switch( this.status ){
					case 200:
						console.log(this.responseText);
					default:
					}
				default:
					console.log(this.status);
				}
			}
		}
		return true;
	},
	appEnd : function (url , Type , input ){
		this.xmlhttp.open(Type,url,true);
		this.xmlhttp.send();
	},
	$run : function (){
		if (this.run) return;
		this.xmlhttp.open(this.$AjaxList[this.$runTime].Type,this.$AjaxList[this.$runTime].Url,true);
		this.xmlhttp.send();
	}
}
if (window.XMLHttpRequest){
	_Ajax.xmlhttp = new XMLHttpRequest();
}else{
	_Ajax.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}