var mongoose = require("mongoose");
var matchSchema = require('./Match');
var { Schema } = mongoose;

var stageSchema = new Schema({
	_id: String,
	deadline:  Date,
	matches: [matchSchema]
}, { versionKey: false });

stageSchema.statics.findById = function(id, cb) {
	return this.find({ _id: new RegExp(name, 'i') }, cb);
};

module.exports = mongoose.model('Stage', stageSchema);
