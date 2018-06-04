var mongoose = require("mongoose");
//var Match = require('./Match');
var { Schema } = mongoose;

var stageSchema = new Schema({
	_id: String,
	deadline:  Date,
	matches: [{type: Number, ref: 'Match'}]
}, { versionKey: false });

module.exports = stageSchema;

