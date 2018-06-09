var mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;
var { Schema } = mongoose;

var globalGuessSchema = new Schema({
	mainGuess: {type: Schema.Types.ObjectId, ref: 'Guess'},
	relatedStage: {type: String, ref: 'Stage'},
	firstPlace: { type: String, ref: 'Team'},
	secondPlace: { type: String, ref: 'Team'},
	thirdPlace: { type: String, ref: 'Team'},
	topScorer: { type: Number, ref: 'Player'},
	teamGP: { type: String, ref: 'Team'},
	teamGC: { type: String, ref: 'Team'},
	pointsChampions: Number,
	pointsTeamGP: Number,
	pointsTeamGC: Number,
	pointsTopScorer: Number
}, {versionKey: false});

globalGuessSchema.static('asyncUpsert', function (id, globalGuess, callback) {

	var model = this;
	return new Promise(function(resolve, reject){

		if(!id) {id = new ObjectId();}

		model.findByIdAndUpdate(id, globalGuess, {upsert: true, new: true}, function(err, doc){
			if(err) reject(err);

			resolve(doc);
		});
	});
});

if (!globalGuessSchema.options.toObject) globalGuessSchema.options.toObject = {};
globalGuessSchema.options.toObject.transform = function (doc, ret, options) {

	if(ret.relatedStage._id) {
		ret.status = ret.relatedStage.status;
		ret.deadline = ret.relatedStage.deadline.toISOString().replace('T', ' ').substring(0, 19);
		ret.situation = ret.relatedStage.situation;
		ret.relatedStage = ret.relatedStage._id;
	}

	delete ret.mainGuess;

	return ret;
}

module.exports = mongoose.model('GlobalGuess', globalGuessSchema);
