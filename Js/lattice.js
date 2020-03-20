var canvas = null;
var fontCanvas = null;
(function (){
	canvas = document.getElementById("screen");
	canvas = canvas.getContext("2d");


	fontCanvas = document.getElementById("font");
	fontCanvas = fontCanvas.getContext("2d");
})();

function canvas_backgroup(x,y,gray){
	gray = gray > document.getElementById("gray").value ? gray : 0 ;
	canvas.fillStyle="rgb("+gray+",0,0)";
	canvas.fillRect(x*10,y*10,10,10);
}

function showByData(data){
	for ( var y = 0 ; y < data.height ; y ++){
		for ( var x = 0 ; x < data.width ; x ++){
			var startIndex = ( x * 4 ) + ( y * data.width * 4);
			var alpha  = data.data[startIndex+3];
			canvas_backgroup(x,y,alpha);
		}
	}
}


function SetFont(textValue){
	fontCanvas.clearRect(0,0,32,32);
	fontCanvas.font="28px Arial";
	fontCanvas.fillText(textValue,2,27);
	return fontCanvas.getImageData(0,0,32,32);
}

function showFont(){
	var inputValue = document.getElementById("in").value;
	var time = document.getElementById("time").value;
	runValue(inputValue,time);
}
function runValue(String,time){
	var index = 0 ;
	var showString = function (){
		if(!String[index]) return true;
		showByData(SetFont(String[index]));
		index ++ ;
		setTimeout(showString, time) ;
	}
	return showString();
}


