var mongoose = require('mongoose');
var MatchGuess = require('./MatchGuess');
var { Schema } = mongoose;

var matchSchema = new Schema({
	_id: Number,
	group: String,
	date: Date,
	homeTeam: { type: String, ref: 'Team' },
	visitorTeam: { type: String, ref: 'Team' },
	winner: { type: String, ref: 'Team' },
	homeScore: Number,
	visitorScore: Number
}, { versionKey: false });

if (!matchSchema.options.toObject) matchSchema.options.toObject = {};
matchSchema.options.toObject.transform = function (doc, ret, options) {

	if(!ret.winner) {ret.winner = {}}

	ret.date = ret.date.toISOString().substring(0, 10);
	return ret;
}

matchSchema.methods.calculate = function(cb) {
	var instance = this;
	var filter = {relatedMatch: this._id};	
	
	MatchGuess.find(filter).then(function(docs){
		Promise.all(docs.map(function(doc){
			return doc.calculate({homeScore: instance.homeScore, visitorScore: instance.visitorScore, winner: instance.winner});
		})).then(mgs => cb(mgs));
	});
};


module.exports = mongoose.model('Match', matchSchema);
