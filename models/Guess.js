var mongoose = require("mongoose");
var { Schema } = mongoose;

var guessSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User'},
	firstPlace: { type: String, ref: 'Team'},
	secondPlace: { type: String, ref: 'Team'},
	thirdPlace: { type: String, ref: 'Team'},
	topScorer: { type: Schema.Types.ObjectId, ref: 'Player'},
	teamGP: { type: String, ref: 'Team'},
	teamGC: { type: String, ref: 'Team'}
});

module.exports = mongoose.model('Guess', guessSchema);

