
//definitions
moves = ["ROCK", "PAPER", "SCISSORS"];
var myMove;
var opMove;
var opMoveIdx;
const model = tf.sequential();

/**
 *Initialize the model parameters and plot the initial probabilities.
 */
function init(){
	//create model class
	//plot probs
}

/**
 * Choose an agent's move based on the phase.
 * Training Phase: Choose actions randomly
 * Evaluation Phase: Choose actions based on argmax probability.
 *
 * Params: My Move
 * Return: Agent Move
 */

function chooseMove(move){
	//check if training or evaluate
	//if training choose randomly
	//if eval get argmax of the move
}

/**
 * Plot the probabilities of the choosing a move for each of the my moves.
 */

function plotProbs(){
	var divs = ['div1', 'div2', 'div3']
	var probs;
	var data;
	var xs;
	var logits;
	for(var i=0;i<3;i++){
		xs = tf.tensor2d(convertToOneHot(moves[i]), [1, 3]);
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

/**
 * Trains the model based on the reward given by the user.
 *
 * Params: reward
 * Return: None
 */
function train(reward){
	//check phase
	//if phase is train
	//convert my move to one hot
	//pass through network
	//update the model
	//plot probs after await is done
}

/**
 * Converts a move into a one-hot vector.
 *
 * Params: Move
 * Return: One-Hot-Vector
 */
function convertToOneHot(move){
	if(move=="ROCK") return [1, 0, 0];
	if(move=="PAPER") return [0, 1, 0];
	if(move=="SCISSORS") return [0, 0, 1];
	//throw error
}

/**
 * Choose the index of the maximum value from the array.
 *
 * Params: Array of values
 * Return: Index of the max value
 */
function getMaxIndex(values){
	var max=values[0];
	var index=0;

	for(var i=1;i<values.length;i++){
		if(values[i]>max){
			max = values[i];
			index = i;
		}
	}
	return index;
}
