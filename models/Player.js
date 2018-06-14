const mongoose = require("mongoose");
const { Schema } = mongoose;

const playerSchema = new Schema({
	_id: Number,
	name: String,
	team: { type: String, ref: 'Team' },
	goals: Number
}, { versionKey: false });

module.exports = mongoose.model('Player', playerSchema);
