let unique_square;
let end_time;

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
	quit_game();
	alert("Time Over");
}

function draw_squares(unique)
{
	let r=Math.floor(Math.random()*225)+50;
	let g=Math.floor(Math.random()*225)+50;
	let b=Math.floor(Math.random()*225)+50;
	const game_box=document.getElementById("game-box");
	game_box.style.display="flex";
	for(let i=1;i<=36;i++)
	{
		const square=document.createElement("div");
		square.setAttribute("class","square");
		square.style.backgroundColor="rgb("+r+","+g+","+b+")";
		if(unique==i)
			square.style.backgroundColor="rgb("+(r-10)+","+(g-10)+","+(b-10)+")";
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
	button1.innerHTML="Restart";
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
		let old_score=document.getElementById("score").innerHTML;
		let new_score=parseInt(old_score)+1;
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
		alert("wrong");
		quit_game();
	}
}

function restart_game()
{
	document.getElementById("score").innerHTML="0";
	start_game();
}
