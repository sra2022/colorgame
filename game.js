let unique_square;
let global_score=0;
let end_time;
let audio1=new Audio("assets/correct.mp3");
let audio2=new Audio("assets/wrong.mp3");

function setup()
{
	const controls=document.getElementById("controls");
	const start_button=document.createElement("button");
	start_button.innerHTML="Start";
	start_button.setAttribute("class","button");
	start_button.setAttribute("id","button1");
	start_button.setAttribute("onclick","start_game()");
	controls.appendChild(start_button);
}

function start_game()
{
	let unique=Math.floor(Math.random()*36)+1;
	unique_square=unique;
	draw_squares(unique);
	draw_score();
	change_button();
	end_time=Date.now()+3000;
}

function time_over()
{
	audio2.play();
	show_message("Time Over");
}

function draw_squares(unique)
{
	let r=Math.floor(Math.random()*225)+50;
	let g=Math.floor(Math.random()*225)+50;
	let b=Math.floor(Math.random()*225)+50;
	let random=Math.floor(Math.random()*2);
	let difference=10;
	if(global_score<5) difference=20;	
	else if(global_score<10) difference=15;
	else if(global_score<15) difference=14;
	else if(global_score<20) difference=13;
	else if(global_score<25) difference=12;
	else if(global_score<30) difference=11;
	const game_box=document.getElementById("game-box");
	game_box.style.display="flex";
	for(let i=1;i<=36;i++)
	{
		const square=document.createElement("div");
		square.setAttribute("class","square");
		square.style.backgroundColor="rgb("+r+","+g+","+b+")";
		if(unique==i && random==0)
			square.style.backgroundColor="rgb("+(r-difference)+","+(g-difference)+","+(b-difference)+")";
		if(unique==i && random==1)
			square.style.backgroundColor="rgb("+(r+difference)+","+(g+difference)+","+(b+difference)+")";
		square.setAttribute("onclick","check_answer("+i+")");
		game_box.appendChild(square);
	}
}

function draw_score()
{
	const controls=document.getElementById("controls");
	if(controls.childNodes.length==2)
	{
	const score=document.createElement("div");
	score.setAttribute("id","score");
	score.innerHTML="0";
	controls.insertBefore(score,controls.childNodes[0]);
	}
}

function change_button()
{
	const button1=document.getElementById("button1");
	button1.innerHTML="Quit";
	button1.setAttribute("onclick","quit_game()");
}

function quit_game()
{
	clean_game();
	const button1=document.getElementById("button1");
	button1.innerHTML="Start";
	button1.setAttribute("onclick","restart_game()");
	document.getElementById("game-box").style.display="none";
}

function clean_game()
{
	const game_box=document.getElementById("game-box");
	while(game_box.hasChildNodes())
		game_box.removeChild(game_box.firstChild);
}

function check_answer(answer)
{
	if(answer==unique_square)
	{
		audio1.play();
		let old_score=document.getElementById("score").innerHTML;
		let new_score=parseInt(old_score)+1;
		global_score=new_score;
		document.getElementById("score").innerHTML=new_score;
		if(end_time<Date.now())
			time_over();
		else
		{
			clean_game();
			start_game();
		}
	}
	else
	{
		audio2.play();
		show_message("Wrong");
	}
}

function show_message(text)
{
	let message=document.createElement("div");
	message.innerHTML=text;
	message.setAttribute("id","message");
	document.getElementById("main").appendChild(message);
	let my_button=document.createElement("button");
	my_button.setAttribute("class","button");
	my_button.innerHTML="Close";
	my_button.setAttribute("onclick","hide_message_and_quit()");
	message.appendChild(my_button);
}

function hide_message_and_quit()
{
	document.getElementById("message").remove();
	quit_game();
}

function restart_game()
{
	document.getElementById("score").innerHTML="0";
	global_score=0;
	start_game();
}
