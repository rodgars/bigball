const mongoose = require("mongoose");
const { Schema } = mongoose;

const playerSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: String,
	goals: []
});

module.exports = mongoose.model('player', playerSchema);
