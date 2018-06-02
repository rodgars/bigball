const mongoose = require("mongoose");
const { Schema } = mongoose;

const goalSchema = new Schema({
	name: String,
});

module.exports = mongoose.model('goal', playerSchema);
