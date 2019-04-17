//create model class
const model = tf.sequential();
model.add(tf.layers.dense({units: 3, inputShape: [3], useBias: false, kernelInitializer: 'heNormal'}));
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

moves = ["ROCK", "PAPER", "SCISSORS"];
var xs;
var logits;

function chooseMove(){
	
	var myMove;
	var opMove;
	var training = true;

	myMove = document.getElementById('pText').innerHTML.charAt(0);

	if(!training){
		//choose from model
		var intMove = convertToInt(myMove);
		xs = tf.tensor2d(intMove, [1,3]);
		logits = model.predict(xs).arraySync()[0];
	}else{
		//choose randomly 
		var opMoveIdx = Math.floor((Math.random() * 3) + 0);
		opMove = moves[opMoveIdx];
	}

	document.getElementById('oText').innerHTML = opMove;
}

function plotProbs(){
	var divs = ['div1', 'div2', 'div3']
	var probs;
	var data;
	for(var i=0;i<3;i++){
		xs = tf.tensor2d(convertToInt(moves[i].charAt(0)), [1, 3]);
		logits = model.predict(xs).arraySync()[0];
		probs = tf.softmax(logits).arraySync();
		data = [
			{
				x:moves,
				y:probs,
				type:'bar'
			}
		];

		var layout = {
			title: 'what should i play against ' + moves[i] + '?',
			width: 450,
			height: 300

		};
		Plotly.newPlot(divs[i], data, layout);
	}
}

function train(rew){
	opMoveFull = document.getElementById('oText').innerHTML;
	opMove = opMoveFull.charAt(0);
	myMove = document.getElementById('pText').innerHTML.charAt(0);
	opMoveIdx = moves.indexOf(opMoveFull);
	var reward = 0;

	var intMove = convertToInt(myMove);
	xs = tf.tensor2d(intMove, [1,3]);
	logits = model.predict(xs).arraySync()[0];
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
		reward = -10;
		document.getElementById('result').innerHTML = "Player Ties";
	}

	//update model
	logits[opMoveIdx] = logits[opMoveIdx] + reward;
	const ys = tf.tensor2d(logits, [1, 3])
	model.fit(xs, ys);
	
	//plot the probabilities
	plotProbs();

}

function convertToInt(move){
	if(move=="R") return [1, 0, 0];
	if(move=="P") return [0, 1, 0];
	if(move=="S") return [0, 0, 1];
	//throw error
}
