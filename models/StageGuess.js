var mongoose = require("mongoose");
var matchGuessSchema = require('./MatchGuess');
var { Schema } = mongoose;

var stageGuessSchema = new Schema({
	deadline: Date,
	locked: Boolean,
	relatedStage: {type: String, ref: 'Stage'},
	doubleMatch: {type: Number, ref: 'Match'},
	matchGuesses: [matchGuessSchema],
	pointsDoubleMatch: Number
}, {_id : false, versionKey: false });

module.exports = stageGuessSchema;
