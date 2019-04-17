//create model class
const model = tf.sequential();
model.add(tf.layers.dense({units: 3, inputShape: [3], useBias: false, kernelInitializer: 'heNormal'}));
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

moves = ["ROCK", "PAPER", "SCISSORS"];

function chooseMove(){
	
	var myMove;
	var opMove;
	var training = true;

	myMove = document.getElementById('pText').innerHTML.charAt(0);

	if(!training){
		//choose from model
		var intMove = convertToInt(myMove);
		var xs = tf.tensor2d(intMove, [1,3]);
		var logits = model.predict(xs).arraySync()[0];
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
	var xs;
	var logits;
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
			title: 'What should I play against ' + moves[i] + '?',
			width: 450,
			height: 300

		};
		Plotly.newPlot(divs[i], data, layout);
	}
}

function train(reward){
	opMoveFull = document.getElementById('oText').innerHTML;
	opMove = opMoveFull.charAt(0);
	myMove = document.getElementById('pText').innerHTML.charAt(0);
	opMoveIdx = moves.indexOf(opMoveFull);

	var intMove = convertToInt(myMove);
	var xs = tf.tensor2d(intMove, [1,3]);
	var logits = model.predict(xs).arraySync()[0];

	//update model
	logits[opMoveIdx] = logits[opMoveIdx] + reward;
	const ys = tf.tensor2d(logits, [1, 3])
	model.fit(xs, ys).then(()=>{
		plotProbs();
	});
}

function convertToInt(move){
	if(move=="R") return [1, 0, 0];
	if(move=="P") return [0, 1, 0];
	if(move=="S") return [0, 0, 1];
	//throw error
}
