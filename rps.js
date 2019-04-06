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
		if(myMove == "R" && opMove == "P" ||  myMove == "P" && opMove == "S"|| myMove == "S" && opMove == "R"  ){
			reward = 10;
			document.getElementById('result').innerHTML = "Player Loses";
		}
		if(myMove == "R" && opMove == "S"|| myMove == "P" && opMove == "R" || myMove == "S" && opMove == "P"  ){
			reward = -10;
			document.getElementById('result').innerHTML = "Player Wins";
		}

	}else{
		document.getElementById('result').innerHTML = "Player Ties";
	}
}
