var mongoose = require("mongoose");
var { Schema } = mongoose;

var teamSchema = new Schema({
	_id: String,
	name:  String,
	gp: Number,
	gc: Number
}, { versionKey: false });

module.exports = mongoose.model('Team', teamSchema);
