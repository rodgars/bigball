var mongoose = require("mongoose");
var { Schema } = mongoose;

var teamSchema = new Schema({
	_id: String,
	name:  String
}, { versionKey: false });

module.exports = mongoose.model('Team', teamSchema);
