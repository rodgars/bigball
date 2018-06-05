var mongoose = require("mongoose");
var globalGuessSchema = require('./GlobalGuess');
var matchGuessSchema = require('./MatchGuess');
var { Schema } = mongoose;

var guessSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User'},
	globalGuess: globalGuessSchema,
	matchGuesses: [matchGuessSchema],
	totalPoints: Number
});

module.exports = mongoose.model('Guess', guessSchema);

