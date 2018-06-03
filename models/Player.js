const mongoose = require("mongoose");
const { Schema } = mongoose;

const playerSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: String,
	team: { type: String, ref: 'Team' }
}, { versionKey: false });

module.exports = mongoose.model('Player', playerSchema);
