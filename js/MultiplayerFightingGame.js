// JavaScript Document

//constant		
var context= document.getElementById('canvas').getContext('2d');
var wid=document.getElementById('canvas').width;
var hei=document.getElementById('canvas').height;
var cannon1 = new Image();		
cannon1.src = "image/cannon1.png";
var cannon2 = new Image();		
cannon2.src = "image/cannon2.png";
var healthbar=300;//the length of health bar
var timer;//controler
//variable
var velocity;
var angle;
var ball={
	X:50,
	Y:310,
	radius:10,
	Vx:0,
	Vy:0,
};
var player1={
	health:healthbar,
	smalls:5,
	mediums:3,
	bigs:1,	
};
var player2={
	health:healthbar,
	smalls:5,
	mediums:3,
	bigs:1,	
};
var turn=1;//decide who's turn. 1 is player1, -1 is player2.
function drawBall(){
	context.beginPath();
	context.arc(ball.X, ball.Y, ball.radius, 0, 2.0 * Math.PI, true);
	context.fillStyle = "red";
	context.fill();
}

function drawBackground() {
	//draw bottom platform
	context.beginPath();
	context.fillStyle="#4E1E1E";
	context.fillRect(0,hei-40,wid,40);
	context.closePath();
	//draw cannon
	context.drawImage(cannon1,0,hei-40-50);
	context.drawImage(cannon2,wid-50,hei-40-50);
}

function drawHealthBar(){
	context.fillText("Player 1",10,20);
	context.fillText("Player 2",10,50);
	context.fillStyle="black";
	context.fillRect(60,5,healthbar,20);
	context.fillRect(60,35,healthbar,20);
	context.fillStyle="green";
	
	//control real health bar.
	context.fillRect(60,5,player1.health,20);
	context.fillRect(60,35,player2.health,20);
}

function init() {
	if(turn==1){
		ball.X=50;
		ball.Y=310;
		
	}else{
		ball.X=wid-50;
		ball.Y=310;
		
	}
	draw();
}

function draw() {
	context.clearRect(0, 0, wid, hei);
	drawBackground();
	drawHealthBar();
	drawBall();
}

function start() {
	
	clearInterval(timer);
	init();
	velocity = Number(document.getElementById("velocity").value);
	angle = Number(document.getElementById("angle").value);
	var angleR = angle * Math.PI / 180;
	if(turn==1){//player1
		ball.Vx = velocity * Math.cos(angleR);
		if(ball.radius==10){
			player1.smalls--;
			if(player1.smalls<0){ alert("not small"); return ; }
		}
		else if(ball.radius==15){
			player1.mediums--;
			if(player1.mediums<0){alert("not medium"); return ;}
		}
		else{
			player1.bigs--;
			if(player1.bigs<0){alert("not big"); return ;}
		}
	}
	else{//player2 
		ball.Vx = -velocity * Math.cos(angleR);
		if(ball.radius==10){
			player2.smalls--;
			if(player2.smalls<0){ alert("not small"); return ; }
		}
		else if(ball.radius==15){
			player2.mediums--;
			if(player2.mediums<0){alert("not medium"); return ;}
		}
		else{
			player2.bigs--;
			if(player2.bigs<0){alert("not big"); return ;}
		}
	}
	ball.Vy = -velocity * Math.sin(angleR);

	draw();
	timer = setInterval(calculate, 50);
	turn*=-1;

	return false;
}

function calculate() {
	ball.Vy = ball.Vy + 1.98;
	ball.X = ball.X + ball.Vx;
	ball.Y = ball.Y + ball.Vy;
	
	//because the code sequence is turn*=-1 first, and then timer = setInterval(calculate, 50), so when exec this code, the variable turn have been changed to '-1'.
	if(turn==-1){
		if ((ball.X >= wid-50) && (ball.X <= wid) && (ball.Y >=hei-40-50) && (ball.Y <= hei-40)) {
			//hit
			player2.health-=ball.radius*10;
			if(player2.health<=0){
				player2.health=0;
				alert("Player 1 win!!!!");
			}
			draw(); 
			clearInterval(timer);
		}
	}
	else{
		if ((ball.X >= 0) && (ball.X <= 50) && (ball.Y >=hei-40-50) && (ball.Y <= hei-40)) {
			//hit
			player1.health-=ball.radius*10;
			if(player1.health<=0){
				player1.health=0;
				alert("Player 2 win!!!!");
			}
			draw(); 
			clearInterval(timer);
		}
	}
	if (ball.Y >= hei || ball.Y <= 0|| ball.X<= 0 || ball.X >= wid ) {
		clearInterval(timer);
	}
	draw();
}

function changeSize(){
	var myselect=document.getElementById("size");
	var index=myselect.selectedIndex;
	ball.radius=myselect.options[index].value;
	draw();
}
