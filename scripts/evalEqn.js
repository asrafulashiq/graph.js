
/**
 * point object constructor
 */
function Point(x,y){
	this.x=x;
	this.y=y;
}

/*
 * 
 */
function evalValue(eq,x){
	try{
		eq = eq.replace('x',x);
		while(eq.indexOf('x')!=-1){
			eq=eq.replace('x',x);
		}
		var value = eval(eq);
		return value ;
	}
	catch(ex){
		return NaN ;
	}
}

/*
 * return list of  points (x,y) for input point list variable xs
 */
function getPoints(str,xs){
	var points = [];
	str = evalEqn(str);
	for(var i =0;i<xs.length;i++){
		var v = evalValue(str,xs[i]);
		if(!isNaN(v)){
			points.push(new Point(xs[i],v));
		}
	}
	return points;
}


/*
 * make the equation evaluated
 */

function evalEqn(y){
	
	var s=["sin","cos","tan","log"];
	for (var i in s){
		
		if (y.search(s[i])!=-1){
			var index=y.search(s[i]);
			y=y.slice(0,index)+"Math."+y.slice(index);
		
		}
	
	}
	
	// give product sign
	
	y=y.split("");
	var index=y.indexOf("x");
	while (index !=-1){
		
		if (index!=0 && !isNaN(y[index-1])){
			y=y.slice(0,index).concat("*").concat(y.slice(index));
		}
		
		index=y.indexOf("x",index+2);
	}
	y=y.join("");	
	return y;
}



