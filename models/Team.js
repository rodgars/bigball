var mongoose = require("mongoose");
var { Schema } = mongoose;

var teamSchema = new Schema({
	_id: String,
	name:  String
}, { versionKey: false });

teamSchema.statics.findByName = function(name, cb) {
	return this.find({ name: new RegExp(name, 'i') }, cb);
};

teamSchema.statics.loadDictionary = function(cb) {

	var teamDictionary = {};

	this.find(function(err, teams){

		if(err) console.log(err);

		for(var index in teams){
			teamDictionary[teams[index].name] = teams[index];
		}

		cb(teamDictionary);
	});
};

module.exports = mongoose.model('Team', teamSchema);
