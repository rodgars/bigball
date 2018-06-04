var mongoose = require("mongoose");
var { Schema } = mongoose;

var globalGuessSchema = new Schema({
	firstPlace: { type: String, ref: 'Team'},
	secondPlace: { type: String, ref: 'Team'},
	thirdPlace: { type: String, ref: 'Team'},
	topScorer: { type: Schema.Types.ObjectId, ref: 'Player'},
	teamGP: { type: String, ref: 'Team'},
	teamGC: { type: String, ref: 'Team'},
	pointsChampions: Number,
	pointsTeamGP: Number,
	pointsTeamGC: Number,
	pointsTopScorer: Number
});

module.exports = globalGuessSchema;
