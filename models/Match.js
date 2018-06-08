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

module.exports = mongoose.model('Match', matchSchema);
