var mongoose = require('mongoose');
var goalSchema = require('./Goal');
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
});

module.exports = matchSchema;
