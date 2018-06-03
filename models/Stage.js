var mongoose = require("mongoose");
var matchSchema = require('./Match');
var { Schema } = mongoose;

var stageSchema = new Schema({
	_id: String,
	deadline:  Date,
	matches: [matchSchema]
}, { versionKey: false });

//module.exports = mongoose.model('Stage', stageSchema);

module.exports = stageSchema;
