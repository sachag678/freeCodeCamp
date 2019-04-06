function run(){
	var myMove;
	var opMove;

	myMove = document.getElementById('pText').innerHTML.charAt(0);

	moves = ["ROCK", "PAPER", "SCISSORS"];

	var opMoveIdx = Math.floor((Math.random() * 3) + 0);
	opMove = moves[opMoveIdx]

	document.getElementById('oText').innerHTML = opMove;

	opMove = opMove.charAt(0);

	var reward = 0;

	if(myMove != opMove){
		if(myMove == "R" && opMove == "P" ){
			reward = 10;
			document.getElementById('result').innerHTML = "Player Loses";
		}
		if(myMove == "R" && opMove == "S" ){
			reward = -10;
			document.getElementById('result').innerHTML = "Player Wins";
		}
		if(myMove == "P" && opMove == "S" ){
			reward = 10;
			document.getElementById('result').innerHTML = "Player Loses";
		}
		if(myMove == "P" && opMove == "R" ){
			reward = -10;
			document.getElementById('result').innerHTML = "Player Wins";
		}
		if(myMove == "S" && opMove == "R" ){
			reward = 10;
			document.getElementById('result').innerHTML = "Player Loses";
		}
		if(myMove == "S" && opMove == "P" ){
			reward = -10;
			document.getElementById('result').innerHTML = "Player Wins";
		}

	}else{
		document.getElementById('result').innerHTML = "Player Ties";
	}
}
