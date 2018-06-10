var mongoose = require("mongoose");
var { Schema } = mongoose;

var topScorerSchema = new Schema({
	_id: String,
	player: {type: Schema.Types.ObjectId, ref: 'Player'},
	goals: Number
}, { versionKey: false });

module.exports = mongoose.model('TopScorer', topScorerSchema);
