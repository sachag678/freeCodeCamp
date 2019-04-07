//create model class
const model = tf.sequential();
model.add(tf.layers.dense({units: 3, inputShape: [3], activation: 'relu'}));
model.add(tf.layers.dense({units: 3}));

model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

function run(){
	var myMove;
	var opMove;

	myMove = document.getElementById('pText').innerHTML.charAt(0);

	moves = ["ROCK", "PAPER", "SCISSORS"];
	
	//choose from model
	var intMove = convertToInt(myMove);
	const xs = tf.tensor2d(intMove, [1,3]);
	var probs = model.predict(xs).arraySync()[0];
	//show probs in a graph
	//choose opMoveIdx using greedy epsilon
	console.log(tf.softmax(probs).arraySync());
	var opMoveIdx = Math.floor((Math.random() * 3) + 0);
	opMove = moves[opMoveIdx];

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

	//update model
	console.log(probs)
	probs[opMoveIdx] = probs[opMoveIdx] + reward;
	console.log(probs)
	const ys = tf.tensor2d(probs, [1, 3])
	model.fit(xs, ys);
	console.log("fit model")
}

function convertToInt(move){
	if(move=="R") return [1, 0, 0];
	if(move=="P") return [0, 1, 0];
	if(move=="S") return [0, 0, 1];
	//throw error
}
