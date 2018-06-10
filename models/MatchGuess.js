var mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;
var { Schema } = mongoose;

var matchGuessSchema = new Schema({
	relatedMatch: {type: Number, unique: true, ref: 'Match'},
	points: Number,
	stageGuess: {type: Schema.Types.ObjectId, ref: 'StageGuess'},
	guess: {homeScore: Number, visitorScore: Number, winner:{type: String, ref: 'Team'}}
}, {versionKey: false });

matchGuessSchema.static('asyncUpsert', function (id, matchGuess, callback) {

	var model = this;
	return new Promise(function(resolve, reject){

		if(!id) {id = new ObjectId();}

		model.findByIdAndUpdate(id, matchGuess, {upsert: true, new: true}, function(err, doc){
			if(err) reject(err);

			resolve(doc);
		}).populate({path:'stageGuess', populate: { path: 'mainGuess' }}).populate('relatedMatch');
	});
});

if (!matchGuessSchema.options.toObject) matchGuessSchema.options.toObject = {};
matchGuessSchema.options.toObject.transform = function (doc, ret, options) {

	ret.result = {};
	if(!ret.guess) {
		ret.guess = {};
	}

	if(ret.relatedMatch._id){
		ret.homeTeam = ret.relatedMatch.homeTeam;
		ret.visitorTeam = ret.relatedMatch.visitorTeam;
		ret.result.winner = ret.relatedMatch.winner;
		ret.result.homeScore = ret.relatedMatch.homeScore;
		ret.result.visitorScore = ret.relatedMatch.visitorScore;
		ret.date = ret.relatedMatch.date;
		ret.group = ret.relatedMatch.group;

		ret.relatedMatch = ret.relatedMatch._id;
	}

	delete	ret.stageGuess;
	return ret;
}


module.exports = mongoose.model('MatchGuess', matchGuessSchema);
