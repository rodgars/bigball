var mongoose = require("mongoose");
var globalGuessSchema = require('./GlobalGuess');
var stageGuessSchema = require('./StageGuess');
var { Schema } = mongoose;

var guessSchema = new Schema({
	_id: Schema.Types.ObjectId,
	user: { type: Schema.Types.ObjectId, ref: 'user'},
	globalGuess: globalGuessSchema,
	stageGuesses: [stageGuessSchema],
	totalPoints: Number,
	position: Number
}, { versionKey: false });

module.exports = mongoose.model('Guess', guessSchema);

