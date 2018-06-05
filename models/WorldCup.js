var mongoose = require("mongoose");
var stageSchema = require('./Stage');
var { Schema } = mongoose;

var worldCupSchema = new Schema({
	_id: String,
	lastUpdate:  Date,
	stages: [{type: String, ref: 'Stage'}]
}, { versionKey: false });

module.exports = mongoose.model('WorldCup', worldCupSchema);
