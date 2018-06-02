var mongoose = require("mongoose");
var { Schema } = mongoose;

var matchSchema = new Schema({
	_id: Schema.Types.ObjectId,
	number: Number,
	group: String,
	date: Date,
	homeTeam: { type: Schema.Types.ObjectId, ref: 'Team' },
	visitorTeam: { type: Schema.Types.ObjectId, ref: 'Team' },
	goals: [{type: Schema.Types.ObjectId, ref: 'Goal'}],
	winner: { type: Schema.Types.ObjectId, ref: 'Team' }
});

module.exports = mongoose.model('Match', matchSchema);
