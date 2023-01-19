let uniqueSquare;
let globalScore=0;
let endTime;
let audio1=new Audio("assets/correct.mp3");
let audio2=new Audio("assets/wrong.mp3");

window.onload=()=> {
	const controls=document.getElementById("controls");
	const message=document.createElement("div");
	message.id="message";
	message.innerHTML="Ready to Play";
	controls.appendChild(message);
	const startButton=document.createElement("button");
	startButton.innerHTML="Start";
	startButton.setAttribute("class","button");
	startButton.id="button1";
	startButton.setAttribute("onclick","startGame()");
	controls.appendChild(startButton);
}

function startGame() {
	cleanGame();
	hideMessage();
	let unique=Math.floor(Math.random()*36)+1;
	uniqueSquare=unique;
	drawSquares(unique);
	drawScore();
	changeButton();
	endTime=Date.now()+3000;
}

function drawSquares(unique) {
	let r=Math.floor(Math.random()*176)+50;
	let g=Math.floor(Math.random()*176)+50;
	let b=Math.floor(Math.random()*176)+50;
	let random=Math.floor(Math.random()*2);
	let difference=5;
	if(globalScore<5) difference=20;	
	else if(globalScore<10) difference=15;
	else if(globalScore<15) difference=13;
	else if(globalScore<20) difference=11;
	else if(globalScore<25) difference=9;
	else if(globalScore<30) difference=7;
	const gameBox=document.getElementById("game-box");
	gameBox.style.display="flex";
	for(let i=1;i<=36;i++) {
		const square=document.createElement("div");
		square.setAttribute("class","square");
		square.style.backgroundColor="rgb("+r+","+g+","+b+")";
		if(unique==i && random==0)
			square.style.backgroundColor="rgb("+(r-difference)+","+(g-difference)+","+(b-difference)+")";
		if(unique==i && random==1)
			square.style.backgroundColor="rgb("+(r+difference)+","+(g+difference)+","+(b+difference)+")";
		square.setAttribute("onclick","checkAnswer("+i+")");
		gameBox.appendChild(square);
	}
}

function showMessage(text) {
	const message=document.getElementById("message");
	message.style.color="#d52a2e";
	message.style.display="block";
	message.innerHTML=text;
}

function drawScore() {
	const controls=document.getElementById("controls");
	if(controls.childNodes.length==3) {
	const score=document.createElement("div");
	score.id="score";
	score.innerHTML="0";
	controls.insertBefore(score,controls.childNodes[0]);
	}
}

function changeButton() {
	const button1=document.getElementById("button1");
	button1.innerHTML="Quit";
	button1.setAttribute("onclick","quitGame()");
}

function quitGame() {
	cleanGame();
	const button1=document.getElementById("button1");
	button1.innerHTML="Start";
	button1.setAttribute("onclick","restartGame()");
	document.getElementById("game-box").style.display="none";
}

function cleanGame() {
	const gameBox=document.getElementById("game-box");
	while(gameBox.hasChildNodes())
		gameBox.removeChild(gameBox.firstChild);
}

function checkAnswer(answer) {
	if(answer==uniqueSquare) {
		audio1.play();
		let oldScore=document.getElementById("score").innerHTML;
		let newScore=parseInt(oldScore)+1;
		globalScore=newScore;
		document.getElementById("score").innerHTML=newScore;
		if(endTime<Date.now()) {
			quitGame();
			audio2.play();
			showMessage("Time over");
		}
		else startGame();
	}
	else {
		quitGame();
		audio2.play();
		showMessage("Wrong");
	}
}

function hideMessage() {
	document.getElementById("message").style.display="none";
}

function restartGame() {
	document.getElementById("score").innerHTML="0";
	globalScore=0;
	startGame();
}
