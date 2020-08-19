var indexOf = function(arr,val) { 
	for (var i = 0; i < arr.length; i++) { 
		if (arr[i] == val) return i; 
	} 
	return -1; 
};
var remove = function(arr,val) { 
	var index = indexOf(arr,val); 
	if (index > -1) { 
		arr.splice(index, 1); 
	} 
};
var blockList = ["convex","strip","l","field","z"];
var GameMain = function(){
	this.getrandom = function (){//随缘拿组合体
		var type = blockList[Math.floor(Math.random()*(blockList.length)+0)];
		return {
			"type":type,
			"base":block[type][0]
		};
	}
	this.getShape = function(type,i){
		i = parseInt(i)||0;
		var base =  [].concat(block[type]);
		var old = base[i];
		var toinit = 0;
		switch(i){
			case block[type].length - 1:
				break;
			default:
				toinit =  i+1 ;
		}

		var target = base[toinit];
		var baset = [];
		for(var j in old){
			baset.push({
				"x":(old[j]["x"] - target[j]["x"]),
				"y":(old[j]["y"] - target[j]["y"])
			});
		}
		return {
			"base" : baset,
			"toinit" : toinit
		};
	}
	this.RandomColor = function(){//随缘拿颜色
		return Math.floor(Math.random()*(255)+0);
	}
	this.over = function(){
		clearInterval(this.runTime);
		this.runTime = false;
		return this.showTime.innerHTML = "游戏结束:"+this.showTime.innerHTML;
	}
	this.appPool = function(index){
		this.pool[index].innerHTML = "";
		var newhtml = this.getrandom();
		var colors = "rgb("+this.RandomColor()+","+this.RandomColor()+","+this.RandomColor()+")";
		var bs = [];
		for(var i in newhtml["base"]){
			var b = document.createElement("b");
			b.setAttribute("block_type",newhtml["type"]);
			b.setAttribute("init",0);
			b.style.background = colors;
			b.setAttribute("x",newhtml["base"][i]["x"]);
			b.setAttribute("y",newhtml["base"][i]["y"]);
			b.style.top = (b.getAttribute("x") * this.minSize) +"px";
			b.style.left = (b.getAttribute("y") * this.minSize) +"px";
			this.pool[index].appendChild(b);
		}
	}
	this.exchangePool = function(){
		var t = this.pool[0].innerHTML;
		this.pool[0].innerHTML = this.pool[1].innerHTML;
		this.pool[1].innerHTML = t;
	}
	this.getPool = function(){
		var html = [];
		for(var i = 0 ; i < this.pool[0].children.length ; i ++){
			html.push(this.pool[0].children[i].cloneNode(true));
		}
		this.pool[0].innerHTML = this.pool[1].innerHTML;
		this.appPool(1);
		return html;
	}
	this.append = function(){
		var newhtml = this.getPool();
		var bs = [];
		for(var i = 0 ; i < newhtml.length ; i++){
			bs.push({
				"x": (parseInt(newhtml[i].getAttribute("x")) + this.vertex["x"]) ,
				"y": (parseInt(newhtml[i].getAttribute("y")) + this.vertex["y"])
			});
		}
		bs = this.iscan(bs);
		if(bs == false){
			return this.over();
		}
		for(var i = 0 ; i < newhtml.length ; i++){
			newhtml[i].setAttribute("x",bs[i]["x"] );
			newhtml[i].setAttribute("y",bs[i]["y"] );
			this.run.push(newhtml[i]);
			this.Box.appendChild(newhtml[i]);
		}
	}
	this.iscan = function(arr){
		for(var i = 0 ; i < arr.length ; i++){
			if( arr[i]["x"] < 0 ||
				arr[i]["y"] < 0 ||
				arr[i]["x"] > this.max["x"] ||
				arr[i]["y"] > this.max["y"]
				){
				return false;
			}
			for(var j = 0 ; j < this.html.length ; j ++){
				if(arr[i]["x"] == parseInt(this.html[j].getAttribute("x")) &&
					arr[i]["y"] == parseInt(this.html[j].getAttribute("y"))
				){
					return false;
				}
			}
		}
		return arr;
	}
	this.display = function(){
		if(this.isAll)return this.displayAll();
		for(var i in this.run){
			this.run[i].style.top  = (this.minSize * this.run[i].getAttribute("x")) +"px";
			this.run[i].style.left = (this.minSize * this.run[i].getAttribute("y")) +"px";
		}
	}
	this.displayAll = function(){
		for (var i = this.html.length - 1; i >= 0; i--) {
			this.html[i].style.top  = (this.minSize * this.html[i].getAttribute("x")) +"px";
			this.html[i].style.left = (this.minSize * this.html[i].getAttribute("y")) +"px";
		}
		for(var i in this.run){
			this.run[i].style.top  = (this.minSize * this.run[i].getAttribute("x")) +"px";
			this.run[i].style.left = (this.minSize * this.run[i].getAttribute("y")) +"px";
		}
		this.isAll = false;
	}
	this.gettype = function(){
		return this.run[0].getAttribute("block_type");
	}
	this.getNumber = function(){
		return this.run[0].getAttribute("init");
	}
	this.changeRun = function(){
		var base = this.getShape(this.gettype(),this.getNumber());
		var bs = [];
		for(var i in this.run){
			bs.push({
				"x":(parseInt(this.run[i].getAttribute("x"))-base["base"][i]["x"]) ,
				"y":(parseInt(this.run[i].getAttribute("y"))-base["base"][i]["y"])
			});
		}
		bs = this.iscan(bs);
		if(bs == false) return false;
		for(var i in this.run){
			this.run[i].setAttribute("x",bs[i]["x"]);
			this.run[i].setAttribute("y",bs[i]["y"]);
			this.run[i].setAttribute("init",base["toinit"]);
		}
	}
	this.dowrun = function(){
		var bs = [];
		for(var i in this.run){
			bs.push({
				"x":(1 + parseInt( this.run[i].getAttribute("x") ) ),
				"y":parseInt( this.run[i].getAttribute("y")) 
			});
		}
		bs = this.iscan(bs);
		if(bs == false){
			for(var i in this.run){
				this.html.push(this.run[i]);
			}
			this.run = [];
					this.append();
					this.isAll = true;
       			this.blast();
			return false;
		} 
		for(var i in this.run){
			this.run[i].setAttribute("x",bs[i]["x"]);
			this.run[i].setAttribute("y",bs[i]["y"]);
		}
	}
	this.leftrun =  function(){
		var bs = [];
		for(var i in this.run){
			bs.push({
				"x": parseInt( this.run[i].getAttribute("x") ) ,
				"y":(parseInt(this.run[i].getAttribute("y")) - 1)
			});
		}
		bs = this.iscan(bs);
		if(bs == false) return false;
		for(var i in this.run){
			this.run[i].setAttribute("x",bs[i]["x"]);
			this.run[i].setAttribute("y",bs[i]["y"]);
		}
	}
	this.rightrun =  function(){
		var bs = [];
		for(var i in this.run){
			bs.push({
				"x": parseInt( this.run[i].getAttribute("x") ) ,
				"y":(parseInt(this.run[i].getAttribute("y")) + 1)
			});
		}
		bs = this.iscan(bs);
		if(bs == false) return false;
		for(var i in this.run){
			this.run[i].setAttribute("x",bs[i]["x"]);
			this.run[i].setAttribute("y",bs[i]["y"]);
		}
	}
	this.onStart = function(){
		if(this.runTime != false) return console.log("游戏已经开始!");
		this.html = [];
		this.Box.innerHTML = "";
		this.appPool(0);
		this.appPool(1);
		var _this = this;
		this.dowTime = this.stratTime = (new Date()).getTime();
		this.runTime = setInterval(function (){
			var nowTime = (new Date()).getTime();
			var times = ( nowTime - _this.dowTime ) ;
			_this.showTime.innerHTML = (nowTime - _this.stratTime) / 1000;
			if( times > 500){
				_this.dowTime = nowTime ; 
				_this.dowrun();
			}
			_this[_this.runfunction]();
			_this.display();
			_this.runfunction = "nofun";
		},50);
	}
	this.nofun = function(){
	}
	this.SettingBox = function(BoxId,timeId,scoreID,pool1,pool2){
		this.Box;
		this.html = [];
		this.run = [];
		this.pool = [
			document.getElementById(pool1),
			document.getElementById(pool2),
		];
		this.vertex = {"x":0,"y":4};
		this.minSize = 30;
		this.max = {"x":0,"y":0};
		this.Box = document.getElementById(BoxId);
		this.max["x"] = (this.Box.offsetHeight / this.minSize)-1;
		this.max["y"] = (this.Box.offsetWidth / this.minSize)-1;
		this.runTime = false;
		this.stratTime = 0;
		this.dowTime = 0;
		this.runfunction = "nofun";
		this.isAll = false;
		this.showTime = document.getElementById(timeId);
		this.showScore = document.getElementById(scoreID);
		this.showScore.innerHTML = 0;
	}
	this.blast = function(){
		var floor = {};
		for(var i in this.html){
			if(!floor[this.html[i].getAttribute("x")]) floor[this.html[i].getAttribute("x")] = [];
			floor[this.html[i].getAttribute("x")].push(this.html[i]);
		}
		var fall = 0;//默认下坠
		var runhtml = false;
		for( var i = this.max["x"] ; i >= 0 ; i -- ){
			if(!floor[i]){
				break;
			}
			if( floor[i].length > this.max["y"]){
				for(var j = 0 ; j < floor[i].length ; j ++){
					remove(this.html,floor[i][j]);
					this.Box.removeChild(floor[i][j]);
				}
				fall ++ ;
				runhtml = true;
			}else{
				if(fall != 0){
					for(var j = 0 ; j < floor[i].length ; j ++){
						floor[i][j].setAttribute("x",( parseInt(floor[i][j].getAttribute("x")) + fall) );
					}
				}
			}
		}
		if(fall != 0){
			this.showScore.innerHTML = (parseInt(this.showScore.innerHTML) + fall);
		}	
		if(runhtml)this.displayAll();
	}
}
function startGame1p(obj){
	game1p.onStart();
}function startGame2p(obj){
	game2p.onStart();
}
function into(){
	window['game1p'] = new GameMain();
	window['game2p'] = new GameMain();
	game1p.SettingBox("game1p","time1p","score1p","pool11","pool12");
	game2p.SettingBox("game2p","time2p","score2p","pool21","pool22");
	document.onkeydown=function(event){
		var names = false;
		var obj = "game1p";
	   var e = event || window.event || arguments.callee.caller.arguments[0];
	   if(!e) return alert("Not Event");
	   switch(e.keyCode){
	   		case 38:
	   			obj = "game2p";
	   		case 87:
	   			//变形 
	   			names = "changeRun";
	   			break;
			case 37:
   				obj = "game2p";
			case 65:
				//向左
   				names = "leftrun";
				break;
			case 39:
   				obj = "game2p";
			case 68:
				//向右
   				names = "rightrun";
				break;
			case 40:
   				obj = "game2p";
			case 83:
				//向下
   				names = "dowrun";
				break;
			case 96:	
	   			obj = "game2p";
			case 32://空格 和0  交换侯选池
				return window[obj].exchangePool();	
	   }
	   if(names != false){
	 		window[obj].runfunction = names;
	   }
	}; 	
}
(function(){
	into();
})();