var mongoose = require("mongoose");
var stageSchema = require('./Stage');
var { Schema } = mongoose;

var worldCupSchema = new Schema({
	_id: String,
	lastUpdate:  Date,
	stages: [stageSchema]
}, { versionKey: false });

module.exports = mongoose.model('WorldCup', worldCupSchema);
