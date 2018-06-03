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

/*
stageSchema.statics.loadDictionary = function(cb) {

	var stageDictionary = {};

	this.find(function(err, stages){

		if(err) console.log(err);

		for(var index in stages){
			stageDictionary[stages[index]._id] = stages[index];
		}

		cb(stageDictionary);
	});
};
*/
