var mongoose = require("mongoose");
var globalGuessSchema = require('./GlobalGuess');
var stageGuessSchema = require('./StageGuess');
var ObjectId = require('mongodb').ObjectID;
var { Schema } = mongoose;

var guessSchema = new Schema({
	_id: Schema.Types.ObjectId,
	user: { type: Schema.Types.ObjectId, ref: 'user'},
	globalGuess: globalGuessSchema,
	stageGuesses: [stageGuessSchema],
	totalPoints: Number,
	position: Number
}, { versionKey: false });

guessSchema.static('asyncUpsert', function (id, guess, callback) {
	var model = this;
	return new Promise(function(resolve, reject){

		if(!id) id = new ObjectId();

		model.findByIdAndUpdate(id, guess, {upsert: true, new: true}, function(err, doc){
			if(err) reject(err);
			resolve(doc);
		}).populate('stageGuesses.relatedStage').populate('stageGuesses.matchGuesses.relatedMatch').populate('stageGuesses.doubleMatch').populate('user');
	});
});

guessSchema.static('transform', function (guess, callback) {

	guess = guess.toObject();

	guess.stageGuesses.forEach(function(stageGuess){
		stageGuess.order = stageGuess.relatedStage.order;
		stageGuess.relatedStage = stageGuess.relatedStage._id;
		stageGuess.matchGuesses.forEach(function(matchGuess){
			if(!matchGuess.guess) matchGuess.guess = {};
			matchGuess.result = {};
			matchGuess.date = matchGuess.relatedMatch.date;
			matchGuess.homeTeam = matchGuess.relatedMatch.homeTeam;
			matchGuess.visitorTeam = matchGuess.relatedMatch.visitorTeam;
			matchGuess.group = matchGuess.relatedMatch.group;
			if(matchGuess.relatedMatch.winner){
				matchGuess.result.homeScore = matchGuess.relatedMatch.homeScore;
				matchGuess.result.visitorScore = matchGuess.relatedMatch.visitorScore;
				matchGuess.result.winner = matchGuess.relatedMatch.winner;
			}
			matchGuess.relatedMatch = matchGuess.relatedMatch._id;
		});
	});

	return guess;

});

module.exports = mongoose.model('Guess', guessSchema);

