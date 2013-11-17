/*
 * global variable
 */
var xscale = 20; // default 20 unit in x axis
var yscale = 25; // default 10 unit in y axis
var canvas, context;

/*
 * draw the axis with scaling
 */

window.onload = function(){
	
	document.getElementById("Xscale").onchange = startDraw;

	document.getElementById("Yscale").onchange = startDraw;
	
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	document.getElementById("submit").onclick = startDraw;
}

/*
 * start drawing
 */
function startDraw(){
	drawAxis();
	var eqn = document.getElementById("equation").value;
	drawEqn(eqn);	
}

/*
 * draw the x and y axis
 */
function drawAxis(){
	
	var xs=document.getElementById("Xscale");
	var ys=document.getElementById("Yscale");
	 xscale=xs[xs.selectedIndex].value;
	 yscale=ys[ys.selectedIndex].value;
	
	
	var width = canvas.width;
	var height = canvas.height;
	
	context.clearRect(0,0,width,height);
	
	var x_per_length = (width-10)/xscale;
	var y_per_length = (height-10)/yscale;
	
	// draw y axis
	context.strokeStyle="rgb(120,35,70)";
	context.beginPath();
	context.lineWidth = 3;
	context.moveTo(width/2,0);
	context.lineTo(width/2,height);
	context.closePath();
	context.stroke();
	
	//draw x axis
	context.beginPath();
	context.moveTo(0,height/2);
	context.lineTo(width,height/2);
	context.closePath();
	context.stroke();
	context.save();
	// draw label in x-axis
	context.translate(width/2,height/2);
	//context.drawArc(0,0,5,0,Math.PI*2,true);
	context.textBaseLine = "middle";
	for (var i = 1;i<xscale/2;i++){
		
		if( i * x_per_length > width/2)break;
		
		context.fillText("|",i * x_per_length,0);
		context.fillText(i,i* x_per_length,-10);
		
		context.fillText("|",(-1)*i* x_per_length,0);
		context.fillText((-1)*i,(-1)*i* x_per_length,-10);

	}
	
	// draw label in y-axis
	for(var i=1;i<yscale;i++){
		
		if( i * y_per_length > height/2)break;
		
		context.fillText("_",0,i * y_per_length);
		context.fillText(i,10,i* y_per_length);
		
		context.fillText("-",0,(-1)*i* y_per_length);
		context.fillText((-1)*i,10,(-1)*i* y_per_length);

	}
	
	context.restore();		
}

/*
 * draw the graph
 */

function drawEqn(eqn){

	var points,xPoints;

	 xPoints=[];
	
	// select x points 
	for(var i=(-1)*xscale/2;i<=xscale/2;i+=xscale/1000){
		xPoints.push(i);
	}
	
	// get the (x,y) points
	
	 points = getPoints(eqn,xPoints);
	
	var width = canvas.width;
	var height = canvas.height;
	
	var x_per_length = (width-10)/xscale;
	var y_per_length = (height-10)/yscale;
	
	context.save();
	
	context.translate(width/2,height/2);
	
	context.beginPath();
	var i=0;
	context.moveTo(points[i].x*x_per_length ,(-1)*points[i].y*y_per_length,points[i+1].x*x_per_length ,(-1)*points[i+1].y*y_per_length)
	for(var i=1;i<points.length-1;i++){
		context.quadraticCurveTo(points[i].x*x_per_length ,(-1)*points[i].y*y_per_length,points[i+1].x*x_per_length ,(-1)*points[i+1].y*y_per_length);
	}
	context.strokeStyle="rgb(20,0,230)";
	context.lineWidth=1;
	context.stroke();
	context.closePath();
	context.restore();		
}

/*
 * evaluate ddx
 */
function DDX(input){
	var x = input.value;
	if(!isNaN(x)){
		var eqn = document.getElementById("equation").value;
		eqn=evalEqn(eqn);
		var y = evalValue(eqn,x);	
		var x1=Number(x)+.0001;
		var y1= evalValue(eqn,x1);
		var d = (y-y1)/(x-x1);
		document.getElementById("valueOfddx").innerHTML=d.toFixed(2);
		
	}
}

/*
 * draw slope
 */
function drawSlope(){
		
		var x = document.getElementById("ddx").value;
		if(!isNaN(x)){
			var eqn = document.getElementById("equation").value;
			eqn=evalEqn(eqn);
			var y = evalValue(eqn,x);	
			var x1=Number(x)+.0001;
			var y1= evalValue(eqn,x1);
			
		
			
			
			var width = canvas.width;
			var height = canvas.height;
	
			var x_per_length = (width-10)/xscale;
			var y_per_length = (height-10)/yscale;
	
			context.save();
	
			context.translate(width/2,height/2);
	
			context.beginPath();
			
			var slope = (y-y1)/(x-x1);
			
			var tx1 = width/2;
			var tx2 = (-1)*width/2;
			
			var ty1 = slope * (tx1-x1) + y1;
			var ty2 = slope * (tx2-x1) + y1; 
			
			context.moveTo(tx1* x_per_length , (-1)*ty1 * y_per_length);
			context.lineTo(tx2 * x_per_length , (-1) * ty2 * y_per_length);
			
			context.strokeStyle="rgb(120,0,0)";
			context.lineWidth=1;
			context.stroke();
			context.closePath();
			context.restore();					 
			
			
			
		}
}

/*
 * y value
 */
function yvalue(t){
	var x = t.value;
	if(!isNaN(x)){
		var eqn = document.getElementById("equation").value;
		eqn=evalEqn(eqn);
		var y = evalValue(eqn,x);	
		document.getElementById("valueOfX").innerHTML = y.toFixed(2);
	}

}
















