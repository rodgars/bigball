var mongoose = require('mongoose');
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

module.exports = mongoose.model('Match', matchSchema);
